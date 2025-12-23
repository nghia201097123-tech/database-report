import { DbTypeEnum } from 'src/utils/enum/DbTypeEnum';
import { StatusEnum } from 'src/utils/enum/StatusEnum';

export class DbNameResponse {
  id: number;
  db_root_id: number;
  db_root_name: string;
  database: string;
  host: string;
  port: string;
  user: string;
  password: string;
  mail_ids: string[];
  db_type: DbTypeEnum;
  status: StatusEnum;
  created_at: Date;
  updated_at: Date;

  constructor() {}
}
