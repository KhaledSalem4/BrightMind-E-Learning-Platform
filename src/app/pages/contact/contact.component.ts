import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm = {
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  };

  onSubmit(): void {
    console.log('Form submitted:', this.contactForm);
    alert('Thank you for contacting us! We will get back to you soon.');
    this.resetForm();
  }

  resetForm(): void {
    this.contactForm = {
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}
