// EduLearn E-Learning Platform JavaScript

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScroll();
    initContactForm();
    initCourseFilter();
    initNavbarScroll();
    initAnimations();
});

// Smooth Scroll for Navigation Links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact Form Validation and Submission
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous validation states
            clearValidationErrors();
            
            // Get form data
            const formData = {
                firstName: document.getElementById('firstName').value.trim(),
                lastName: document.getElementById('lastName').value.trim(),
                email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value.trim(),
                newsletter: document.getElementById('newsletter').checked
            };
            
            // Validate form
            let isValid = true;
            
            // Validate first name
            if (!formData.firstName) {
                showFieldError('firstName', 'Please provide your first name.');
                isValid = false;
            }
            
            // Validate last name
            if (!formData.lastName) {
                showFieldError('lastName', 'Please provide your last name.');
                isValid = false;
            }
            
            // Validate email
            if (!formData.email) {
                showFieldError('email', 'Please provide your email address.');
                isValid = false;
            } else if (!isValidEmail(formData.email)) {
                showFieldError('email', 'Please provide a valid email address.');
                isValid = false;
            }
            
            // Validate message
            if (!formData.message) {
                showFieldError('message', 'Please provide your message.');
                isValid = false;
            } else if (formData.message.length < 10) {
                showFieldError('message', 'Message must be at least 10 characters long.');
                isValid = false;
            }
            
            if (isValid) {
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="loading"></span> Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual API call)
                setTimeout(() => {
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Show success modal
                    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
                    successModal.show();
                    
                    // Reset form
                    contactForm.reset();
                    clearValidationErrors();
                    
                    // Log form data (for development)
                    console.log('Form submitted with data:', formData);
                }, 2000);
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validateField(this);
                }
            });
        });
    }
}

// Course Filter Functionality
function initCourseFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseItems = document.querySelectorAll('.course-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter courses
            courseItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.classList.remove('hidden');
                    // Add animation delay for staggered effect
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Initialize Animations
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.course-card, .team-card, .stat-item, .value-icon');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Form Validation Helper Functions
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    // Clear previous validation
    field.classList.remove('is-valid', 'is-invalid');
    
    let isValid = true;
    let errorMessage = '';
    
    switch (fieldName) {
        case 'firstName':
        case 'lastName':
            if (!value) {
                isValid = false;
                errorMessage = `Please provide your ${fieldName === 'firstName' ? 'first' : 'last'} name.`;
            }
            break;
            
        case 'email':
            if (!value) {
                isValid = false;
                errorMessage = 'Please provide your email address.';
            } else if (!isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Please provide a valid email address.';
            }
            break;
            
        case 'message':
            if (!value) {
                isValid = false;
                errorMessage = 'Please provide your message.';
            } else if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long.';
            }
            break;
    }
    
    if (isValid) {
        field.classList.add('is-valid');
    } else {
        field.classList.add('is-invalid');
        showFieldError(fieldName, errorMessage);
    }
    
    return isValid;
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + 'Error');
    
    if (field && errorElement) {
        field.classList.add('is-invalid');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearValidationErrors() {
    const invalidFields = document.querySelectorAll('.is-invalid');
    const errorMessages = document.querySelectorAll('.invalid-feedback');
    
    invalidFields.forEach(field => {
        field.classList.remove('is-invalid');
    });
    
    errorMessages.forEach(error => {
        error.style.display = 'none';
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Course Enrollment Modal Enhancement
document.addEventListener('click', function(e) {
    if (e.target.matches('[data-bs-toggle="modal"][data-bs-target="#enrollModal"]')) {
        // Add course name to modal if available
        const courseCard = e.target.closest('.course-card');
        if (courseCard) {
            const courseTitle = courseCard.querySelector('.card-title').textContent;
            const modalTitle = document.querySelector('#enrollModal .modal-title');
            if (modalTitle) {
                modalTitle.textContent = `Enrolled in ${courseTitle}`;
            }
        }
    }
});

// Add loading states to buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn[data-bs-toggle="modal"]')) {
        const btn = e.target;
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<span class="loading"></span> Processing...';
        btn.disabled = true;
        
        // Reset button after modal is shown
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1000);
    }
});

// Add scroll-to-top functionality
function addScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'btn btn-primary position-fixed';
    scrollToTopBtn.style.cssText = `
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: none;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', throttle(function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    }, 100));
    
    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll-to-top button
addScrollToTop();

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal.show');
        openModals.forEach(modal => {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) {
                modalInstance.hide();
            }
        });
    }
});

// Add focus management for accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        const focusableElements = document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
});

// Performance optimization: Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if images have data-src attributes
initLazyLoading();

// Add smooth transitions for all interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const interactiveElements = document.querySelectorAll('a, button, .card, .nav-link');
    
    interactiveElements.forEach(element => {
        element.style.transition = 'all 0.3s ease';
    });
});

// Console welcome message
console.log(`
🎓 Welcome to EduLearn E-Learning Platform!
📚 Built with HTML, CSS, JavaScript, and Bootstrap
🚀 Ready for learning and development
`);

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initSmoothScroll,
        initContactForm,
        initCourseFilter,
        validateField,
        isValidEmail
    };
}
