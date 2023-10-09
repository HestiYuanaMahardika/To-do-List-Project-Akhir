import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  isCompleted: boolean;

  @Column({ default: 0 })
  priority: number;

  @Column({ type: 'timestamp', nullable: true })
  deadline: Date;
}
