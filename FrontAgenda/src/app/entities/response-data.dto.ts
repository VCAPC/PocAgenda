export class ResponseDataDto<T> {
    id: number;
    success: boolean;
    data: T;
    statusCode: number;
    message: string;

    constructor() {
        this.id = 0;
        this.statusCode = 0;
        this.message = '';
    }
}
