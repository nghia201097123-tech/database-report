import { IsNotEmpty, IsNumber } from 'class-validator';

export class ExportTableDto {
  @IsNotEmpty()
  @IsNumber()
  db_name_id: number;

  @IsNumber()
  history_id?: number; // Optional: for comparing with specific version
}

export class CloneTableDto {
  @IsNotEmpty()
  @IsNumber()
  table_name_id: number;
}

export class UpdateTableNoteDto {
  @IsNotEmpty()
  @IsNumber()
  table_name_id: number;

  @IsNotEmpty()
  note: string;
}

export class ChangeLatestVersionDto {
  @IsNotEmpty()
  @IsNumber()
  table_name_id: number;
}
