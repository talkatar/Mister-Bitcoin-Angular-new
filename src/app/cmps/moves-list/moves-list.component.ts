import { Component, Input, OnChanges, SimpleChanges,OnInit } from '@angular/core';
import { Move } from 'src/app/models/user.model';

@Component({
  selector: 'moves-list',
  templateUrl: './moves-list.component.html',
  styleUrls: ['./moves-list.component.scss']
})
export class MovesListComponent  {
  @Input() moves: Move[] = [];
  @Input() loggedInUser: any;


}