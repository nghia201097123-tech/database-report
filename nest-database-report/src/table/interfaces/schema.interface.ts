/**
 * Database schema information structures
 */

export interface ColumnInfo {
  columnName: string;
  dataType: string;
  isNullable: string; // 'YES' | 'NO'
  columnKey: string; // 'PRI' | 'UNI' | 'MUL' | ''
  columnDefault: string | null;
  extra: string; // 'auto_increment', etc.
  characterMaximumLength: number | null;
  numericPrecision: number | null;
  numericScale: number | null;
  columnComment: string;
}

export interface IndexInfo {
  indexName: string;
  columnName: string;
  nonUnique: number; // 0 = unique, 1 = non-unique
  indexType: string; // 'BTREE', 'HASH', etc.
  seqInIndex: number;
}

export interface ForeignKeyInfo {
  constraintName: string;
  columnName: string;
  referencedTableName: string;
  referencedColumnName: string;
  updateRule: string; // 'CASCADE', 'RESTRICT', etc.
  deleteRule: string;
}

export interface TableSchema {
  tableName: string;
  tableType: string; // 'BASE TABLE', 'VIEW'
  engine: string; // 'InnoDB', etc.
  tableCollation: string;
  tableComment: string;
  createOptions: string;
  columns: ColumnInfo[];
  indexes: IndexInfo[];
  foreignKeys: ForeignKeyInfo[];
  ddl: string; // SHOW CREATE TABLE result
}

export interface SchemaChange {
  changeType: 'add' | 'modify' | 'delete';
  objectType: 'table' | 'column' | 'index' | 'constraint';
  tableName: string;
  objectName: string;
  oldDefinition?: string;
  newDefinition?: string;
  ddl: string; // SQL to apply the change
}
