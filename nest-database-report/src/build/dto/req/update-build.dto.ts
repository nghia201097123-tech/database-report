import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateBuildDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  project_id: number;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  service_server_ids: number[];

  @IsNotEmpty()
  @IsString()
  content: string;

  build_at?: Date;
}
