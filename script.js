
    document.querySelector('.mobile-menu').addEventListener('click', () => {
        document.querySelector('nav ul').classList.toggle('show');
    });


    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    document.querySelector('nav ul').classList.remove('show');
                }
            }
        });
    });


    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function () {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            document.querySelectorAll('.portfolio-item').forEach(item => {
                item.style.display = (filter === 'all' || item.classList.contains(filter)) ? 'block' : 'none';
            });
        });
    });

    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');

    function showTestimonial(index) {
        testimonials.forEach(t => t.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }

    document.querySelector('.prev').addEventListener('click', () => {
        let newIndex = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(newIndex);
    });

    document.querySelector('.next').addEventListener('click', () => {
        let newIndex = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(newIndex);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });

    setInterval(() => {
        let newIndex = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(newIndex);
    }, 5000);

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            const messageElement = document.getElementById('form-message');
            messageElement.textContent = 'Thank you for your message! We will get back to you soon.';
            messageElement.classList.remove('error');
            messageElement.classList.add('success');
            messageElement.style.display = 'block';

            this.reset();

            setTimeout(() => {
                messageElement.style.display = 'none';
            }, 5000);
        });
    }

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            alert(`Thank you for subscribing with ${email}! You will receive our latest updates soon.`);
            this.reset();
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        const footerYear = new Date().getFullYear();
        const footerText = document.querySelector('.footer-bottom p');
        footerText.innerHTML = footerText.innerHTML.replace(/\d{4}/, footerYear);
    });

    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const closeChatbot = document.getElementById('closeChatbot');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const sendMessageBtn = document.getElementById('sendMessage');
    const chatbotOptions = document.querySelectorAll('.chatbot-option');

    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.add('open');
    });

    closeChatbot.addEventListener('click', () => {
        chatbotWindow.classList.remove('open');
    });

    sendMessageBtn.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') sendMessage();
    });

    chatbotOptions.forEach(option => {
        option.addEventListener('click', function () {
            const optionType = this.getAttribute('data-option');
            addMessage(this.textContent, 'user');
            setTimeout(() => {
                const botResponse = generateBotResponse(optionType);
                addMessage(botResponse, 'bot');
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }, 1000);
        });
    });

    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            chatbotInput.value = '';
            setTimeout(() => {
                const botResponse = generateBotResponse(message);
                addMessage(botResponse, 'bot');
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }, 1000);
        }
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.textContent = text;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function generateBotResponse(input) {
        const responses = {
            services: "We offer a wide range of services including website development, SEO, social media management, content creation, data analysis, and more. Which service are you interested in?",
            pricing: "Our pricing varies based on project complexity and requirements. We offer custom quotes tailored to your specific needs. Would you like to schedule a free consultation?",
            contact: "You can reach us at:\nPhone: +91 8979956377\nEmail: contact@intenthedgefund.com\nAddress: 179 Dadherukalan, Muzaffar Nagar, Uttar Pradesh",
            appointment: "Great! Please provide your preferred date and time, and we'll schedule a consultation.",
            default: "Thank you for your message! Our team will get back to you soon. Is there anything else I can help you with today?"
        };

        const msg = input.toLowerCase();
        if (msg.includes('hello') || msg.includes('hi')) return "Hello! How can I assist you today?";
        if (msg.includes('thank')) return "You're welcome! Let me know if you need anything else.";
        if (msg.includes('service')) return responses.services;
        if (msg.includes('price') || msg.includes('cost')) return responses.pricing;
        if (msg.includes('contact')) return responses.contact;
        if (msg.includes('appointment') || msg.includes('meeting')) return responses.appointment;

        return responses.default;
    }

    const contactLink = document.getElementById('contactLink');
    const contactModal = document.getElementById('contactModal');
    const formContainer = document.getElementById('contactFormContainer');

    contactLink.addEventListener('click', function (e) {
        e.preventDefault();

        if (!formContainer.innerHTML.trim()) {
            fetch('contactForm.html')
                .then(res => res.text())
                .then(html => {
                    formContainer.innerHTML = html;
                    contactModal.classList.add('show');

                    setTimeout(() => {
                        const cancelBtn = document.getElementById('cancelBtn') || document.querySelector('.close-icon');
                        if (cancelBtn) {
                            cancelBtn.addEventListener('click', () => {
                                contactModal.classList.remove('show');
                            });
                        }
                    }, 100);
                })
                .catch(err => {
                    console.error('Failed to load contact form:', err);
                });
        } else {
            contactModal.classList.add('show');
        }
    });
