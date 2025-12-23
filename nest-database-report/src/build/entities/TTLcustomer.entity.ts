// src/build/entities/ttl-customer.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TTLCustomer')
export class TTLCustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  birthday: string;

  @Column({ type: 'int', nullable: true })
  genderId: number;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  code: string;

  @Column({ type: 'text', nullable: true })
  FullName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  email: string;

  @Column({ type: 'int', nullable: true })
  ref_id: number;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  ref_code: string;

  @Column({ type: 'int', nullable: true })
  ref_code_erp: number;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  ref_source: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  ref_phone: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  ref_email: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  ref_source_parent: string;

  @Column({ type: 'text', nullable: true })
  identityCard: string;

  @Column({ type: 'text', nullable: true })
  bank: string;

  @Column({ type: 'text', nullable: true })
  bankBranch: string;

  @Column({ type: 'text', nullable: true })
  bankAccountName: string;

  @Column({ type: 'text', nullable: true })
  bankAccount: string;

  @Column({ type: 'text', nullable: true })
  cityBank: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'int', nullable: true })
  districtId: number;

  @Column({ type: 'int', nullable: true })
  provinceId: number;
}
