import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildController } from './build.controller';
import { BuildService } from './build.service';
import { PosgressCustomer } from './entities/posgress_customer.entity';
import { PostGresMembersEntity } from './entities/posgress_member.entity';
import { CustomerScript } from './entities/ttlcusstomerinsert.entity';
import { TTLCustomerEntity } from './entities/TTLcustomer.entity';
import { TTLCustomerLeadBetaEntity } from './entities/TTLCustomerLeadBeta.entity';
import { MUserInfoEntity } from './entities/TTLmembers.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [TTLCustomerEntity, CustomerScript, MUserInfoEntity],
      'mysqlConnection',
    ),

    TypeOrmModule.forFeature(
      [TTLCustomerLeadBetaEntity],
      'mysqlConnectionTtlCustomerBeta',
    ),

    TypeOrmModule.forFeature(
      [PosgressCustomer, PostGresMembersEntity],
      'postgresConnection',
    ),
  ],
  controllers: [BuildController],
  providers: [BuildService],
})
export class BuildModule {}
