import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];
  private apiKey: string = 'VWIxnyTYT28I5EqL8yR4bBYQxyEEw8c8';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  public gifList: Gif[] = [];

  constructor(private http: HttpClient){
    this.loadLocalSorage();
  }
  private organizeHistory(tag: string){
    tag = tag.toLowerCase();

    if( this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter ( (oldTag) => oldTag !== tag)
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalSorage();
  }

  private saveLocalSorage(): void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

    private loadLocalSorage(): void{
    if(!localStorage.getItem('history')) return;
    this._tagsHistory =  JSON.parse(localStorage.getItem('history')! );
    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }



  get tagsHistory(){
    return [...this._tagsHistory];
  }

  searchTag(tag: string): void{
    if ( tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', 10)
    .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{ params })
    .subscribe( resp => {
      console.log(resp);
      this.gifList = resp.data;
    });

  // fetch('https://api.giphy.com/v1/gifs/search?api_key=VWIxnyTYT28I5EqL8yR4bBYQxyEEw8c8&q=valorant&limit=10')
  // .then( resp => resp.json())
  // .then( data => console.log(data));

  }
}
