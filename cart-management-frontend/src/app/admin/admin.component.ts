import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../admin.service';
import { UserCartDto } from '../UserCartDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{

  adminName: string | null = localStorage.getItem('username');
  usersWithCarts: UserCartDto[] = [];


  // Variables for pagination:
  itemsPerPage : number = 5;
  currentPage: number = 1;
  totalPages: number = 1;
  paginatedItems: any[] = [];

  constructor(private adminService: AdminService, private router : Router) {}

  ngOnInit(): void {
    this.loadUsersWithCarts();
    if(this.adminName == null) {
      this.logout();
    }
   
  }

  loadUsersWithCarts(): void {
    console.log('hello admin');
    console.log(this.adminName);
    this.adminService.getUsersWithCarts().subscribe(
      data => {
        this.usersWithCarts = data;
        console.log(this.usersWithCarts[0].carts );
        this.calculateTotalPages();
        this.updatePaginatedItems();
      },
      error => {
        console.error('Error fetching users with carts', error);
      }


    );
  }

  logout(): void {
    localStorage.clear();  // Clear all user-related data from localStorage
    this.router.navigate(['/login']); // Redirect to the login page
  }



   // concept of Pagination

  // Calculate total pages
  calculateTotalPages() {

    this.totalPages = Math.ceil(this.usersWithCarts.length/this.itemsPerPage);

  }

  // Update the paginatedItems array for the current page
  updatePaginatedItems() {

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    console.log('start index: ',  startIndex);

    const endIndex = startIndex + this.itemsPerPage;
    console.log('end index ', endIndex);

    this.paginatedItems = this.usersWithCarts.slice(startIndex, endIndex);
    console.log(this.paginatedItems);
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






}
