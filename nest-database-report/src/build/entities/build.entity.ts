import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BuildStatusEnum } from 'src/utils/enum/BuildStatus';

@Entity('builds')
export class BuildEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  project_id: number;

  @Column('simple-array')
  service_server_ids: number[];

  @Column({ type: 'text' })
  content: string;

  @Column({
    type: 'enum',
    enum: BuildStatusEnum,
    default: BuildStatusEnum.PENDING,
  })
  status: BuildStatusEnum;

  @Column({ type: 'timestamp' })
  build_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
