import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildController } from './build.controller';
import { BuildManagementService } from './build-management.service';
import { DataMigrationService } from './data-migration.service';
import { BuildEntity } from './entities/build.entity';
import { PosgressCustomer } from './entities/posgress_customer.entity';
import { PostGresMembersEntity } from './entities/posgress_member.entity';
import { CustomerScript } from './entities/ttlcusstomerinsert.entity';
import { TTLCustomerEntity } from './entities/TTLcustomer.entity';
import { TTLCustomerLeadBetaEntity } from './entities/TTLCustomerLeadBeta.entity';
import { MUserInfoEntity } from './entities/TTLmembers.entity';

@Module({
  imports: [
    // Build Management - Main database connection
    TypeOrmModule.forFeature([BuildEntity]),

    // Data Migration - MySQL connections
    TypeOrmModule.forFeature(
      [TTLCustomerEntity, CustomerScript, MUserInfoEntity],
      'mysqlConnection',
    ),

    TypeOrmModule.forFeature(
      [TTLCustomerLeadBetaEntity],
      'mysqlConnectionTtlCustomerBeta',
    ),

    // Data Migration - Postgres connection
    TypeOrmModule.forFeature(
      [PosgressCustomer, PostGresMembersEntity],
      'postgresConnection',
    ),
  ],
  controllers: [BuildController],
  providers: [BuildManagementService, DataMigrationService],
})
export class BuildModule {}
