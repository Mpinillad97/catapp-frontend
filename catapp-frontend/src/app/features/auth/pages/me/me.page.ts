import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-me-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss']
})
export class MePage implements OnInit {
  me: any = {};       
  error = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.me = this.auth.user ?? {};
    this.auth.me().subscribe({
      next: (apiData) => {
        const fromApi = (apiData?.user ?? apiData) || {};
        this.me = { ...this.me, ...fromApi };
      },
      error: (e) => {
        this.error = e?.error?.error?.message || 'No se pudo obtener información del perfil';
      }
    });
  }
}
