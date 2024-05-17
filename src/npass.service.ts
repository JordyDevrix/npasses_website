import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NpassService {

  constructor(private http: HttpClient) { }

  generatePass(): Observable<any> {
    const url = 'https://npass-api-j2ffjjapia-ez.a.run.app/pass';
    const data = {
      email: '2109jordy2241@gmail.com',
      name: 'JordyDevrix',
      exp: 5
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type'
    });

    return this.http.post<any>(url, data, { headers });
  }
}
