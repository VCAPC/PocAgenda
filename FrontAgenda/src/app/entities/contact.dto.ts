import { ContactPhoneDto } from './contact-phone.dto';

export class ContactDto {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    phones: ContactPhoneDto[];

    constructor() {
        this.id = 0;
        this.firstName = '';
        this.middleName = '';
        this.lastName = '';
        this.phones = [];
    }
}
