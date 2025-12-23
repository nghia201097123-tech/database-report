import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

/**
 * Table snapshot - stores versions of table schemas
 */
@Entity('table_names')
export class TableNameEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  db_name_id: number; // Reference to database configuration

  @Column({ length: 255 })
  table_name: string;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ type: 'tinyint', default: 1 })
  is_latest_version: number; // 1 = latest, 0 = old version

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
