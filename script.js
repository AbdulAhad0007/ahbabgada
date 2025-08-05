 // Mobile Menu Toggle
 document.querySelector('.mobile-menu').addEventListener('click', function() {
    document.querySelector('nav ul').classList.toggle('show');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            document.querySelector('nav ul').classList.remove('show');
        }
    });
});

// Portfolio Filter
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        filterPortfolioItems(filter);
    });
});

function filterPortfolioItems(filter) {
    const items = document.querySelectorAll('.portfolio-item');
    
    items.forEach(item => {
        if (filter === 'all' || item.classList.contains(filter)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    currentTestimonial = index;
}

document.querySelector('.prev').addEventListener('click', function() {
    let newIndex = currentTestimonial - 1;
    if (newIndex < 0) newIndex = testimonials.length - 1;
    showTestimonial(newIndex);
});

document.querySelector('.next').addEventListener('click', function() {
    let newIndex = currentTestimonial + 1;
    if (newIndex >= testimonials.length) newIndex = 0;
    showTestimonial(newIndex);
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
        showTestimonial(index);
    });
});

// Auto-rotate testimonials
setInterval(() => {
    let newIndex = currentTestimonial + 1;
    if (newIndex >= testimonials.length) newIndex = 0;
    showTestimonial(newIndex);
}, 5000);

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    const messageElement = document.getElementById('form-message');
    
    // Here you would typically send the data to your server
    // For this example, we'll simulate a successful submission
    messageElement.textContent = 'Thank you for your message! We will get back to you soon.';
    messageElement.classList.remove('error');
    messageElement.classList.add('success');
    messageElement.style.display = 'block';
    
    // Reset form
    this.reset();
    
    // Hide message after 5 seconds
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 5000);
});

// Newsletter Form Submission
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input').value;
    
    // Here you would typically send the email to your server
    // For this example, we'll just show an alert
    alert("Thank you for subscribing with ${email}! You will receive our latest updates soon.");
    
    // Reset form
    this.reset();
});

// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.footer-bottom p').innerHTML = 
        document.querySelector('.footer-bottom p').innerHTML.replace('2023', new Date().getFullYear());
});

// Chatbot Functionality
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const closeChatbot = document.getElementById('closeChatbot');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const sendMessageBtn = document.getElementById('sendMessage');
const chatbotOptions = document.querySelectorAll('.chatbot-option');

// Toggle chatbot window
chatbotToggle.addEventListener('click', function() {
    chatbotWindow.classList.add('open');
});

// Close chatbot window
closeChatbot.addEventListener('click', function() {
    chatbotWindow.classList.remove('open');
});

// Send message function
function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message) {
        // Add user message
        addMessage(message, 'user');
        
        // Clear input
        chatbotInput.value = '';
        
        // Simulate bot response after a short delay
        setTimeout(() => {
            const botResponse = generateBotResponse(message);
            addMessage(botResponse, 'bot');
            
            // Scroll to bottom
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 1000);
    }
}

// Send message on button click
sendMessageBtn.addEventListener('click', sendMessage);

// Send message on Enter key
chatbotInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Handle option clicks
chatbotOptions.forEach(option => {
    option.addEventListener('click', function() {
        const optionType = this.getAttribute('data-option');
        const userMessage = this.textContent;
        
        // Add user message
        addMessage(userMessage, 'user');
        
        // Generate and add bot response
        setTimeout(() => {
            const botResponse = generateBotResponse(optionType);
            addMessage(botResponse, 'bot');
            
            // Scroll to bottom
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 1000);
    });
});

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = text;
    chatbotMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Generate bot response based on user input
function generateBotResponse(input) {
    const responses = {
        services: "We offer a wide range of services including website development, SEO, social media management, content creation, data analysis, and more. Which service are you interested in?",
        pricing: "Our pricing varies based on project complexity and requirements. We offer custom quotes tailored to your specific needs. Would you like to schedule a free consultation?",
        contact: "You can reach us at:\nPhone: +91 8979956377\nEmail: contact@intenthedgefund.com\nAddress: 179 Dadherukalan, Muzaffar Nagar, Uttar Pradesh\nBusiness Hours: Mon-Fri 9AM-6PM",
        appointment: "Great! Please provide your preferred date and time, and we'll schedule a consultation. You can also contact us directly to book an appointment.",
        default: "Thank you for your message! Our team will get back to you soon. Is there anything else I can help you with today?"
    };

    // Check for specific keywords
    if (input.toLowerCase().includes('hello') || input.toLowerCase().includes('hi')) {
        return "Hello! How can I assist you today?";
    } else if (input.toLowerCase().includes('thank')) {
        return "You're welcome! Let me know if you need anything else.";
    } else if (input.toLowerCase().includes('service') || input === 'services') {
        return responses.services;
    } else if (input.toLowerCase().includes('price') || input.toLowerCase().includes('cost') || input === 'pricing') {
        return responses.pricing;
    } else if (input.toLowerCase().includes('contact') || input === 'contact') {
        return responses.contact;
    } else if (input.toLowerCase().includes('appointment') || input.toLowerCase().includes('meeting') || input === 'appointment') {
        return responses.appointment;
    } else {
        return responses.default;
    }
}
