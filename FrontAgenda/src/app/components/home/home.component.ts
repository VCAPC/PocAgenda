import { Component, OnInit } from '@angular/core';
import { SecurityServices } from '../../services';
import { LoginDto, ResponseDataDto } from '../../entities';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
    public isLoading = true;
    constructor(
        private secServ: SecurityServices,
        private router: Router) { }

    ngOnInit() {
        this.secServ.login(LoginDto.create('victor.perez@test.com', 'Test.123'))
            .then(x => {
                const result: ResponseDataDto<string> = x;
                if (result && result.data && result.data.length > 0) {
                    localStorage.setItem('userId', result.data);
                    this.isLoading = false;
                    this.router.navigate(['/agenda']);
                } else {
                    this.isLoading = true;
                    this.router.navigate(['/no-access']);
                }
            }).catch(err => {
                this.isLoading = true;
                this.router.navigate(['/no-access']);
            });
    }
}
