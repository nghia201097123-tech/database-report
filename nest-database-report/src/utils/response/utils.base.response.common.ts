import { HttpStatus } from "@nestjs/common";

export class BaseResponseData {
    private status: HttpStatus;
    private message: string;
    private data: any

    constructor(status: number = null, message: string = null, data?: any) {
        this.status = status ? + status : + HttpStatus.OK;
        this.message = message ? message : "SUCCESS";
        this.data = data ? data : null;
    }

    public getStatus(): HttpStatus {
        return this.status;
    }

    public setStatus(status: HttpStatus): void {
        this.status = status;
    }

    public getMessage(): string {
        return this.message;
    }

    public setMessage(status: HttpStatus, message: string): void {

        if (message) {
            this.message = message;
        } else {
            switch (status) {
                case HttpStatus.OK:
                    this.message = "SUCCESS";
                    break;
                case HttpStatus.BAD_REQUEST:
                    this.message = "Dữ liệu không hợp lệ";
                    break;
                default:
                    this.message = "SUCCESS";
                    break;
            }
        }
    }

    public getData(): any {
        return this.data;
    }

    public setData(data: any): void {
        this.data = data;
    }
}