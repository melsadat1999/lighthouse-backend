import { Optional } from '@nestjs/common';
import { IsString, IsNotEmpty, IsNumber, IsUrl } from 'class-validator';

export class CreateProjectDto {
  @Optional()
  id: number;

  @IsString()
  @IsNotEmpty()
  projectName: string;

  @IsString()
  @IsNotEmpty()
  platform: string;

  @IsString()
  @IsNotEmpty()
  backend: string;

  @IsString()
  @IsNotEmpty()
  frontend: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;
}
