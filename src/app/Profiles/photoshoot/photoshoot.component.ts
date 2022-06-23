import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-photoshoot',
  templateUrl: './photoshoot.component.html',
  styleUrls: ['./photoshoot.component.css']
})
export class PhotoshootComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }

}
