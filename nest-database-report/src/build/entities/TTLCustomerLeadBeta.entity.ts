// src/build/entities/ttl-customer-lead-beta.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('leads_backup')
export class TTLCustomerLeadBetaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @Column({ type: 'int', default: 0, comment: 'Id nguồn khách hàng tiềm năng' })
  lead_source_id: number;

  @Column({ type: 'int', comment: 'Id công ty' })
  company_id: number;

  @Column({ type: 'varchar', length: 255, comment: 'Tên' })
  name: string;

  @Column({ type: 'varchar', length: 255, comment: 'Số điện thoại' })
  phone: string;

  @Column({ type: 'tinyint', default: 0, comment: 'Giới tính' })
  gender: number;

  @Column({ type: 'datetime', nullable: false, comment: 'Ngày sinh' })
  birthday: Date;

  @Column({ type: 'varchar', length: 255, default: '', comment: 'email' })
  email: string;

  @Column({ type: 'varchar', length: 255, default: '', comment: 'Địa chỉ' })
  street: string;

  @Column({ type: 'text', nullable: true, comment: 'Phường/xã' })
  ward: string;

  @Column({ type: 'text', nullable: true, comment: 'Quận/huyện' })
  district: string;

  @Column({ type: 'text', nullable: true, comment: 'Tỉnh/thành phố' })
  city: string;

  @Column({ type: 'double', default: 0, comment: 'Vĩ độ' })
  lat: number;

  @Column({ type: 'double', default: 0, comment: 'Kinh độ' })
  lng: number;

  @Column({ type: 'text', comment: 'Giá trị dùng để tìm kiếm' })
  search_value_normalized: string;

  @Column({ type: 'bigint', default: 0, comment: 'id khách hàng' })
  customer_id: number;

  @Column({ type: 'tinyint', default: 0, comment: 'Khách hàng quan trọng' })
  is_priority: number;

  @Column({ type: 'varchar', length: 255, default: '', comment: 'Ghi chú' })
  note: string;

  @Column({ type: 'bigint', default: 0, comment: 'Id người dùng' })
  user_id: number;

  @Column({ type: 'bigint', default: 0 })
  lead_step_id: number;

  @Column({ type: 'int', default: 0, comment: 'Loại nguồn khách hàng' })
  platform_source_type: number;
}
