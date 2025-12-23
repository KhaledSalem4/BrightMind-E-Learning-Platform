import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkAuth());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // Default admin credentials (في التطبيق الحقيقي، هتبقى في backend)
  private readonly ADMIN_EMAIL = 'admin@brightmind.com';
  private readonly ADMIN_PASSWORD = 'admin123';
  private readonly AUTH_KEY = 'admin_authenticated';

  constructor() {}

  login(email: string, password: string): boolean {
    if (email === this.ADMIN_EMAIL && password === this.ADMIN_PASSWORD) {
      localStorage.setItem(this.AUTH_KEY, 'true');
      this.isAuthenticatedSubject.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.checkAuth();
  }

  private checkAuth(): boolean {
    return localStorage.getItem(this.AUTH_KEY) === 'true';
  }
}
