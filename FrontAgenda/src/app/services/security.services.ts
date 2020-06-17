import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDto } from '../entities';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class SecurityServices {
    constructor(private http: HttpClient) {
    }

    login(model: LoginDto): Promise<any> {
        const url = `${environment.apiHostUrl}${environment.routes.post.userLogin}`;

        return this.http.post(url, model)
            .toPromise();
    }
}
