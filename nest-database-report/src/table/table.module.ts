import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableController } from './table.controller';
import { TableService } from './table.service';
import { TableNameEntity } from './entities/table-name.entity';
import { TableDetailEntity } from './entities/table-detail.entity';
import { SchemaIntrospectionService } from './services/schema-introspection.service';
import { SchemaComparisonService } from './services/schema-comparison.service';
import { HtmlFormatterService } from './services/html-formatter.service';

@Module({
  imports: [
    // Register entities with default connection
    TypeOrmModule.forFeature([TableNameEntity, TableDetailEntity]),
  ],
  controllers: [TableController],
  providers: [
    TableService,
    SchemaIntrospectionService,
    SchemaComparisonService,
    HtmlFormatterService,
  ],
  exports: [TableService],
})
export class TableModule {}
