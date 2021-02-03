import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  encode(message: string): Observable<any> {
    return this.http.post(`${this.apiUrl}encode/`, { "message": message });
  }

  decode(weirdtext: string, original_words: Array<string>): Observable<any> {
    return this.http.post(`${this.apiUrl}decode/`, { "weirdtext": weirdtext, "original_words": original_words });
  }
}
