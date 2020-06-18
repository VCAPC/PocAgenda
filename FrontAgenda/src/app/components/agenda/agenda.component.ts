import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ContactDto, ResponseDataDto } from '../../entities';
import { AgendaService } from '../../services/agenda.services';
import { PhoneTypeDto } from 'src/app/entities/phone-type.dto';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-agenda',
    templateUrl: 'agenda.component.html'
})
export class AgendaComponent implements AfterContentInit {
    contactos: Array<ContactDto> = [];
    currentContact: ContactDto = undefined;
    isContactInfo = false;

    constructor(
        private agendaServ: AgendaService,
        private toastr: ToastrService) {
    }

    ngAfterContentInit() {
        this.loadData();
    }

    public addContact = () => {
        this.currentContact = new ContactDto();
        this.isContactInfo = true;
    }

    public cancelContact = () => {
        this.currentContact = undefined;
        this.isContactInfo = false;
    }

    public editContact = (contact: ContactDto) => {
        if (contact) {
            this.currentContact = Object.assign({}, contact);
            this.isContactInfo = true;
        }
    }

    public deleteContact = (contact: ContactDto, event: Event) => {
        if (event.isTrusted) {
            event.preventDefault();
            event.stopImmediatePropagation();
            this.agendaServ.deleteContact(contact)
                .then((x: ResponseDataDto<ContactDto>) => {
                    this.toastr.info('Registro eliminado');
                    this.currentContact = undefined;
                    this.isContactInfo = false;
                    this.loadData();
                });
        }
    }

    public saveContact = () => {
        if (this.currentContact && this.currentContact.phones.length > 0) {
            if (this.currentContact.id === 0) {
                this.agendaServ.saveContact(this.currentContact)
                    .then((x: ResponseDataDto<ContactDto>) => {
                        if (x.success) {
                            this.toastr.success('Informacion guardada correctamente');
                            this.currentContact = undefined;
                            this.isContactInfo = false;
                            this.loadData();
                        } else {
                            this.toastr.error('Error en el servidor');
                        }
                    });
            } else {
                this.agendaServ.updateContact(this.currentContact)
                    .then((x: ResponseDataDto<ContactDto>) => {
                        if (x.success) {
                            this.toastr.success('Informacion actualizada correctamente');
                            this.currentContact = undefined;
                            this.isContactInfo = false;
                            this.loadData();
                        } else {
                            this.toastr.error('Error en el servidor');
                        }
                    });
            }
        }
    }

    private loadData() {
        this.agendaServ.getList()
            .then((x: ResponseDataDto<ContactDto[]>) => {
                if (x.success) {
                    this.contactos = x.data;
                }
            });
    }
}
