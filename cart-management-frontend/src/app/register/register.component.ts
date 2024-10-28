import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  userData = {
    name: '',
    email: '',
    password: '',
    userType: ''
  };

  // variables for admin password handling:
  adminPassword : string = '';
  requiredAdminPassword: string = '123';
  adminPasswordError:string='';

  // variable for successfull registration:
  registrationSuccess:boolean = false;
  emailErrorMessage: string ='';
  
  // countdown variable:
  countdown:number = 5;
  
  // variable confirm password
  confirmPassword: string = '';
  passwordMatch : boolean = true;

  checkPasswordMatch() {
    this.passwordMatch =  this.confirmPassword === this.userData.password;
    console.log(this.userData.password);
    console.log(this.confirmPassword);
    console.log(this.passwordMatch);
  }
  

  checkAdminPassword() {
    
    if(this.adminPassword != this.requiredAdminPassword){
      this.adminPasswordError = "Incorrect Admin Password, Choose \"normal\" user or try again. "
    }
    else{
      this.adminPasswordError = ""; 
    }
  }

  


  constructor(
    private userService: UserService,
    private router : Router
  ) {}




  onSubmit() {
    this.emailErrorMessage = '';
    // check if all fields have been filed or not !
    if(!this.userData.name || !this.userData.email || !this.userData.password || !this.userData.userType){
      return;
    }
    if(this.userData.password != this.confirmPassword) {return;}

    // prevent submit if there is an error in the admin password.
    if(this.userData.userType === 'admin' && this.adminPasswordError) {
      return;
    }
    else{
      console.log("admin pass working!");
    }// working till here. 
    // DONE: send form data to backend : done 

    this.userService.registerUser(this.userData).subscribe(
      (response : string) => {
        
        if(response === "User with this email already exists.") {

          console.log('User with this email id already exits!');
          this.emailErrorMessage = 'User with this email already exits!';
          return;
        }

        console.log('Registration successful!', response);


        this.registrationSuccess = true;
        this.startCountdown();
        
      },
      (error) => {
        console.error('Registration failed', error);
        // handle registration error
      }

    );
  }

  startCountdown() {
    const interval = setInterval(() => {
      if(this.countdown > 0) {
        this.countdown--;
      }else{
        clearInterval(interval);
        this.router.navigate(['/login'])
      }
    }, 1000);
  }

  onEmailChange(){
    this.emailErrorMessage = '';
  }


  resetform() {
    this.registrationSuccess = false;
    this.userData = {
      name: '',
      email: '',
      password: '',
      userType: ''
    };
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

}

// TODO:
/*
1. CLEAR THE ALREADY EXISTS MESSAGE ONCE THE USER REGISTERS WITH A DIFFERENT EMAIL.------>done.
2. INSERT A REFRESH FORM BUTTON---------------->done
3. INSERT A NAVIGATE BUTTON. ------------------>done.
4. IMPLEMENT DOUBLE PASSWORD CHECK ! -----------> done

 */