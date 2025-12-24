import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseData } from 'src/utils/response/utils.response.common';
import { TableService } from './table.service';
import {
  ExportTableDto,
  CloneTableDto,
  UpdateTableNoteDto,
  ChangeLatestVersionDto,
} from './dto/export-table.dto';

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  /**
   * GET /api/table
   * Get all table snapshots
   */
  @Get()
  async findAll(): Promise<ResponseData> {
    const responseData: ResponseData = new ResponseData();
    try {
      const tables = await this.tableService.findAll();
      responseData.setData(tables);
    } catch (error) {
      responseData.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
      responseData.setMessage(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
    return responseData;
  }

  /**
   * GET /api/table/:id/detail
   * Get specific table snapshot
   */
  @Get(':id/detail')
  async findOne(@Param('id') id: string): Promise<ResponseData> {
    const responseData: ResponseData = new ResponseData();
    try {
      const table = await this.tableService.findOne(parseInt(id));
      responseData.setData(table);
    } catch (error) {
      responseData.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
      responseData.setMessage(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
    return responseData;
  }

  /**
   * GET /api/table-details?table_name_id=:id
   * Get table change history
   */
  @Get('table-details')
  async getTableDetails(
    @Query('table_name_id') tableNameId: string,
  ): Promise<ResponseData> {
    const responseData: ResponseData = new ResponseData();
    try {
      const details = await this.tableService.getTableDetails(
        parseInt(tableNameId),
      );
      responseData.setData(details);
    } catch (error) {
      responseData.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
      responseData.setMessage(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
    return responseData;
  }

  /**
   * POST /api/export/table-details
   * KIỂM TRA - Detect and export table changes
   */
  @Post('export/table-details')
  async exportTableDetails(
    @Body() exportDto: ExportTableDto,
  ): Promise<ResponseData> {
    const responseData: ResponseData = new ResponseData();
    try {
      const details = await this.tableService.exportTableDetails(
        exportDto.db_name_id,
        exportDto.history_id,
      );
      responseData.setData(details);
    } catch (error) {
      responseData.setStatus(HttpStatus.BAD_REQUEST);
      responseData.setMessage(HttpStatus.BAD_REQUEST, error.message);
    }
    return responseData;
  }

  /**
   * POST /api/export/file-table-details
   * XUẤT FILE - Export changes to SQL file
   */
  @Post('export/file-table-details')
  async exportFileTableDetails(
    @Body() body: { db_name_id: number; history_id: number; list_name: string[] },
    @Res() res: Response,
  ) {
    try {
      const sqlContent = await this.tableService.exportFileTableDetails(
        body.db_name_id,
        body.history_id,
        body.list_name,
      );

      const filename = `table_changes_${body.history_id}_${Date.now()}.sql`;

      res.setHeader('Content-Type', 'application/sql');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${filename}"`,
      );
      res.send(sqlContent);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }

  /**
   * POST /api/table/clone-export
   * CHỐT VERSION - Clone/lock current version
   */
  @Post('clone-export')
  async cloneExport(@Body() cloneDto: CloneTableDto): Promise<ResponseData> {
    const responseData: ResponseData = new ResponseData();
    try {
      const newVersion = await this.tableService.cloneExport(
        cloneDto.table_name_id,
      );
      responseData.setData(newVersion);
    } catch (error) {
      responseData.setStatus(HttpStatus.BAD_REQUEST);
      responseData.setMessage(HttpStatus.BAD_REQUEST, error.message);
    }
    return responseData;
  }

  /**
   * POST /api/table/change-note
   * Update table snapshot note
   */
  @Post('change-note')
  async updateNote(
    @Body() updateDto: UpdateTableNoteDto,
  ): Promise<ResponseData> {
    const responseData: ResponseData = new ResponseData();
    try {
      const updated = await this.tableService.updateNote(
        updateDto.table_name_id,
        updateDto.note,
      );
      responseData.setData(updated);
    } catch (error) {
      responseData.setStatus(HttpStatus.BAD_REQUEST);
      responseData.setMessage(HttpStatus.BAD_REQUEST, error.message);
    }
    return responseData;
  }

  /**
   * POST /api/table/change-is-latest-version
   * Mark version as latest
   */
  @Post('change-is-latest-version')
  async changeLatestVersion(
    @Body() changeDto: ChangeLatestVersionDto,
  ): Promise<ResponseData> {
    const responseData: ResponseData = new ResponseData();
    try {
      const updated = await this.tableService.changeLatestVersion(
        changeDto.table_name_id,
      );
      responseData.setData(updated);
    } catch (error) {
      responseData.setStatus(HttpStatus.BAD_REQUEST);
      responseData.setMessage(HttpStatus.BAD_REQUEST, error.message);
    }
    return responseData;
  }
}
