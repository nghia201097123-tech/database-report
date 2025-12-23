import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

/**
 * Table change details - stores individual schema changes
 */
@Entity('table_name_histories')
export class TableDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  table_name_id: number; // Reference to table_names.id

  @Column({ length: 255 })
  table_name: string;

  @Column({ type: 'enum', enum: ['add', 'modify', 'delete'] })
  env: string; // Type of change

  @Column({ type: 'longtext', nullable: true })
  json_change: string; // HTML/JSON with detailed DDL changes

  @CreateDateColumn()
  created_at: Date;
}
