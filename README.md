# AutoPro Services - Automotive Website

A modern, responsive website for an automotive service company featuring a contact form and professional design.

## Features

### Header
- Clean navigation with logo placeholder in the center
- Responsive design that adapts to mobile devices
- Smooth hover effects and modern styling

### Contact Form
- **Customer Name**: Text input with validation (2-50 characters, letters only)
- **Customer Email**: Email input with format validation
- **Customer Phone**: Phone input with number formatting and validation
- **Message**: Textarea with 500 character limit and real-time counter
- **Submit Button**: Styled button with hover effects (no backend action implemented)

### Footer
- Company information and services
- Contact details and business hours
- Social media links
- Professional automotive branding

## Design Features

- **Modern UI**: Clean, professional design with automotive theme
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Animations**: Smooth transitions and hover effects
- **Form Validation**: Real-time client-side validation with error messages
- **Character Counter**: Live character count for the message field
- **Success Feedback**: Success notification after form submission

## Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript**: Form validation and interactivity
- **Font Awesome**: Icons for enhanced UI
- **Google Fonts**: Inter font family for modern typography

## File Structure

```
automotive-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## Getting Started

1. Open `index.html` in a web browser
2. The website is fully functional with client-side validation
3. Fill out the form to see validation and success messages

## Customization

### Logo Replacement
Replace the logo placeholder in the header:
```html
<div class="logo-placeholder">
    <!-- Replace with your logo image -->
    <img src="your-logo.png" alt="Company Logo">
</div>
```

### Company Information
Update the footer section with your actual company details in `index.html`.

### Colors and Branding
The main brand colors can be changed in `styles.css`:
- Primary red: `#e74c3c`
- Secondary red: `#c0392b`
- Dark blue: `#2c3e50`

### Form Backend Integration
To make the form functional, add your backend endpoint to the form submission handler in `script.js`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

This project is created for demonstration purposes. Feel free to customize and use for your automotive business needs.

