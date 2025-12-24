import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { TableNameEntity } from './entities/table-name.entity';
import { TableDetailEntity } from './entities/table-detail.entity';
import { SchemaIntrospectionService } from './services/schema-introspection.service';
import { SchemaComparisonService } from './services/schema-comparison.service';
import { HtmlFormatterService } from './services/html-formatter.service';
import { TableSchema } from './interfaces/schema.interface';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(TableNameEntity)
    private readonly tableNameRepository: Repository<TableNameEntity>,

    @InjectRepository(TableDetailEntity)
    private readonly tableDetailRepository: Repository<TableDetailEntity>,

    @InjectDataSource()
    private readonly defaultDataSource: DataSource,

    private readonly schemaIntrospection: SchemaIntrospectionService,
    private readonly schemaComparison: SchemaComparisonService,
    private readonly htmlFormatter: HtmlFormatterService,
  ) {}

  /**
   * Get all table snapshots
   */
  async findAll(): Promise<TableNameEntity[]> {
    return await this.tableNameRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  /**
   * Get table snapshot by id
   */
  async findOne(id: number): Promise<TableNameEntity> {
    const tableName = await this.tableNameRepository.findOne({
      where: { id },
    });

    if (!tableName) {
      throw new NotFoundException(`Table snapshot with ID ${id} not found`);
    }

    return tableName;
  }

  /**
   * Get table change details
   */
  async getTableDetails(tableNameId: number): Promise<TableDetailEntity[]> {
    return await this.tableDetailRepository.find({
      where: { table_name_id: tableNameId },
      order: { created_at: 'DESC' },
    });
  }

  /**
   * Export and detect table changes
   * This is the main "KIỂM TRA" function
   */
  async exportTableDetails(
    dbNameId: number,
    historyId?: number,
  ): Promise<TableDetailEntity[]> {
    // Get database configuration (you'll need to implement this)
    const dbConfig = await this.getDatabaseConfig(dbNameId);

    // Create connection to target database
    const targetDataSource = await this.createDataSource(dbConfig);

    try {
      // Get current schema from database
      const currentSchema = await this.schemaIntrospection.getDatabaseSchema(
        targetDataSource,
        dbConfig.database,
      );

      // Get previous schema if historyId provided
      let previousSchema: TableSchema[] = [];
      if (historyId) {
        // Load previous schema from storage (implement this)
        previousSchema = await this.loadPreviousSchema(historyId);
      }

      // Compare schemas
      const changes = this.schemaComparison.compareSchemas(
        previousSchema,
        currentSchema,
      );

      // Format changes as HTML
      const htmlChanges = this.htmlFormatter.formatChangesAsHtml(changes);
      const summary = this.htmlFormatter.formatSummary(changes);

      // Create or get table_name record
      let tableName = historyId
        ? await this.findOne(historyId)
        : await this.createTableSnapshot(dbNameId);

      // Save changes to table_name_histories
      const details: TableDetailEntity[] = [];

      for (const change of changes) {
        const detail = this.tableDetailRepository.create({
          table_name_id: tableName.id,
          table_name: change.tableName,
          env: change.changeType,
          json_change: this.formatChangeAsHtml(change),
        });

        const saved = await this.tableDetailRepository.save(detail);
        details.push(saved);
      }

      // Save summary as separate record if there are changes
      if (changes.length > 0) {
        const summaryDetail = this.tableDetailRepository.create({
          table_name_id: tableName.id,
          table_name: 'SUMMARY',
          env: 'modify',
          json_change: summary + htmlChanges,
        });

        await this.tableDetailRepository.save(summaryDetail);
      }

      return details;
    } finally {
      if (targetDataSource.isInitialized) {
        await targetDataSource.destroy();
      }
    }
  }

  /**
   * Export changes to file
   * This is the "XUẤT FILE" function
   */
  async exportFileTableDetails(
    dbNameId: number,
    historyId: number,
    listName: string[],
  ): Promise<string> {
    // Get table details
    const details = await this.tableDetailRepository.find({
      where: {
        table_name_id: historyId,
      },
    });

    // Filter by listName if provided
    let filteredDetails = details;
    if (listName && listName.length > 0) {
      filteredDetails = details.filter((d) =>
        listName.includes(d.table_name),
      );
    }

    // Generate SQL file content
    let sqlContent = `-- Table Schema Changes Export\n`;
    sqlContent += `-- Generated at: ${new Date().toISOString()}\n`;
    sqlContent += `-- Database ID: ${dbNameId}\n`;
    sqlContent += `-- History ID: ${historyId}\n\n`;

    for (const detail of filteredDetails) {
      if (detail.table_name === 'SUMMARY') continue;

      sqlContent += `-- ${detail.env.toUpperCase()}: ${detail.table_name}\n`;
      sqlContent += `-- ${this.extractDDLFromHtml(detail.json_change)}\n\n`;
    }

    return sqlContent;
  }

  /**
   * Clone/lock current version and create new snapshot
   * This is the "CHỐT VERSION" function
   */
  async cloneExport(tableNameId: number): Promise<TableNameEntity> {
    const currentTableName = await this.findOne(tableNameId);

    // Mark current version as not latest
    currentTableName.is_latest_version = 0;
    await this.tableNameRepository.save(currentTableName);

    // Create new version
    const newTableName = this.tableNameRepository.create({
      db_name_id: currentTableName.db_name_id,
      table_name: currentTableName.table_name,
      note: `Cloned from version ${tableNameId}`,
      is_latest_version: 1,
    });

    return await this.tableNameRepository.save(newTableName);
  }

  /**
   * Update table snapshot note
   */
  async updateNote(tableNameId: number, note: string): Promise<TableNameEntity> {
    const tableName = await this.findOne(tableNameId);
    tableName.note = note;
    return await this.tableNameRepository.save(tableName);
  }

  /**
   * Change latest version flag
   */
  async changeLatestVersion(
    tableNameId: number,
  ): Promise<TableNameEntity> {
    // Unmark all versions for this db_name_id
    const tableName = await this.findOne(tableNameId);

    await this.tableNameRepository.update(
      { db_name_id: tableName.db_name_id },
      { is_latest_version: 0 },
    );

    // Mark this version as latest
    tableName.is_latest_version = 1;
    return await this.tableNameRepository.save(tableName);
  }

  // Helper methods
  private async getDatabaseConfig(dbNameId: number): Promise<any> {
    // TODO: Implement fetching database configuration from db_names table
    // For now, return default connection config
    return {
      type: 'mysql',
      host: '172.16.10.145',
      port: 3306,
      username: 'root',
      password: 'Gt2zF7xgppdtZKTvyabo',
      database: 'test',
    };
  }

  private async createDataSource(config: any): Promise<DataSource> {
    const dataSource = new DataSource({
      type: config.type,
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
    });

    await dataSource.initialize();
    return dataSource;
  }

  private async createTableSnapshot(dbNameId: number): Promise<TableNameEntity> {
    // Mark all existing snapshots for this db as not latest
    await this.tableNameRepository.update(
      { db_name_id: dbNameId },
      { is_latest_version: 0 },
    );

    // Create new snapshot
    const tableName = this.tableNameRepository.create({
      db_name_id: dbNameId,
      table_name: 'all_tables',
      note: 'Auto-generated snapshot',
      is_latest_version: 1,
    });

    return await this.tableNameRepository.save(tableName);
  }

  private async loadPreviousSchema(historyId: number): Promise<TableSchema[]> {
    // TODO: Implement loading schema from previous snapshot
    // This would involve deserializing stored schema data
    return [];
  }

  private formatChangeAsHtml(change: any): string {
    return this.htmlFormatter.formatChangesAsHtml([change]);
  }

  private extractDDLFromHtml(html: string): string {
    // Extract DDL from HTML (simple regex, can be improved)
    const match = html.match(/<pre[^>]*><code>(.*?)<\/code><\/pre>/s);
    if (match && match[1]) {
      return match[1]
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
    }
    return '';
  }
}
