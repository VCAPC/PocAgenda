export class ContactPhoneDto {
    id: number;
    contactId: number;
    phoneTypeId: number;
    phoneNumber: string; // 10
    code: string; // 3
    address: string; // 128
    zipCode: string; // 5

    constructor() {
        this.address = '';
        this.code = '';
        this.contactId = 0;
        this.id = 0;
        this.phoneNumber = '';
        this.phoneTypeId = undefined;
        this.zipCode = '';
    }
}
