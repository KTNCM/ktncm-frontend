import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  private apiUrl = 'http://localhost:6969/destinations';

  constructor(private http: HttpClient) { }

  getDestinations(): Observable<any> {
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`,
      'accept': '*/*'
    });

    return this.http.get(this.apiUrl, { headers });
  }
}
