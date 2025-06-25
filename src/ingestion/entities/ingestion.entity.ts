import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Document } from '../../documents/entities/document.entity';

export type IngestionStatus = 'pending' | 'running' | 'completed' | 'failed';

@Entity()
export class IngestionJob {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Document)
  document: Document;

  @ManyToOne(() => User)
  triggeredBy: User;

  @Column({ type: 'varchar', length: 20 })
  status: IngestionStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  result?: string;
}
