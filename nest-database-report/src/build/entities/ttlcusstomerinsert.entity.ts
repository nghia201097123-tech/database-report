import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customer_script')
export class CustomerScript {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;
}
