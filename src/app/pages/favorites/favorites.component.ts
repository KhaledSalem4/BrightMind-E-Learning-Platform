import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favoriteCourses: Course[] = [];
  watchedCourses: Course[] = [];

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.loadCourses();
    this.coursesService.courses$.subscribe(() => {
      this.loadCourses();
    });
  }

  loadCourses(): void {
    this.favoriteCourses = this.coursesService.getFavoriteCourses();
    this.watchedCourses = this.coursesService.getWatchedCourses();
  }

  removeFavorite(id: number, event: Event): void {
    event.stopPropagation();
    this.coursesService.toggleFavorite(id);
  }

  removeWatched(id: number, event: Event): void {
    event.stopPropagation();
    this.coursesService.toggleWatched(id);
  }

  getRatingStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
}
