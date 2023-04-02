import { Project } from 'src/projects/entities/project.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  performance: number;

  @Column('float')
  accessibility: number;

  @Column('float')
  bestPractices: number;

  @Column('float')
  seo: number;

  @Column('float')
  pwa: number;

  @Column('json')
  firstContentfulPaint: Object;

  @Column('json')
  totalBlockingTime: Object;

  @Column('json')
  speedIndex: Object;

  @Column('json')
  largestContentfulPaint: Object;

  @Column('json')
  cumulativeLayoutShift: Object;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Project, (project) => project.id)
  project: Project;
}
