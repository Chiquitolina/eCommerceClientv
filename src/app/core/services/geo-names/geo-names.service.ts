import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


interface GeoResponse {
  geonames: any[];
}

interface GeoResponseStates {
  totalResultsCount: number,
  geonames: any[];
}

@Injectable({
  providedIn: 'root'
})

export class GeoNamesService {

  constructor(private http: HttpClient) { }

  getCountryList() : Observable<GeoResponse> {
    return this.http.get<GeoResponse>('http://api.geonames.org/countryInfoJSON?username=chiquitolina');
  }

  getStatesByCountry(geonameId: number) : Observable<GeoResponseStates> {
    return this.http.get<GeoResponseStates>(`http://api.geonames.org/childrenJSON?geonameId=${geonameId}&username=chiquitolina`);
  }

  getCitiesByState(state: string) : Observable<GeoResponseStates> {
    return this.http.get<GeoResponseStates>(`http://api.geonames.org/searchJSON?formatted=true&q=${state}&maxRows=1000&username=chiquitolina`);
  }
}
