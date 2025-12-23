import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { AuthService } from '../../services/auth.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  courses: Course[] = [];
  
  // Form data
  courseForm: Course = {
    id: 0,
    title: '',
    description: '',
    category: 'web',
    level: 'Beginner',
    rating: 0,
    duration: '',
    students: 0,
    price: 0,
    image: 'assets/images/course-default.jpg',
    isWatched: false,
    isFavorite: false
  };

  isEditing = false;
  editingId: number | null = null;

  constructor(
    private coursesService: CoursesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courses = this.coursesService.getAllCourses();
  }

  onSubmit(): void {
    if (this.isEditing && this.editingId) {
      this.coursesService.updateCourse(this.editingId, this.courseForm);
      this.isEditing = false;
      this.editingId = null;
    } else {
      this.coursesService.addCourse(this.courseForm);
    }
    this.resetForm();
    this.loadCourses();
  }

  editCourse(course: Course): void {
    this.isEditing = true;
    this.editingId = course.id;
    this.courseForm = { ...course };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteCourse(id: number): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.coursesService.deleteCourse(id);
      this.loadCourses();
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingId = null;
    this.resetForm();
  }

  resetForm(): void {
    this.courseForm = {
      id: 0,
      title: '',
      description: '',
      category: 'web',
      level: 'Beginner',
      rating: 0,
      duration: '',
      students: 0,
      price: 0,
      image: 'assets/images/course-default.jpg',
      isWatched: false,
      isFavorite: false
    };
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/admin-login']);
  }
}
