import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  content?: string;

  @ManyToOne(() => User, (user) => user.documents)
  owner: User;
  @Column({ nullable: true })
  fileKey?: string;

  @Column({ nullable: true })
  fileUrl?: string;
}
