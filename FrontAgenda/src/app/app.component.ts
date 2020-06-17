import { Component, OnInit, AfterContentInit } from '@angular/core';
import { SecurityServices } from './services';
import { LoginDto, ResponseDataDto } from './entities';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit {
  title = 'FrontAgenda';

  constructor() {
  }

  ngAfterContentInit() {
  }
}
