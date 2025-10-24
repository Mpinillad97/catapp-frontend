import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage {
  name=''; email=''; password=''; msg=''; error='';
  constructor(private auth: AuthService, private router: Router) {}
  submit(){
    this.error=''; this.msg='';
    this.auth.register(this.name, this.email, this.password).subscribe({
      next: () => { this.msg='Registrado, ahora inicia sesión.'; this.router.navigateByUrl('/auth/login'); },
      error: (e) => this.error = e?.error?.error?.message || 'Error de registro'
    });
  }
}
