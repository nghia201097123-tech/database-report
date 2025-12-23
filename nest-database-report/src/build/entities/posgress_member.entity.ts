// src/build/entities/Members.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('members', { schema: 'public' })
export class PostGresMembersEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  birthday: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar: string;

  @Column({ type: 'int', default: 1, nullable: false })
  gender: number;

  @Column({ type: 'int', default: 0, nullable: false })
  amount_received: number;

  @Column({ type: 'int', default: 0, nullable: false })
  amount_withdrawn: number;

  @Column({ type: 'int', default: 0, nullable: false })
  total_amount_commission: number;

  @Column({ type: 'int', default: 0, nullable: false })
  pending_balance: number;

  @Column({ type: 'int', default: 0, nullable: false })
  total_amount_available_commission: number;

  @Column({ type: 'int', default: 0, nullable: false })
  total_amount_pending_commission: number;

  @Column({ type: 'int', default: 0, nullable: false })
  total_number_of_partners: number;

  @Column({ type: 'int', default: 0, nullable: false })
  total_number_of_successful_sales: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  signature: string;

  @Column({ type: 'int', default: 0, nullable: false })
  point: number;

  @Column({ type: 'int', default: 0, nullable: false })
  rank: number;

  @Column({ type: 'int', default: 1, nullable: false })
  status: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  code: string;

  @Column({ type: 'int', default: 0, nullable: false })
  conversion_rate: number;

  @Column({ type: 'int', default: 0, nullable: false })
  number_of_purchases: number;

  @Column({ type: 'timestamp', nullable: true })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @Column({ type: 'int', default: 0, nullable: false })
  old_id: number;
}
