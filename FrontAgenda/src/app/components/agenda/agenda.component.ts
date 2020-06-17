import { Component, OnInit } from '@angular/core';
import { ContactDto } from '../../entities';

@Component({
    selector: 'app-agenda',
    templateUrl: 'agenda.component.html'
})
export class AgendaComponent implements OnInit {
    contactos: Array<ContactDto> = [];
    isContactInfo = false;

    constructor() { }

    ngOnInit() { }
}
