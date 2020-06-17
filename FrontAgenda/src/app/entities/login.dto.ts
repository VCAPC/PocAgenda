export class LoginDto {
    username: string;
    password: string;

    constructor() {
        this.password = '';
        this.username = '';
    }

    public static create(str: string, str2: string): LoginDto {
        const result = new LoginDto();
        result.username = str;
        result.password = str2;
        return result;
    }
}
