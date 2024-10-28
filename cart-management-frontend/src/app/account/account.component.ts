import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service'; 
import { CartService } from '../cart.service'; 
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { copyFileSync } from 'node:fs';


@Component({
  selector: 'app-account',
  standalone:true,
  templateUrl: './account.component.html',
  imports:[FormsModule, CommonModule],
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {

  username: string = ''; // Get this from a user service
  items: any[] = []; // Available items
  filteredItems: any[] = []; //items to display after filtering
  searchTerm:string = '';
  cartItems: any[] = []; // Items in the cart
  totalPrice: number = 0;

  // Variables for pagination:
  itemsPerPage : number = 5;
  currentPage: number = 1;
  totalPages: number = 1;
  paginatedItems: any[] = [];

  constructor(
    private itemService: ItemService,
    private cartService: CartService ,
    private userService: UserService,
    private router : Router
  ) {}

  ngOnInit(): void {
    // console.log('ngOnInitworking')
    
    this.fetchItems();
    this.fetchCart();

    this.username = localStorage.getItem('username') || ''; 
    console.log(this.username)
    if(!this.username){
      this.logout();
    }
  }

  fetchItems() {
    console.log('fetch Items called');

    this.itemService.getItems().subscribe((data) => {
      console.log('item service method called')
      this.items = data;
      this.filteredItems = this.items; // Initially, show all items
      
      this.calculateTotalPages();
      this.updatePaginatedItems();

    });
  }



  // Filter items based on search term
  filterItems() {
    
    if (this.searchTerm) {
      this.filteredItems = this.items.filter(item =>
        item.itemName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredItems = this.items; // Reset to all items when search is cleared
    }
    // after filtering, calculate the total pages and paginate the items.
    this.calculateTotalPages();
    this.updatePaginatedItems();

  }



  // concept of Pagination

  // Calculate total pages
  calculateTotalPages() {

    this.totalPages = Math.ceil(this.filteredItems.length/this.itemsPerPage);

  }

  // Update the paginatedItems array for the current page
  updatePaginatedItems() {

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    console.log('start index: ',  startIndex);

    const endIndex = startIndex + this.itemsPerPage;
    console.log('end index ', endIndex);

    this.paginatedItems = this.filteredItems.slice(startIndex, endIndex);
    
  }

  nextPage() {
    if(this.currentPage<this.totalPages) {
      this.currentPage++;
      this.updatePaginatedItems();
    }
  }
  previousPage() {
    if(this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedItems();
    }
  }



  
  
  

  fetchCart() {

    const userId = localStorage.getItem('userId');
    const numericUserId = userId ? parseInt(userId, 10):0;
    // console.log("hello ");
    this.cartService.getCart(numericUserId).subscribe((data) => {
      // console.log(" af ");
      this.cartItems = data;
      this.calculateTotalPrice();
    });
    
  }

  addToCart(item: any) {
    
    const cartRequest = {
        userId: parseInt(localStorage.getItem('userId') || '0'),
        itemId: item.itemId,
        quantity: 1 // default value 1 
    };
    this.cartService.addToCart(cartRequest).subscribe(() => {
        this.fetchCart(); // Refresh the cart
    });
  }

  removeFromCart(cartItem: any) {
    const userId = localStorage.getItem('userId');
    const cartRequest = {
      userId : userId,
      itemId : cartItem.item.itemId
    }

    this.cartService.removeFromCart(cartRequest).subscribe(() => {
      this.fetchCart(); // Refresh the cart
    });

  }

  updateQuantity(cartItem: any) {
    const userId = localStorage.getItem('userId');
    const cartRequest = {
      userId: userId, 
      itemId: cartItem.item.itemId,
      quantity: cartItem.quantity
    };
  
    console.log('Update request:', cartRequest);
    this.cartService.updateQuantity(cartRequest).subscribe(() => {
      this.calculateTotalPrice();
      this.fetchCart(); // Optionally refresh the cart
    });
  }


  // Calculate total price
  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((total, cartItem) => {
      return total + (cartItem.item.price * cartItem.quantity);
    }, 0);
  }


  // Logout function
  logout() {
    // this.userService.logoutUser().subscribe({
    //   next: () => {
    //     // Clear localStorage
    //     localStorage.removeItem('username');
    //     localStorage.removeItem('email');
        
    //     // Redirect to login page
    //     // this.router.navigate(['/login']);
    //   },
    //   error: (error) => {
    //     console.error('Logout failed', error);
    //   }
    // });
        // Clear localStorage
        localStorage.clear();
        
        // Redirect to login page
        this.router.navigate(['/login']);
  }
}
