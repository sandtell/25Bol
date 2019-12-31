import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public domainURL = "http://25bol.sandtell.com/api/";
  constructor() { }
}
