import React, { useState, useEffect } from 'react';
import './App.css';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Star,
  Menu,
  X,
  Scissors,
  Award,
  Shield,
  Sparkles,
  ChevronRight,
  Quote,
  Instagram,
  Facebook,
  Mail
} from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

// Business Info
const BUSINESS = {
  name: "Abdul D International Barber",
  tagline: "Premium Grooming Experience",
  address: "5th Floor, Exclusive Serene Hotel, Plot 31 Reuben Okoya Crescent, Wuye, Abuja, Nigeria",
  phone: "0806 445 1637",
  whatsapp: "+2348064451637",
  hours: "Open 24 Hours",
  rating: 4.9,
  totalReviews: 59
};

// Services
const SERVICES = [
  { id: 1, name: "Black Fade", price: 2000, description: "Clean, sharp black fade haircut", icon: "✂️" },
  { id: 2, name: "Scissors Cut", price: 4000, description: "Precision scissors haircut for a classic look", icon: "✂️" },
  { id: 3, name: "Low Fade & Beard Shave", price: 5500, description: "Low fade with professional beard grooming", icon: "🪒" },
  { id: 4, name: "Haircut with Face Cleansing", price: 8000, description: "Premium haircut with facial treatment", icon: "✨" },
  { id: 5, name: "Female Cut", price: 12000, description: "Stylish cuts for ladies", icon: "💇‍♀️" },
  { id: 6, name: "Children Cut", price: 2000, description: "Gentle, fun haircuts for kids", icon: "👦" }
];

// Reviews
const REVIEWS = [
  { id: 1, name: "Chukwudi O.", rating: 5, comment: "Best barber in Abuja! Always leaves my hair looking fresh and clean. Highly recommend!", date: "Dec 2024" },
  { id: 2, name: "Ibrahim M.", rating: 5, comment: "Professional service, hygienic environment. Worth every naira! Abdul is a true master.", date: "Dec 2024" },
  { id: 3, name: "Emeka N.", rating: 5, comment: "Abdul knows his craft. My go-to barber for the past 2 years. Never disappointed.", date: "Dec 2024" },
  { id: 4, name: "Aisha B.", rating: 5, comment: "Great experience! They did an amazing job on my son's haircut. Very patient with kids.", date: "Nov 2024" },
  { id: 5, name: "David A.", rating: 5, comment: "Premium quality service. The face cleansing treatment is exceptional! Feel like a new man.", date: "Nov 2024" }
];

// Gallery images (placeholder barbershop images)
const GALLERY = [
  { id: 1, url: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&h=400&fit=crop", alt: "Barbershop interior" },
  { id: 2, url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=400&fit=crop", alt: "Haircut in progress" },
  { id: 3, url: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=400&fit=crop", alt: "Professional haircut" },
  { id: 4, url: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=400&fit=crop", alt: "Barber tools" },
  { id: 5, url: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop", alt: "Fresh fade haircut" },
  { id: 6, url: "https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=400&h=400&fit=crop", alt: "Beard grooming" }
];

// Navigation Component
function Navbar({ isScrolled, mobileMenuOpen, setMobileMenuOpen }) {
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <nav className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'navbar-scrolled' : ''}`} data-testid="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2" data-testid="navbar-logo">
            <Scissors className="w-6 h-6 md:w-8 md:h-8 text-gold-500" />
            <span className="font-display text-lg md:text-xl font-bold gold-text">Abdul D</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8" data-testid="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-gold-500 transition-colors duration-300 font-medium"
                data-testid={`nav-link-${link.name.toLowerCase()}`}
              >
                {link.name}
              </a>
            ))}
            <a
              href={`https://wa.me/${BUSINESS.whatsapp.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-5 py-2 rounded-full flex items-center space-x-2"
              data-testid="nav-book-btn"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Book Now</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gold-500 p-2"
            data-testid="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mobile-menu-enter pb-4" data-testid="mobile-nav">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-gray-300 hover:text-gold-500 transition-colors border-b border-gray-800"
                data-testid={`mobile-nav-link-${link.name.toLowerCase()}`}
              >
                {link.name}
              </a>
            ))}
            <a
              href={`https://wa.me/${BUSINESS.whatsapp.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-4 px-5 py-3 rounded-full flex items-center justify-center space-x-2 w-full"
              data-testid="mobile-book-btn"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Book via WhatsApp</span>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section id="home" className="hero-section hero-pattern flex items-center" data-testid="hero-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-0 w-full">
        <div className="text-center max-w-4xl mx-auto relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/30 mb-6" data-testid="hero-badge">
            <Star className="w-4 h-4 text-gold-500 mr-2" fill="#D4AF37" />
            <span className="text-gold-500 text-sm font-medium">{BUSINESS.rating} Rating • {BUSINESS.totalReviews} Reviews</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight" data-testid="hero-headline">
            Experience
            <span className="block gold-text">Premium Grooming</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto" data-testid="hero-description">
            Step into luxury at Abdul D International Barber. Where precision meets style,
            and every haircut is a masterpiece. Available 24/7 in the heart of Abuja.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12" data-testid="hero-cta">
            <a
              href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`}
              className="btn-gold px-8 py-4 rounded-full flex items-center space-x-3 text-lg w-full sm:w-auto justify-center"
              data-testid="hero-call-btn"
            >
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
            </a>
            <a
              href={`https://wa.me/${BUSINESS.whatsapp.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold px-8 py-4 rounded-full flex items-center space-x-3 text-lg w-full sm:w-auto justify-center"
              data-testid="hero-whatsapp-btn"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Quick Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400" data-testid="hero-info">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gold-500" />
              <span>{BUSINESS.hours}</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gold-500 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-gold-500" />
              <span>Wuye, Abuja</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  const features = [
    { icon: Award, title: "Expert Barbers", description: "Years of experience in modern and classic styles" },
    { icon: Shield, title: "Hygiene First", description: "Sterilized tools and clean environment always" },
    { icon: Sparkles, title: "Premium Products", description: "Only the finest grooming products used" }
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-charcoal-950" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="text-gold-500 font-medium mb-2 block" data-testid="about-label">ABOUT US</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6" data-testid="about-title">
              More Than Just a <span className="gold-text">Haircut</span>
            </h2>
            <p className="text-gray-400 text-lg mb-6" data-testid="about-description">
              At Abdul D International Barber, we believe every man deserves to look and feel his best.
              Located in the prestigious Exclusive Serene Hotel, we offer a luxury grooming experience
              that combines traditional barbering skills with modern techniques.
            </p>
            <p className="text-gray-400 text-lg mb-8">
              Our commitment to excellence, hygiene, and customer satisfaction has earned us a
              stellar 4.9-star rating from our valued clients. Whether you need a quick trim or
              a complete transformation, we're here for you—24 hours a day, 7 days a week.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4" data-testid={`about-feature-${index}`}>
                  <div className="w-12 h-12 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-gold-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="gold-border-animated rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=700&fit=crop"
                alt="Abdul D International Barber Shop"
                className="w-full h-[400px] md:h-[500px] object-cover"
                data-testid="about-image"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-charcoal-900 border border-gold-500 rounded-xl p-4 shadow-2xl" data-testid="about-badge">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center">
                  <span className="text-2xl font-bold text-charcoal-950">24</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Hours Open</p>
                  <p className="text-gray-400 text-sm">Every Day</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Services Section
function ServicesSection() {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-charcoal-900" data-testid="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold-500 font-medium mb-2 block" data-testid="services-label">OUR SERVICES</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="services-title">
            Services & <span className="gold-text">Pricing</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto" data-testid="services-description">
            From classic cuts to modern styles, we offer a range of premium services to keep you looking sharp.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="services-grid">
          {SERVICES.map((service) => (
            <div key={service.id} className="service-card rounded-xl p-6 md:p-8" data-testid={`service-card-${service.id}`}>
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="font-display text-xl font-semibold text-white mb-2">{service.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{service.description}</p>
              <div className="flex items-center justify-between">
                <span className="gold-text text-2xl font-bold">{formatPrice(service.price)}</span>
                <a
                  href={`https://wa.me/${BUSINESS.whatsapp.replace('+', '')}?text=Hi, I'd like to book a ${service.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-500 hover:text-gold-400 flex items-center space-x-1 text-sm font-medium"
                  data-testid={`service-book-${service.id}`}
                >
                  <span>Book</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href={`https://wa.me/${BUSINESS.whatsapp.replace('+', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold px-8 py-4 rounded-full inline-flex items-center space-x-3"
            data-testid="services-cta"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Book Your Appointment</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// Gallery Section
function GallerySection() {
  return (
    <section id="gallery" className="py-20 md:py-28 bg-charcoal-950" data-testid="gallery-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold-500 font-medium mb-2 block" data-testid="gallery-label">GALLERY</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="gallery-title">
            Our <span className="gold-text">Work</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto" data-testid="gallery-description">
            Take a look at some of our finest work. Every cut is crafted with precision and care.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid" data-testid="gallery-grid">
          {GALLERY.map((image) => (
            <div key={image.id} className="group relative overflow-hidden rounded-xl" data-testid={`gallery-item-${image.id}`}>
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-64 md:h-72 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-medium">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">Follow us for more</p>
          <a
            href="https://www.instagram.com"
            className="btn-outline-gold px-6 py-3 rounded-full inline-flex items-center space-x-2"
            data-testid="gallery-instagram"
          >
            <Instagram className="w-5 h-5" />
            <span>@abduldbarber</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// Reviews Section
function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 md:py-28 bg-charcoal-900" data-testid="reviews-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold-500 font-medium mb-2 block" data-testid="reviews-label">TESTIMONIALS</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="reviews-title">
            What Our <span className="gold-text">Clients Say</span>
          </h2>

          {/* Rating Summary */}
          <div className="flex items-center justify-center space-x-4 mt-6" data-testid="reviews-summary">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 text-gold-500" fill="#D4AF37" />
              ))}
            </div>
            <span className="text-2xl font-bold text-white">{BUSINESS.rating}</span>
            <span className="text-gray-400">({BUSINESS.totalReviews} reviews)</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="reviews-grid">
          {REVIEWS.map((review) => (
            <div key={review.id} className="review-card rounded-xl p-6" data-testid={`review-card-${review.id}`}>
              <Quote className="w-8 h-8 text-gold-500/30 mb-4" />
              <p className="text-gray-300 mb-4 italic">"{review.comment}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">{review.name}</p>
                  <p className="text-gray-500 text-sm">{review.date}</p>
                </div>
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold-500" fill="#D4AF37" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews Link */}
        <div className="text-center mt-12">
          <a
            href="https://share.google/s3ESJeLqLGiXXyDme"
            className="text-gold-500 hover:text-gold-400 inline-flex items-center space-x-2"
            data-testid="reviews-google-link"
          >
            <span>See all reviews on Google</span>
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('sending');

    try {
      const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', phone: '', message: '' });
        setTimeout(() => setSubmitStatus(''), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-charcoal-950" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold-500 font-medium mb-2 block" data-testid="contact-label">CONTACT US</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="contact-title">
            Visit Our <span className="gold-text">Shop</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto" data-testid="contact-description">
            Come experience the best grooming service in Abuja. We're open 24 hours for your convenience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info & Form */}
          <div>
            {/* Contact Details */}
            <div className="space-y-6 mb-10">
              <div className="flex items-start space-x-4" data-testid="contact-address">
                <div className="w-12 h-12 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-gold-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Address</h3>
                  <p className="text-gray-400">{BUSINESS.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4" data-testid="contact-phone">
                <div className="w-12 h-12 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-gold-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Phone</h3>
                  <a href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`} className="text-gold-500 hover:text-gold-400">
                    {BUSINESS.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4" data-testid="contact-hours">
                <div className="w-12 h-12 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-gold-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Business Hours</h3>
                  <p className="text-gray-400">{BUSINESS.hours}</p>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10" data-testid="contact-buttons">
              <a
                href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`}
                className="btn-gold px-6 py-3 rounded-full flex items-center justify-center space-x-2 flex-1"
                data-testid="contact-call-btn"
              >
                <Phone className="w-5 h-5" />
                <span>Call Now</span>
              </a>
              <a
                href={`https://wa.me/${BUSINESS.whatsapp.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold px-6 py-3 rounded-full flex items-center justify-center space-x-2 flex-1"
                data-testid="contact-whatsapp-btn"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
              <h3 className="font-display text-xl font-semibold text-white mb-4">Send us a message</h3>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="contact-input w-full px-4 py-3 rounded-lg"
                data-testid="contact-name-input"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="contact-input w-full px-4 py-3 rounded-lg"
                data-testid="contact-phone-input"
              />
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={4}
                className="contact-input w-full px-4 py-3 rounded-lg resize-none"
                data-testid="contact-message-input"
              />
              <button
                type="submit"
                disabled={submitStatus === 'sending'}
                className="btn-gold w-full py-3 rounded-lg font-semibold disabled:opacity-50"
                data-testid="contact-submit-btn"
              >
                {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <p className="text-green-500 text-center" data-testid="contact-success">Thank you! We'll contact you shortly.</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-500 text-center" data-testid="contact-error">Something went wrong. Please try again.</p>
              )}
            </form>
          </div>

          {/* Map */}
          <div className="map-container h-[400px] lg:h-full min-h-[400px]" data-testid="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.089123456789!2d7.4234567!3d9.0765432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sExclusive%20Serene%20Hotel%2C%20Wuye%2C%20Abuja!5e0!3m2!1sen!2sng!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Abdul D International Barber Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="footer py-12" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Scissors className="w-8 h-8 text-gold-500" />
              <span className="font-display text-xl font-bold gold-text">Abdul D International</span>
            </div>
            <p className="text-gray-400 text-sm">
              Premium barbershop in Abuja offering world-class grooming services. Open 24/7.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#services" className="text-gray-400 hover:text-gold-500 block text-sm">Services</a>
              <a href="#gallery" className="text-gray-400 hover:text-gold-500 block text-sm">Gallery</a>
              <a href="#reviews" className="text-gray-400 hover:text-gold-500 block text-sm">Reviews</a>
              <a href="#contact" className="text-gray-400 hover:text-gold-500 block text-sm">Contact</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>{BUSINESS.phone}</p>
              <p>Wuye, Abuja, Nigeria</p>
              <p>{BUSINESS.hours}</p>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="https://instagram.com" className="text-gray-400 hover:text-gold-500" data-testid="footer-instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" className="text-gray-400 hover:text-gold-500" data-testid="footer-facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={`mailto:info@abduldbarber.com`} className="text-gray-400 hover:text-gold-500" data-testid="footer-email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider mb-8"></div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm" data-testid="footer-copyright">
          <p>© {new Date().getFullYear()} Abdul D International Barber. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// WhatsApp Floating Button
function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${BUSINESS.whatsapp.replace('+', '')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all"
      data-testid="whatsapp-float"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}

// Main App Component
function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App" data-testid="app">
      <Navbar
        isScrolled={isScrolled}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <ReviewsSection />
      <ContactSection />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

export default App;
