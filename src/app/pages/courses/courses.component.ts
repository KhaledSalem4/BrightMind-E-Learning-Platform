import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  allCourses: Course[] = [];
  displayedCourses: Course[] = [];
  selectedCategory = 'all';

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.loadCourses();
    this.coursesService.courses$.subscribe(courses => {
      this.allCourses = courses;
      this.filterCourses(this.selectedCategory);
    });
  }

  loadCourses(): void {
    this.allCourses = this.coursesService.getAllCourses();
    this.displayedCourses = this.allCourses;
  }

  filterCourses(category: string): void {
    this.selectedCategory = category;
    this.displayedCourses = this.coursesService.getCoursesByCategory(category);
  }

  getRatingStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  toggleFavorite(id: number, event: Event): void {
    event.stopPropagation();
    this.coursesService.toggleFavorite(id);
  }

  toggleWatched(id: number, event: Event): void {
    event.stopPropagation();
    this.coursesService.toggleWatched(id);
  }
}
