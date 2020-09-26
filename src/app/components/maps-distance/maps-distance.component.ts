import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maps-distance',
  templateUrl: './maps-distance.component.html',
  styleUrls: ['./maps-distance.component.scss']
})
export class MapsDistanceComponent implements OnInit {

  constructor() { }
  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;

  ngOnInit() {
  }

}
