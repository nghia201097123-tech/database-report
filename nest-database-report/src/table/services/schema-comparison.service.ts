import { Injectable } from '@nestjs/common';
import {
  TableSchema,
  ColumnInfo,
  IndexInfo,
  ForeignKeyInfo,
  SchemaChange,
} from '../interfaces/schema.interface';

@Injectable()
export class SchemaComparisonService {
  /**
   * Compare two database schemas and detect changes
   */
  compareSchemas(
    oldSchemas: TableSchema[],
    newSchemas: TableSchema[],
  ): SchemaChange[] {
    const changes: SchemaChange[] = [];

    // Create maps for easier lookup
    const oldTablesMap = new Map(oldSchemas.map((s) => [s.tableName, s]));
    const newTablesMap = new Map(newSchemas.map((s) => [s.tableName, s]));

    // Find new and modified tables
    for (const newTable of newSchemas) {
      const oldTable = oldTablesMap.get(newTable.tableName);

      if (!oldTable) {
        // New table added
        changes.push({
          changeType: 'add',
          objectType: 'table',
          tableName: newTable.tableName,
          objectName: newTable.tableName,
          newDefinition: newTable.ddl,
          ddl: newTable.ddl,
        });
      } else {
        // Compare table details
        changes.push(...this.compareTableStructure(oldTable, newTable));
      }
    }

    // Find deleted tables
    for (const oldTable of oldSchemas) {
      if (!newTablesMap.has(oldTable.tableName)) {
        changes.push({
          changeType: 'delete',
          objectType: 'table',
          tableName: oldTable.tableName,
          objectName: oldTable.tableName,
          oldDefinition: oldTable.ddl,
          ddl: `DROP TABLE \`${oldTable.tableName}\`;`,
        });
      }
    }

    return changes;
  }

  /**
   * Compare structure of two versions of the same table
   */
  private compareTableStructure(
    oldTable: TableSchema,
    newTable: TableSchema,
  ): SchemaChange[] {
    const changes: SchemaChange[] = [];

    // Compare columns
    changes.push(...this.compareColumns(oldTable, newTable));

    // Compare indexes
    changes.push(...this.compareIndexes(oldTable, newTable));

    // Compare foreign keys
    changes.push(...this.compareForeignKeys(oldTable, newTable));

    return changes;
  }

  /**
   * Compare columns between old and new table
   */
  private compareColumns(
    oldTable: TableSchema,
    newTable: TableSchema,
  ): SchemaChange[] {
    const changes: SchemaChange[] = [];

    const oldColumnsMap = new Map(
      oldTable.columns.map((c) => [c.columnName, c]),
    );
    const newColumnsMap = new Map(
      newTable.columns.map((c) => [c.columnName, c]),
    );

    // Find new and modified columns
    for (const newCol of newTable.columns) {
      const oldCol = oldColumnsMap.get(newCol.columnName);

      if (!oldCol) {
        // New column added
        const ddl = this.generateAddColumnDDL(newTable.tableName, newCol);
        changes.push({
          changeType: 'add',
          objectType: 'column',
          tableName: newTable.tableName,
          objectName: newCol.columnName,
          newDefinition: this.formatColumnDefinition(newCol),
          ddl,
        });
      } else if (this.hasColumnChanged(oldCol, newCol)) {
        // Column modified
        const ddl = this.generateModifyColumnDDL(newTable.tableName, newCol);
        changes.push({
          changeType: 'modify',
          objectType: 'column',
          tableName: newTable.tableName,
          objectName: newCol.columnName,
          oldDefinition: this.formatColumnDefinition(oldCol),
          newDefinition: this.formatColumnDefinition(newCol),
          ddl,
        });
      }
    }

    // Find deleted columns
    for (const oldCol of oldTable.columns) {
      if (!newColumnsMap.has(oldCol.columnName)) {
        const ddl = `ALTER TABLE \`${newTable.tableName}\` DROP COLUMN \`${oldCol.columnName}\`;`;
        changes.push({
          changeType: 'delete',
          objectType: 'column',
          tableName: newTable.tableName,
          objectName: oldCol.columnName,
          oldDefinition: this.formatColumnDefinition(oldCol),
          ddl,
        });
      }
    }

    return changes;
  }

  /**
   * Compare indexes between old and new table
   */
  private compareIndexes(
    oldTable: TableSchema,
    newTable: TableSchema,
  ): SchemaChange[] {
    const changes: SchemaChange[] = [];

    // Group indexes by name
    const oldIndexesMap = this.groupIndexesByName(oldTable.indexes);
    const newIndexesMap = this.groupIndexesByName(newTable.indexes);

    // Find new indexes
    for (const [indexName, newIndexCols] of newIndexesMap.entries()) {
      if (!oldIndexesMap.has(indexName) && indexName !== 'PRIMARY') {
        const isUnique = newIndexCols[0].nonUnique === 0;
        const ddl = this.generateAddIndexDDL(
          newTable.tableName,
          indexName,
          newIndexCols,
          isUnique,
        );
        changes.push({
          changeType: 'add',
          objectType: 'index',
          tableName: newTable.tableName,
          objectName: indexName,
          newDefinition: this.formatIndexDefinition(newIndexCols, isUnique),
          ddl,
        });
      }
    }

    // Find deleted indexes
    for (const [indexName, oldIndexCols] of oldIndexesMap.entries()) {
      if (!newIndexesMap.has(indexName) && indexName !== 'PRIMARY') {
        const ddl = `ALTER TABLE \`${newTable.tableName}\` DROP INDEX \`${indexName}\`;`;
        changes.push({
          changeType: 'delete',
          objectType: 'index',
          tableName: newTable.tableName,
          objectName: indexName,
          oldDefinition: this.formatIndexDefinition(
            oldIndexCols,
            oldIndexCols[0].nonUnique === 0,
          ),
          ddl,
        });
      }
    }

    return changes;
  }

  /**
   * Compare foreign keys between old and new table
   */
  private compareForeignKeys(
    oldTable: TableSchema,
    newTable: TableSchema,
  ): SchemaChange[] {
    const changes: SchemaChange[] = [];

    const oldFKMap = new Map(
      oldTable.foreignKeys.map((fk) => [fk.constraintName, fk]),
    );
    const newFKMap = new Map(
      newTable.foreignKeys.map((fk) => [fk.constraintName, fk]),
    );

    // Find new foreign keys
    for (const [fkName, newFK] of newFKMap.entries()) {
      if (!oldFKMap.has(fkName)) {
        const ddl = this.generateAddForeignKeyDDL(newTable.tableName, newFK);
        changes.push({
          changeType: 'add',
          objectType: 'constraint',
          tableName: newTable.tableName,
          objectName: fkName,
          newDefinition: this.formatForeignKeyDefinition(newFK),
          ddl,
        });
      }
    }

    // Find deleted foreign keys
    for (const [fkName, oldFK] of oldFKMap.entries()) {
      if (!newFKMap.has(fkName)) {
        const ddl = `ALTER TABLE \`${newTable.tableName}\` DROP FOREIGN KEY \`${fkName}\`;`;
        changes.push({
          changeType: 'delete',
          objectType: 'constraint',
          tableName: newTable.tableName,
          objectName: fkName,
          oldDefinition: this.formatForeignKeyDefinition(oldFK),
          ddl,
        });
      }
    }

    return changes;
  }

  // Helper methods
  private hasColumnChanged(oldCol: ColumnInfo, newCol: ColumnInfo): boolean {
    return (
      oldCol.dataType !== newCol.dataType ||
      oldCol.isNullable !== newCol.isNullable ||
      oldCol.columnDefault !== newCol.columnDefault ||
      oldCol.extra !== newCol.extra ||
      oldCol.characterMaximumLength !== newCol.characterMaximumLength ||
      oldCol.numericPrecision !== newCol.numericPrecision ||
      oldCol.numericScale !== newCol.numericScale ||
      oldCol.columnComment !== newCol.columnComment
    );
  }

  private formatColumnDefinition(col: ColumnInfo): string {
    let def = `${col.dataType.toUpperCase()}`;

    if (col.characterMaximumLength) {
      def += `(${col.characterMaximumLength})`;
    } else if (col.numericPrecision && col.numericScale !== null) {
      def += `(${col.numericPrecision},${col.numericScale})`;
    } else if (col.numericPrecision) {
      def += `(${col.numericPrecision})`;
    }

    def += col.isNullable === 'NO' ? ' NOT NULL' : ' NULL';

    if (col.columnDefault !== null) {
      def += ` DEFAULT ${col.columnDefault}`;
    }

    if (col.extra) {
      def += ` ${col.extra.toUpperCase()}`;
    }

    if (col.columnComment) {
      def += ` COMMENT '${col.columnComment}'`;
    }

    return def;
  }

  private generateAddColumnDDL(tableName: string, col: ColumnInfo): string {
    return `ALTER TABLE \`${tableName}\` ADD COLUMN \`${col.columnName}\` ${this.formatColumnDefinition(col)};`;
  }

  private generateModifyColumnDDL(tableName: string, col: ColumnInfo): string {
    return `ALTER TABLE \`${tableName}\` MODIFY COLUMN \`${col.columnName}\` ${this.formatColumnDefinition(col)};`;
  }

  private groupIndexesByName(
    indexes: IndexInfo[],
  ): Map<string, IndexInfo[]> {
    const map = new Map<string, IndexInfo[]>();

    for (const index of indexes) {
      if (!map.has(index.indexName)) {
        map.set(index.indexName, []);
      }
      map.get(index.indexName).push(index);
    }

    return map;
  }

  private formatIndexDefinition(indexes: IndexInfo[], isUnique: boolean): string {
    const columns = indexes.map((idx) => idx.columnName).join(', ');
    return `${isUnique ? 'UNIQUE ' : ''}INDEX (${columns})`;
  }

  private generateAddIndexDDL(
    tableName: string,
    indexName: string,
    indexes: IndexInfo[],
    isUnique: boolean,
  ): string {
    const columns = indexes.map((idx) => `\`${idx.columnName}\``).join(', ');
    const indexType = isUnique ? 'UNIQUE INDEX' : 'INDEX';
    return `ALTER TABLE \`${tableName}\` ADD ${indexType} \`${indexName}\` (${columns});`;
  }

  private formatForeignKeyDefinition(fk: ForeignKeyInfo): string {
    return `FOREIGN KEY (\`${fk.columnName}\`) REFERENCES \`${fk.referencedTableName}\`(\`${fk.referencedColumnName}\`) ON DELETE ${fk.deleteRule} ON UPDATE ${fk.updateRule}`;
  }

  private generateAddForeignKeyDDL(
    tableName: string,
    fk: ForeignKeyInfo,
  ): string {
    return `ALTER TABLE \`${tableName}\` ADD CONSTRAINT \`${fk.constraintName}\` ${this.formatForeignKeyDefinition(fk)};`;
  }
}
