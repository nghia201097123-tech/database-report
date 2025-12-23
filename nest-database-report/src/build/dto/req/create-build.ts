import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBuildDto {
  @IsNotEmpty()
  @IsNumber()
  project_id: number;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  service_server_ids: number[];

  @IsNotEmpty()
  @IsString()
  content: string;

  build_at?: Date; // Optional, default to current timestamp
}
