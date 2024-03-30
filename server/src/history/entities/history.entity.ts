import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class History {
  @PrimaryGeneratedColumn({ name: 'history' })
  id: number;

  @Column()
  taskId: string;

  @Column('simple-json')
  changes: { [key: string]: string }[];

  @CreateDateColumn()
  timestamp: Date;
}
