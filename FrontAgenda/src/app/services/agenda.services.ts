import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ContactDto } from '../entities';

@Injectable({providedIn: 'root'})
export class AgendaService {
    constructor(private http: HttpClient) {
    }

    getList(): Promise<any> {
        const url = `${environment.apiHostUrl}${environment.routes.gets.contactList}`;

        return this.http.get(url)
            .toPromise();
    }

    saveContact(model: ContactDto): Promise<any> {
        const url = `${environment.apiHostUrl}${environment.routes.posts.contactSave}`;

        return this.http.post(url, model)
            .toPromise();
    }

    updateContact(model: ContactDto): Promise<any> {
        const url = `${environment.apiHostUrl}${environment.routes.puts.contactUpdate}`;

        return this.http.put(url, model)
            .toPromise();
    }

    deleteContact(model: ContactDto): Promise<any> {
        const url = `${environment.apiHostUrl}${environment.routes.delete.contactDelete}${model.id}`;

        return this.http.delete(url)
            .toPromise();
    }
}
