import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContactPhoneDto, PhoneTypeDto } from '../../../entities';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-phone-list',
    templateUrl: 'phone-list.component.html'
})

export class PhoneListComponent implements OnInit {
    @Input() phones: ContactPhoneDto[];
    @Output() phonesChange = new EventEmitter<ContactPhoneDto[]>();
    types = [
        new PhoneTypeDto(1, 'Trabajo'),
        new PhoneTypeDto(2, 'Casa'),
        new PhoneTypeDto(3, 'Movíl'),
        new PhoneTypeDto(4, 'Trabajo 2')
    ];
    filteredTypes: PhoneTypeDto[] = [];
    currentPhone: ContactPhoneDto = undefined;
    isEditing = false;
    phonePattern = /^[1-9][0-9]{9}$/;
    codePattern = /^(|[0-9]{3})$/;
    zipCodePattern = /^(|[0-9]{5})$/;

    constructor() { }

    ngOnInit() { }

    public phoneTypeLabel = (id: number): string => {
        if (id > 0) {
            const name = this.types.find(x => x.id === id).name;
            return name || '';
        }
        return '';
    }

    public openPhoneForm = () => {
        this.isEditing = true;
        this.currentPhone = new ContactPhoneDto();
        this.filteredTypes = this.types.filter(x => {
            return !this.phones.find(y => y.phoneTypeId === x.id);
        });
    }

    public updatePhone = (phone: ContactPhoneDto) => {
        this.isEditing = true;
        this.currentPhone = Object.assign({}, phone);
        this.filteredTypes = this.types.filter(x => {
            return !this.phones.find(y => y.phoneTypeId === x.id) || x.id === this.currentPhone.phoneTypeId;
        });
    }

    public closePhoneForm = () => {
        this.isEditing = false;
        this.currentPhone = undefined;
    }

    public savePhone = (form: NgForm) => {
        if (form.valid) {
            this.isEditing = false;
            if (this.currentPhone.id === 0) {
                this.phonesChange.emit(this.phones.concat(this.currentPhone));
            } else {
                const index = this.phones.findIndex(x => x.id === this.currentPhone.id);
                if (index > -1) {
                    this.phones[index] = this.currentPhone;
                    this.phonesChange.emit(this.phones);
                }
            }
        }
    }
}
