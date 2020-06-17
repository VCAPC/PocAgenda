import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SecurityServices } from './services';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { HomeComponent } from './components/home/home.component';
import { AppGuard } from './utils/guards/app.gruard';
import { AgendaComponent } from './components/agenda/agenda.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'agenda', component: AgendaComponent, canActivate: [AppGuard]},
  { path: 'no-access', component: NoAccessComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AgendaComponent,
    NoAccessComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    SecurityServices
  ],
  exports: [
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
