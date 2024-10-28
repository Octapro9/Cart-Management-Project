import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { UserResponseDto } from '../UserResponseDto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  errorMessage: string = ''; // New property for error message
  constructor(private userService: UserService, private router: Router) {}

  ngOninit() {
    localStorage.clear();
  }

  navigateToHome(){
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.userService.loginUser(this.loginData).subscribe({
      next: (response : UserResponseDto) => {
        console.log('Login successful!', response);
        localStorage.setItem('username', response.username);
        console.log('login component: ', response.username);
        localStorage.setItem('userId', response.userId.toString());
        localStorage.setItem('email', response.email);
        localStorage.setItem('userType', response.userType);
        // Handle successful login

        // Redirect based on userType
        if (response.userType === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/account']);
        }
      },
      error: (error) => {
        console.error('Login failed', error);
        // Handle error
        this.errorMessage = 'Email and password do not match'; 
      },
      complete: () => {
        console.log('Login request completed.');
      }
    });
  }
}