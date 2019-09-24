import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GuidelinesService {

  constructor(private httpClient: HttpClient) { }

  getGuidelines(guideline: string): Observable<any> {
    const url = `http://localhost:5000/api/guidelines/${guideline}`;
    return this.httpClient.get(url);
  }
}
