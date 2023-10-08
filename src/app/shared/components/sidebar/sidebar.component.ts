import { Component, Input } from '@angular/core';
import { Gif } from 'src/app/gifs/interfaces/gifs.interface';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifsService: GifsService){}

   get tags(){
    return this.gifsService.tagsHistory;
  }

  searchTagFromBtn(tag: string){
    this.gifsService.searchTag(tag);
   }
}
