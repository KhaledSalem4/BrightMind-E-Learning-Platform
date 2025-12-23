import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      title: 'Complete Web Development',
      description: 'Master HTML, CSS, JavaScript, and modern frameworks to build amazing websites.',
      category: 'web',
      level: 'Beginner',
      rating: 4.9,
      duration: '40 hours',
      students: 2500,
      price: 49.99,
      image: 'assets/images/3.jpg'
    },
    {
      id: 2,
      title: 'React.js Masterclass',
      description: 'Build modern web applications with React.js, hooks, and state management.',
      category: 'web',
      level: 'Intermediate',
      rating: 4.8,
      duration: '35 hours',
      students: 1800,
      price: 59.99,
      image: 'assets/images/react.jpg'
    },
    {
      id: 3,
      title: 'Node.js Backend Development',
      description: 'Create powerful server-side applications with Node.js and Express.',
      category: 'web',
      level: 'Intermediate',
      rating: 4.7,
      duration: '30 hours',
      students: 1500,
      price: 54.99,
      image: 'assets/images/node.jpg'
    },
    {
      id: 4,
      title: 'Data Science Fundamentals',
      description: 'Learn data analysis, visualization, and machine learning basics.',
      category: 'data',
      level: 'Beginner',
      rating: 4.8,
      duration: '45 hours',
      students: 2200,
      price: 69.99,
      image: 'assets/images/data1.jpg'
    },
    {
      id: 5,
      title: 'Machine Learning with Python',
      description: 'Build and deploy machine learning models using Python and scikit-learn.',
      category: 'data',
      level: 'Advanced',
      rating: 4.9,
      duration: '50 hours',
      students: 1600,
      price: 79.99,
      image: 'assets/images/2.jpg'
    },
    {
      id: 6,
      title: 'SQL Database Mastery',
      description: 'Master SQL queries, database design, and optimization techniques.',
      category: 'data',
      level: 'Intermediate',
      rating: 4.7,
      duration: '25 hours',
      students: 1900,
      price: 44.99,
      image: 'assets/images/sql.jpg'
    },
    {
      id: 7,
      title: 'SEO Optimization',
      description: 'Boost your website ranking with proven SEO strategies and techniques.',
      category: 'marketing',
      level: 'Beginner',
      rating: 4.6,
      duration: '20 hours',
      students: 1400,
      price: 39.99,
      image: 'assets/images/seo.jpg'
    },
    {
      id: 8,
      title: 'Social Media Marketing',
      description: 'Create engaging campaigns across Facebook, Instagram, and LinkedIn.',
      category: 'marketing',
      level: 'Beginner',
      rating: 4.8,
      duration: '22 hours',
      students: 2100,
      price: 42.99,
      image: 'assets/images/soc.jpg'
    },
    {
      id: 9,
      title: 'Google Ads Masterclass',
      description: 'Run profitable advertising campaigns with Google Ads and Analytics.',
      category: 'marketing',
      level: 'Intermediate',
      rating: 4.7,
      duration: '28 hours',
      students: 1300,
      price: 54.99,
      image: 'assets/images/ads.jpg'
    },
    {
      id: 10,
      title: 'UI/UX Design Principles',
      description: 'Create beautiful and user-friendly interfaces with modern design principles.',
      category: 'design',
      level: 'Beginner',
      rating: 4.9,
      duration: '32 hours',
      students: 1700,
      price: 49.99,
      image: 'assets/images/ui.jpg'
    },
    {
      id: 11,
      title: 'Adobe Creative Suite',
      description: 'Master Photoshop, Illustrator, and InDesign for professional design work.',
      category: 'design',
      level: 'Intermediate',
      rating: 4.8,
      duration: '38 hours',
      students: 1500,
      price: 64.99,
      image: 'assets/images/adob.jpg'
    },
    {
      id: 12,
      title: 'Web Design with Figma',
      description: 'Design stunning websites and prototypes using Figma.',
      category: 'design',
      level: 'Beginner',
      rating: 4.7,
      duration: '24 hours',
      students: 1800,
      price: 39.99,
      image: 'assets/images/web.jpg'
    }
  ];

  private coursesSubject = new BehaviorSubject<Course[]>(this.courses);
  courses$ = this.coursesSubject.asObservable();

  constructor() {
    this.loadCourses();
  }

  getAllCourses(): Course[] {
    return this.courses;
  }

  getCoursesByCategory(category: string): Course[] {
    if (category === 'all') {
      return this.courses;
    }
    return this.courses.filter(course => course.category === category);
  }

  getCourseById(id: number): Course | undefined {
    return this.courses.find(course => course.id === id);
  }

  getFeaturedCourses(count: number = 3): Course[] {
    return this.courses.slice(0, count);
  }

  // Add new course
  addCourse(course: Course): void {
    const newId = Math.max(...this.courses.map(c => c.id), 0) + 1;
    const newCourse = { ...course, id: newId };
    this.courses.push(newCourse);
    this.coursesSubject.next(this.courses);
    this.saveCourses();
  }

  // Update course
  updateCourse(id: number, course: Partial<Course>): void {
    const index = this.courses.findIndex(c => c.id === id);
    if (index !== -1) {
      this.courses[index] = { ...this.courses[index], ...course };
      this.coursesSubject.next(this.courses);
      this.saveCourses();
    }
  }

  // Delete course
  deleteCourse(id: number): void {
    this.courses = this.courses.filter(c => c.id !== id);
    this.coursesSubject.next(this.courses);
    this.saveCourses();
  }

  // Toggle favorite
  toggleFavorite(id: number): void {
    const course = this.courses.find(c => c.id === id);
    if (course) {
      course.isFavorite = !course.isFavorite;
      this.coursesSubject.next(this.courses);
      this.saveCourses();
    }
  }

  // Toggle watched
  toggleWatched(id: number): void {
    const course = this.courses.find(c => c.id === id);
    if (course) {
      course.isWatched = !course.isWatched;
      this.coursesSubject.next(this.courses);
      this.saveCourses();
    }
  }

  // Get favorites
  getFavoriteCourses(): Course[] {
    return this.courses.filter(c => c.isFavorite);
  }

  // Get watched courses
  getWatchedCourses(): Course[] {
    return this.courses.filter(c => c.isWatched);
  }

  // Save to localStorage
  private saveCourses(): void {
    localStorage.setItem('courses', JSON.stringify(this.courses));
  }

  // Load from localStorage
  private loadCourses(): void {
    const saved = localStorage.getItem('courses');
    if (saved) {
      this.courses = JSON.parse(saved);
      this.coursesSubject.next(this.courses);
    }
  }
}
