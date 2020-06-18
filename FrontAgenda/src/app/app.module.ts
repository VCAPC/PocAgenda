import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { SecurityServices } from './services';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { HomeComponent } from './components/home/home.component';
import { AppGuard } from './utils/guards/app.gruard';
import { AgendaComponent } from './components/agenda/agenda.component';
import { AppHttpInteceptor } from './utils/interceptors/app-http.interceptor';
import { AgendaService } from './services/agenda.services';
import { PhoneListComponent } from './components/agenda/phone-list/phone-list.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'agenda', component: AgendaComponent, canActivate: [AppGuard] },
  { path: 'no-access', component: NoAccessComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AgendaComponent,
    NoAccessComponent,
    PhoneListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInteceptor,
      multi: true
    },
    SecurityServices,
    AgendaService
  ],
  exports: [
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
