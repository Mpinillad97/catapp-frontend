import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  email=''; password=''; error='';
  constructor(private auth: AuthService, private router: Router) {}
  submit(){
    this.error='';
    this.auth.login(this.email, this.password).subscribe({
      next: () => this.router.navigateByUrl('/auth/me'),
      error: (e) => this.error = e?.error?.error?.message || 'Error de login'
    });
  }
}
