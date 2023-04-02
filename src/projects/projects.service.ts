import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = await this.projectRepository.create(createProjectDto);
    this.projectRepository.save(project);
    return project;
  }

  async findAll() {
    return await this.projectRepository.find({ relations: ['reports'] });
  }

  async findOne(id: number) {
    return await this.projectRepository.findOne({
      where: { id },
      relations: ['reports'],
    });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    await this.projectRepository.update(id, updateProjectDto);
    return await this.projectRepository.findOne({
      where: { id },
      relations: ['reports'],
    });
  }
}
