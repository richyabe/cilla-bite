// DOM Elements
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.querySelector('.cart-modal');
const closeCart = document.querySelector('.close-cart');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total-value');
const cartCount = document.querySelector('.cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const checkoutBtn = document.querySelector('.checkout-btn');
const menuTabs = document.querySelectorAll('.menu-tab');
const menuItems = document.querySelectorAll('.menu-item');
const testimonialSlider = document.querySelector('.testimonials-slider');
const testimonials = document.querySelectorAll('.testimonial');
const testimonialPrev = document.querySelector('.testimonial-prev');
const testimonialNext = document.querySelector('.testimonial-next');
const backToTop = document.querySelector('.back-to-top');
const orderForm = document.getElementById('orderForm');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

// Cart functionality
let cart = [];

// Add to cart function
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const item = e.target.closest('.menu-item');
        const title = item.querySelector('.menu-title span:first-child').textContent;
        const price = item.querySelector('.menu-price').textContent;
        const image = item.querySelector('img').src;
        
        // Add to cart animation
        button.classList.add('added');
        setTimeout(() => button.classList.remove('added'), 500);
        
        // Add item to cart
        cart.push({
            title: title,
            price: price,
            image: image,
            quantity: 1
        });
        
        updateCart();
    });
});

// Update cart display
function updateCart() {
    // Update cart count
    cartCount.textContent = cart.length;
    
    // Clear cart items
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
        cartTotal.textContent = '₦0';
        return;
    }
    
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemPrice = parseInt(item.price.replace('₦', '').replace(',', ''));
        total += itemPrice * item.quantity;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">${item.price}</div>
                </div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn minus" data-index="${index}">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn plus" data-index="${index}">+</button>
                <button class="cart-item-remove" data-index="${index}">&times;</button>
            </div>
        `;
        
        cartItems.appendChild(cartItemElement);
    });
    
    // Format total with commas
    cartTotal.textContent = '₦' + total.toLocaleString();
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                updateCart();
            }
        });
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            cart[index].quantity++;
            updateCart();
        });
    });
    
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            updateCart();
        });
    });
}

// Cart modal functionality
cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'flex';
});

closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Close cart when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Checkout button - redirect to WhatsApp
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Create order message
    let orderMessage = "Hello Cilla Bites! I would like to place an order:\n\n";
    
    cart.forEach(item => {
        orderMessage += `• ${item.title} - Quantity: ${item.quantity}\n`;
    });
    
    orderMessage += `\nTotal: ${cartTotal.textContent}\n\n`;
    orderMessage += "Please contact me to finalize my order. Thank you!";
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(orderMessage);
    
    // Redirect to WhatsApp
    window.open(`https://wa.me/2348045120378?text=${encodedMessage}`, '_blank');
    
    // Close cart and reset
    cartModal.style.display = 'none';
    cart = [];
    updateCart();
});

// Menu filtering
menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        menuTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        const category = tab.dataset.category;
        
        menuItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Testimonial slider
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.remove('active');
        if (i === index) {
            testimonial.classList.add('active');
        }
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
}

testimonialNext.addEventListener('click', nextTestimonial);
testimonialPrev.addEventListener('click', prevTestimonial);

// Auto-rotate testimonials
setInterval(nextTestimonial, 5000);

// Back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form submission
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will contact you shortly.');
    orderForm.reset();
});

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// Initialize cart
updateCart();

// Particle Background Effect
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation duration and delay
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;
        particle.style.animation = `float ${duration}s linear infinite ${delay}s`;
        
        // Random color variation
        const colors = ['#e63946', '#f1faee', '#457b9d', '#1d3557', '#a8dadc'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        container.appendChild(particle);
    }
}

// Sparkle Effect
function createSparkles() {
    const container = document.getElementById('sparkles');
    const sparkleCount = 20;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        
        // Random position
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        
        // Random animation delay
        const delay = Math.random() * 3;
        sparkle.style.animationDelay = `${delay}s`;
        
        // Random color
        const colors = ['#e63946', '#f1faee', '#457b9d', '#1d3557', '#a8dadc', '#ffd166', '#06d6a0'];
        sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        container.appendChild(sparkle);
    }
}

// Initialize particle effects when page loads
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    createSparkles();
});

// Enhanced scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scale-in');
            entry.target.style.animationDelay = '0.1s';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.menu-item, .package-card, .value-card, .gallery-item, .order-step').forEach(el => {
    observer.observe(el);
});