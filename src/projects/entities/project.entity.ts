import { Report } from 'src/reports/entities/report.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectName: string;

  @Column()
  platform: string;

  @Column()
  backend: string;

  @Column()
  frontend: string;

  @Column()
  url: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Report, (report) => report.project)
  reports: Report[];
}
