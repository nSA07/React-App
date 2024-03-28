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
  entityType: string;

  @Column()
  entityId: number;

  @Column()
  boardName: string;

  @Column()
  operationType: string;

  @Column()
  previousValues: string;

  @Column()
  newValues: string;

  @CreateDateColumn()
  timestamp: Date;
}
