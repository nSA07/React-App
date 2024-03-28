import { Board } from '@board/entities/board.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn({ name: 'tasks' })
  id: number;

  @Column()
  title: string;

  @Column()
  priority: 'high' | 'medium' | 'low';

  @ManyToOne(() => Board, (board) => board.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'board_id' })
  board: Board;

  @Column()
  description: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
