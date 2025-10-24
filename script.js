// Form validation and interactivity
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('customerName');
    const emailInput = document.getElementById('customerEmail');
    const phoneInput = document.getElementById('customerPhone');
    const messageInput = document.getElementById('customerMessage');
    const charCountDisplay = document.getElementById('charCount');
    const characterCounter = document.querySelector('.character-counter');
    
    // Tooltip elements
    const tooltip = document.getElementById('textareaTooltip');
    const tooltipClose = document.querySelector('.tooltip-close');
    
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu when clicking on nav links and handle smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Handle anchor links with smooth scrolling
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    // Close mobile menu first
                    mobileMenuBtn.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    // Smooth scroll to target with offset for fixed header
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20; // 20px extra padding
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            } else {
                // For regular links, just close mobile menu
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Character counter for textarea
    messageInput.addEventListener('input', function() {
        const currentLength = this.value.length;
        const maxLength = this.getAttribute('maxlength');
        
        charCountDisplay.textContent = currentLength;
        
        // Update counter color based on character count
        characterCounter.classList.remove('warning', 'danger');
        
        if (currentLength > maxLength * 0.8) {
            characterCounter.classList.add('warning');
        }
        if (currentLength > maxLength * 0.95) {
            characterCounter.classList.add('danger');
        }
    });
    
    // Tooltip functionality for textarea
    let tooltipManuallyDismissed = false;
    
    function showTooltip() {
        if (tooltip && !tooltipManuallyDismissed) {
            tooltip.classList.add('show');
        }
    }
    
    function hideTooltip() {
        if (tooltip) {
            tooltip.classList.remove('show');
        }
    }
    
    // Show tooltip when user focuses on textarea
    messageInput.addEventListener('focus', function() {
        // Show tooltip after a short delay when focusing
        setTimeout(() => {
            if (document.activeElement === messageInput) {
                showTooltip();
            }
        }, 300);
    });
    
    // Show tooltip when user clicks on textarea (even if already focused)
    messageInput.addEventListener('click', function() {
        if (!tooltipManuallyDismissed) {
            showTooltip();
        }
    });
    
    // Also show tooltip when user starts typing (for first few characters)
    messageInput.addEventListener('input', function() {
        if (this.value.length > 0 && this.value.length <= 5 && !tooltipManuallyDismissed) {
            showTooltip();
        }
    });
    
    // Hide tooltip when textarea loses focus (but allow it to show again)
    messageInput.addEventListener('blur', function() {
        // Hide tooltip after a short delay to allow clicking on tooltip
        setTimeout(() => {
            if (document.activeElement !== messageInput && !tooltip.matches(':hover')) {
                hideTooltip();
            }
        }, 200);
    });
    
    // Hide tooltip when clicking close button
    if (tooltipClose) {
        tooltipClose.addEventListener('click', function() {
            hideTooltip();
            tooltipManuallyDismissed = true; // Prevent showing again until page reload
        });
    }
    
    // Hide tooltip when clicking outside (but don't prevent future shows)
    document.addEventListener('click', function(e) {
        if (tooltip && tooltip.classList.contains('show')) {
            if (!tooltip.contains(e.target) && e.target !== messageInput) {
                hideTooltip();
                // Don't set tooltipManuallyDismissed = true here, so it can show again
            }
        }
    });
    
    // Hide tooltip on escape key (but don't prevent future shows)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && tooltip && tooltip.classList.contains('show')) {
            hideTooltip();
            // Don't set tooltipManuallyDismissed = true here, so it can show again
        }
    });
    
    // Keep tooltip visible when hovering over it
    if (tooltip) {
        tooltip.addEventListener('mouseenter', function() {
            // Cancel any pending hide operations
            clearTimeout(window.tooltipHideTimeout);
        });
        
        tooltip.addEventListener('mouseleave', function() {
            // Hide tooltip when mouse leaves and textarea is not focused
            if (document.activeElement !== messageInput) {
                hideTooltip();
            }
        });
    }
    
    // Form validation functions
    function validateName(name) {
        const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,50}$/;
        return nameRegex.test(name.trim());
    }
    
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    }
    
    function validatePhone(phone) {
        // Remove all formatting characters to get just numbers
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        
        // Brazilian cellphone validation:
        // - Must have exactly 11 digits
        // - First digit must be area code (11-99)
        // - Third digit must be 9 (cellphone identifier)
        if (cleanPhone.length !== 11) {
            return false;
        }
        
        // Check if area code is valid (11-99)
        const areaCode = parseInt(cleanPhone.slice(0, 2));
        if (areaCode < 11 || areaCode > 99) {
            return false;
        }
        
        // Check if third digit is 9 (cellphone identifier)
        if (cleanPhone[2] !== '9') {
            return false;
        }
        
        return true;
    }
    
    function validateMessage(message) {
        return message.trim().length >= 10 && message.trim().length <= 500;
    }
    
    // Show error message
    function showError(inputElement, errorElement, message) {
        inputElement.style.borderColor = '#e74c3c';
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    // Clear error message
    function clearError(inputElement, errorElement) {
        inputElement.style.borderColor = '#e9ecef';
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
    
    // Real-time validation
    nameInput.addEventListener('blur', function() {
        const nameError = document.getElementById('nameError');
        if (!validateName(this.value)) {
            showError(this, nameError, 'Por favor, insira um nome válido (2-50 caracteres, apenas letras)');
        } else {
            clearError(this, nameError);
        }
    });
    
    emailInput.addEventListener('blur', function() {
        const emailError = document.getElementById('emailError');
        if (!validateEmail(this.value)) {
            showError(this, emailError, 'Por favor, insira um email válido');
        } else {
            clearError(this, emailError);
        }
    });
    
    phoneInput.addEventListener('blur', function() {
        const phoneError = document.getElementById('phoneError');
        if (!validatePhone(this.value)) {
            showError(this, phoneError, 'Por favor, insira um celular brasileiro válido (ex: (11) 99999-9999)');
        } else {
            clearError(this, phoneError);
        }
    });
    
    messageInput.addEventListener('blur', function() {
        const messageError = document.getElementById('messageError');
        if (!validateMessage(this.value)) {
            showError(this, messageError, 'A mensagem deve ter entre 10 e 500 caracteres');
        } else {
            clearError(this, messageError);
        }
    });
    
    // Form submission handling
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear all previous errors
        const errorElements = document.querySelectorAll('.error-message');
        const inputElements = document.querySelectorAll('.form-input, .form-textarea');
        
        errorElements.forEach(error => error.classList.remove('show'));
        inputElements.forEach(input => input.style.borderColor = '#e9ecef');
        
        let isValid = true;
        
        // Validate all fields
        if (!validateName(nameInput.value)) {
            showError(nameInput, document.getElementById('nameError'), 'Por favor, insira um nome válido (2-50 caracteres, apenas letras)');
            isValid = false;
        }
        
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, document.getElementById('emailError'), 'Por favor, insira um email válido');
            isValid = false;
        }
        
        if (!validatePhone(phoneInput.value)) {
            showError(phoneInput, document.getElementById('phoneError'), 'Por favor, insira um celular brasileiro válido (ex: (11) 99999-9999)');
            isValid = false;
        }
        
        if (!validateMessage(messageInput.value)) {
            showError(messageInput, document.getElementById('messageError'), 'A mensagem deve ter entre 10 e 500 caracteres');
            isValid = false;
        }
        
        if (isValid) {
            // Show success message (since no backend processing is implemented)
            showSuccessMessage();
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.error-message.show');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // Success message display
    function showSuccessMessage() {
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Change button to success state
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Mensagem enviada!';
        submitBtn.style.background = 'linear-gradient(135deg, #27ae60, #229954)';
        submitBtn.disabled = true;
        
        // Show success notification
        const successNotification = document.createElement('div');
        successNotification.className = 'success-notification';
        successNotification.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <h3>Obrigado por nos contatar!</h3>
                <p>Recebemos sua mensagem e vamos te responder dentro de 24 horas.</p>
            </div>
        `;
        
        // Add success notification styles
        const style = document.createElement('style');
        style.textContent = `
            .success-notification {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                animation: fadeIn 0.3s ease-out;
            }
            
            .success-content {
                background: white;
                padding: 2rem;
                border-radius: 15px;
                text-align: center;
                max-width: 400px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                animation: slideUp 0.3s ease-out;
            }
            
            .success-content i {
                font-size: 3rem;
                color: #27ae60;
                margin-bottom: 1rem;
            }
            
            .success-content h3 {
                color: #2c3e50;
                margin-bottom: 0.5rem;
                font-size: 1.5rem;
            }
            
            .success-content p {
                color: #7f8c8d;
                line-height: 1.6;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(successNotification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            successNotification.remove();
            style.remove();
            
            // Reset form and button
            form.reset();
            charCountDisplay.textContent = '0';
            characterCounter.classList.remove('warning', 'danger');
            
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
            submitBtn.disabled = false;
        }, 3000);
    }
    
    // Brazilian cellphone number masking: (11) 99999-9999
    phoneInput.addEventListener('input', function(e) {
        // Get the current cursor position
        const cursorPosition = this.selectionStart;
        const oldValue = this.value;
        
        // Remove all non-numeric characters
        let cleaned = this.value.replace(/\D/g, '');
        
        // Limit to 11 digits (Brazilian cellphone format)
        if (cleaned.length > 11) {
            cleaned = cleaned.slice(0, 11);
        }
        
        // Apply Brazilian cellphone format: (XX) XXXXX-XXXX
        let formatted = '';
        if (cleaned.length > 0) {
            if (cleaned.length <= 2) {
                formatted = `(${cleaned}`;
            } else if (cleaned.length <= 7) {
                formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
            } else {
                formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
            }
        }
        
        // Update the input value
        this.value = formatted;
        
        // Restore cursor position (adjust for formatting changes)
        const lengthDifference = formatted.length - oldValue.length;
        const newCursorPosition = Math.min(cursorPosition + lengthDifference, formatted.length);
        this.setSelectionRange(newCursorPosition, newCursorPosition);
    });
    
    // Handle backspace and delete keys properly
    phoneInput.addEventListener('keydown', function(e) {
        const cursorPosition = this.selectionStart;
        const value = this.value;
        
        // Allow backspace, delete, tab, escape, enter, and arrow keys
        if ([8, 9, 27, 13, 46, 37, 38, 39, 40].indexOf(e.keyCode) !== -1 ||
            // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
            (e.keyCode === 65 && e.ctrlKey === true) ||
            (e.keyCode === 67 && e.ctrlKey === true) ||
            (e.keyCode === 86 && e.ctrlKey === true) ||
            (e.keyCode === 88 && e.ctrlKey === true)) {
            return;
        }
        
        // Handle special formatting characters
        if (e.keyCode === 8) { // Backspace
            const charBefore = value.charAt(cursorPosition - 1);
            if ([' ', '(', ')', '-'].includes(charBefore)) {
                e.preventDefault();
                // Move cursor past the formatting character
                const newPos = cursorPosition - 1;
                this.setSelectionRange(newPos, newPos);
                // Trigger input event to reformat
                this.dispatchEvent(new Event('input', { bubbles: true }));
            }
        }
    });
    
    // Additional smooth scrolling support for older browsers
    if (!('scrollBehavior' in document.documentElement.style)) {
        // Polyfill for smooth scrolling in older browsers
        function smoothScrollTo(targetPosition, duration = 800) {
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            let startTime = null;
            
            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
            
            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
            
            requestAnimationFrame(animation);
        }
        
        // Override the smooth scroll behavior for older browsers
        window.smoothScrollTo = smoothScrollTo;
    }
    
    // Add loading animation to submit button on hover
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    submitBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    // Clear button functionality
    const clearButtons = document.querySelectorAll('.clear-btn');
    
    clearButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetInput = document.getElementById(targetId);
            
            if (targetInput) {
                // Clear the input value
                targetInput.value = '';
                
                // Focus back on the input
                targetInput.focus();
                
                // Clear any error messages
                const errorElement = document.getElementById(targetId.replace('customer', '').toLowerCase() + 'Error');
                if (errorElement) {
                    clearError(targetInput, errorElement);
                }
                
                // Reset character counter for message field
                if (targetId === 'customerMessage') {
                    charCountDisplay.textContent = '0';
                    characterCounter.classList.remove('warning', 'danger');
                }
                
                // Add a subtle animation
                this.style.transform = targetId === 'customerMessage' ? 'scale(0.8)' : 'translateY(-50%) scale(0.8)';
                setTimeout(() => {
                    this.style.transform = targetId === 'customerMessage' ? 'scale(1)' : 'translateY(-50%) scale(1)';
                }, 150);
            }
        });
    });
    
    // Show/hide clear buttons based on input content
    function toggleClearButton(input) {
        const container = input.closest('.input-container, .textarea-container');
        const clearBtn = container.querySelector('.clear-btn');
        
        if (input.value.length > 0) {
            clearBtn.style.opacity = '1';
            clearBtn.style.visibility = 'visible';
        } else {
            clearBtn.style.opacity = '0';
            clearBtn.style.visibility = 'hidden';
        }
    }
    
    // Add event listeners to show/hide clear buttons
    [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
        input.addEventListener('input', function() {
            toggleClearButton(this);
        });
        
        input.addEventListener('focus', function() {
            if (this.value.length > 0) {
                toggleClearButton(this);
            }
        });
        
        input.addEventListener('blur', function() {
            const container = this.closest('.input-container, .textarea-container');
            const clearBtn = container.querySelector('.clear-btn');
            
            // Hide clear button after a short delay to allow clicking
            setTimeout(() => {
                if (!container.matches(':hover')) {
                    clearBtn.style.opacity = '0';
                    clearBtn.style.visibility = 'hidden';
                }
            }, 200);
        });
    });
});

// Additional utility functions
// Phone formatting is now handled inline with the input event listeners

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Close success notification with Escape key
    if (e.key === 'Escape') {
        const notification = document.querySelector('.success-notification');
        if (notification) {
            notification.click();
        }
    }
});

// Performance optimization: Debounce function for input validation
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

