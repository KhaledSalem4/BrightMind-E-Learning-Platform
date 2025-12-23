import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;
  favoritesCount = 0;

  constructor(
    public authService: AuthService,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.updateFavoritesCount();
    this.coursesService.courses$.subscribe(() => {
      this.updateFavoritesCount();
    });
  }

  updateFavoritesCount(): void {
    this.favoritesCount = this.coursesService.getFavoriteCourses().length;
  }

  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
