import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import {
  TableSchema,
  ColumnInfo,
  IndexInfo,
  ForeignKeyInfo,
} from '../interfaces/schema.interface';

@Injectable()
export class SchemaIntrospectionService {
  /**
   * Get complete schema information for a database
   */
  async getDatabaseSchema(
    dataSource: DataSource,
    databaseName: string,
  ): Promise<TableSchema[]> {
    const tables = await this.getTablesInfo(dataSource, databaseName);
    const schemas: TableSchema[] = [];

    for (const table of tables) {
      const schema = await this.getTableSchema(
        dataSource,
        databaseName,
        table.TABLE_NAME,
      );
      schemas.push(schema);
    }

    return schemas;
  }

  /**
   * Get schema for a specific table
   */
  async getTableSchema(
    dataSource: DataSource,
    databaseName: string,
    tableName: string,
  ): Promise<TableSchema> {
    const [columns, indexes, foreignKeys, ddl] = await Promise.all([
      this.getColumns(dataSource, databaseName, tableName),
      this.getIndexes(dataSource, databaseName, tableName),
      this.getForeignKeys(dataSource, databaseName, tableName),
      this.getTableDDL(dataSource, tableName),
    ]);

    // Get table metadata
    const tableInfo = await dataSource.query(
      `
      SELECT TABLE_TYPE, ENGINE, TABLE_COLLATION, TABLE_COMMENT, CREATE_OPTIONS
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?
    `,
      [databaseName, tableName],
    );

    const info = tableInfo[0] || {};

    return {
      tableName,
      tableType: info.TABLE_TYPE || 'BASE TABLE',
      engine: info.ENGINE || 'InnoDB',
      tableCollation: info.TABLE_COLLATION || 'utf8mb4_unicode_ci',
      tableComment: info.TABLE_COMMENT || '',
      createOptions: info.CREATE_OPTIONS || '',
      columns,
      indexes,
      foreignKeys,
      ddl,
    };
  }

  /**
   * Get all tables in database
   */
  private async getTablesInfo(
    dataSource: DataSource,
    databaseName: string,
  ): Promise<any[]> {
    return await dataSource.query(
      `
      SELECT TABLE_NAME, TABLE_TYPE, ENGINE
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_SCHEMA = ? AND TABLE_TYPE = 'BASE TABLE'
      ORDER BY TABLE_NAME
    `,
      [databaseName],
    );
  }

  /**
   * Get column information for a table
   */
  private async getColumns(
    dataSource: DataSource,
    databaseName: string,
    tableName: string,
  ): Promise<ColumnInfo[]> {
    const columns = await dataSource.query(
      `
      SELECT
        COLUMN_NAME as columnName,
        DATA_TYPE as dataType,
        IS_NULLABLE as isNullable,
        COLUMN_KEY as columnKey,
        COLUMN_DEFAULT as columnDefault,
        EXTRA as extra,
        CHARACTER_MAXIMUM_LENGTH as characterMaximumLength,
        NUMERIC_PRECISION as numericPrecision,
        NUMERIC_SCALE as numericScale,
        COLUMN_COMMENT as columnComment,
        ORDINAL_POSITION as ordinalPosition
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?
      ORDER BY ORDINAL_POSITION
    `,
      [databaseName, tableName],
    );

    return columns;
  }

  /**
   * Get indexes for a table
   */
  private async getIndexes(
    dataSource: DataSource,
    databaseName: string,
    tableName: string,
  ): Promise<IndexInfo[]> {
    const indexes = await dataSource.query(
      `
      SELECT
        INDEX_NAME as indexName,
        COLUMN_NAME as columnName,
        NON_UNIQUE as nonUnique,
        INDEX_TYPE as indexType,
        SEQ_IN_INDEX as seqInIndex
      FROM INFORMATION_SCHEMA.STATISTICS
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?
      ORDER BY INDEX_NAME, SEQ_IN_INDEX
    `,
      [databaseName, tableName],
    );

    return indexes;
  }

  /**
   * Get foreign keys for a table
   */
  private async getForeignKeys(
    dataSource: DataSource,
    databaseName: string,
    tableName: string,
  ): Promise<ForeignKeyInfo[]> {
    const foreignKeys = await dataSource.query(
      `
      SELECT
        CONSTRAINT_NAME as constraintName,
        COLUMN_NAME as columnName,
        REFERENCED_TABLE_NAME as referencedTableName,
        REFERENCED_COLUMN_NAME as referencedColumnName,
        UPDATE_RULE as updateRule,
        DELETE_RULE as deleteRule
      FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND REFERENCED_TABLE_NAME IS NOT NULL
    `,
      [databaseName, tableName],
    );

    return foreignKeys;
  }

  /**
   * Get CREATE TABLE DDL statement
   */
  private async getTableDDL(
    dataSource: DataSource,
    tableName: string,
  ): Promise<string> {
    try {
      const result = await dataSource.query(`SHOW CREATE TABLE \`${tableName}\``);
      return result[0]['Create Table'] || '';
    } catch (error) {
      return '';
    }
  }
}
