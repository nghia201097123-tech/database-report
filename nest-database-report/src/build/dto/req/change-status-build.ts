import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { BuildStatusEnum } from 'src/utils/enum/BuildStatus';

export class ChangeStatusBuild {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsEnum(BuildStatusEnum)
  status: BuildStatusEnum;
}
