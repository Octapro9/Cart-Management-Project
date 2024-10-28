import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:8080/api/items'; // Adjust your endpoint as necessary

  constructor(private http: HttpClient) {}

  // Fetch items from the backend
  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // Adjust based on your backend API
  }
}
