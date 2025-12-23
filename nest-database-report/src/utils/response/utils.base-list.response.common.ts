export class BaseListResponseData<T> {
  private list: T[];
  private limit: number;
  private total_record: number;

  constructor(
    list?: any,
    limitParameter?: number,
    totalRecordParameter?: number,
  ) {
    this.list = list ? list : [];
    this.limit = limitParameter ? +limitParameter : 0;
    this.total_record = totalRecordParameter ? +totalRecordParameter : 0;
  }
  public getData(): Object {
    return this.list;
  }

  public setData(list: T[]): void {
    this.list = list;
  }
}
