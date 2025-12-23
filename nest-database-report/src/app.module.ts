import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildModule } from './build/build.module';

@Module({
  imports: [
    // Default connection for Build Management
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '172.16.10.145',
      port: 3306,
      username: 'root',
      password: 'OXjKARhMGGhOc7B2UheS',
      database: 'test',
      autoLoadEntities: true,
      synchronize: false,
      entities: [],
      multipleStatements: true,
      dateStrings: true,
      connectTimeout: 10000,
      extra: {
        min: 2,
        connectionLimit: 10,
        idleTimeoutMillis: 10000,
      },
    }),

    TypeOrmModule.forRoot({
      name: 'mysqlConnection', // tên kết nối cho MySQL
      type: 'mysql',
      host: '172.16.10.145',
      port: 3306,
      username: 'root',
      password: 'OXjKARhMGGhOc7B2UheS',
      database: 'test',
      autoLoadEntities: true,
      synchronize: false,
      multipleStatements: true,
      dateStrings: true,
      connectTimeout: 10000,
      extra: {
        min: 2, // xử lý bao nhiêu session
        connectionLimit: 10, // giới hạn tối đa
        idleTimeoutMillis: 10000,
        maxLifetime: 10000, // thời gian tồn tại của kết nối trong pool (ms)
      },
    }),

    TypeOrmModule.forRoot({
      name: 'mysqlConnectionTtlCustomerBeta', // tên kết nối cho MySQL
      type: 'mysql',
      host: '172.16.10.145',
      port: 3306,
      username: 'root',
      password: 'OXjKARhMGGhOc7B2UheS',
      database: 'ttl_customer_beta',
      autoLoadEntities: true,
      synchronize: false,
      multipleStatements: true,
      dateStrings: true,
      connectTimeout: 10000,
      extra: {
        min: 2, // xử lý bao nhiêu session
        connectionLimit: 10, // giới hạn tối đa
        idleTimeoutMillis: 10000,
        maxLifetime: 10000, // thời gian tồn tại của kết nối trong pool (ms)
      },
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.16.10.146', // thay đổi host nếu cần
      name: 'postgresConnection', // tên kết nối cho PostgreSQL
      port: 5432, // cổng mặc định của PostgreSQL
      username: 'postgres', // tên người dùng PostgreSQL
      password: 'PmhxbMK82xSEiyC3hgTl', // mật khẩu PostgreSQL
      database: 'ttl_affiliate_beta', // tên cơ sở dữ liệu PostgreSQL
      autoLoadEntities: true,
      synchronize: true, // có thể thay đổi theo nhu cầu
    }),
    BuildModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
