import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interface';

@Component({
  selector: 'card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit{


  @Input()
  public gif!: Gif;


  ngOnInit(): void {
    if(!this.gif) throw new Error('Method not implemented.');
  }
}
