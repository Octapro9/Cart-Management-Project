import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponseDto } from './UserResponseDto';
import { response } from 'express';
import { text } from 'stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/users'; // Spring Boot backend URL

  constructor(private http: HttpClient) {}

  // Register a new user
  registerUser(userData: any): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/register`, userData, {
      responseType: 'text' as 'json'

    });
  }

  // Login a user
  loginUser(loginData: { email: string, password: string }): Observable<UserResponseDto> {

    return this.http.post<UserResponseDto>(`${this.apiUrl}/login`, loginData);

  }

  // Logout a user
  logoutUser(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}); // API endpoint
  }
  
}
