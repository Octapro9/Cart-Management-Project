import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8080/api/cart'; // cart endpoint

  constructor(private http: HttpClient) {}

  getCart(userId:number): Observable<any[]> {
    // console.log(this.userId);
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`); // Fetch user's cart items
  }

  addToCart(item: any): Observable<any> {
    const userId = localStorage.getItem('userId');
    // console.log(userId);
    const numericUserId = userId ? parseInt(userId, 10) : 0;
    // console.log(item.itemId);

    console.log('user id: ' ,item.userId);
    return this.http.post(`${this.apiUrl}/add`, { 
      userId: numericUserId,
      itemId: item.itemId,
      quantity: 1
     }); 
  }

  removeFromCart(cartRequest:any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove`, {body:cartRequest}); // Adjust this according to backend
  }

  updateQuantity(cartRequest: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, cartRequest); // Adjust this according to backend
  }
}
