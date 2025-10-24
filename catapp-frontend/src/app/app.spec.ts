import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { AuthApiService } from './core/services/auth-api.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,          
        HttpClientTestingModule, 
        RouterTestingModule      
      ],
      providers: [
        {
          provide: AuthApiService,
          useValue: {
            login: jest.fn().mockReturnValue(of({ token: 'T', user: { id: '1', name: 'Test', email: 't@t.com' } })),
            register: jest.fn().mockReturnValue(of({ ok: true })),
            me: jest.fn().mockReturnValue(of({ user: { id: '1', name: 'Test', email: 't@t.com' } })),
          },
        },
      ],
    }).compileComponents();
  });

  it('debe crearse', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
