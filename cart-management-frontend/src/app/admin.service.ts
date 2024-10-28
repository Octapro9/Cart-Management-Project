import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserCartDto } from './UserCartDto';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/admin/users-with-carts'; // URL based on your backend

  constructor(private http: HttpClient) {}

  getUsersWithCarts(): Observable<UserCartDto[]> {
    // console.log()
    return this.http.get<UserCartDto[]>(this.apiUrl);
  }
}
