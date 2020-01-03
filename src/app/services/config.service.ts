import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  // public domainURL = "http://25bol.sandtell.com/api/";
  // public assetsURL = "http://25bol.sandtell.com/";
  public domainURL = "https://25bol.brilienzacademy.in/api/";
  public assetsURL = "https://25bol.brilienzacademy.in/";
  constructor() { }
}
