import { Tasks } from '@tasks/entities/task.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['title'])
export class Board {
  @PrimaryGeneratedColumn({ name: 'board' })
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Tasks, (tasks) => tasks.board)
  tasks: Tasks[];

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
