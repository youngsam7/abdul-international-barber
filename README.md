# Abdul D International Barber - Premium Barbershop Website

A modern, premium, mobile-first barbershop website for Abdul D International Barber in Abuja, Nigeria.

## Features

- **Hero Section**: Strong headline with Call Now & WhatsApp booking buttons
- **About Section**: Professional story highlighting hygiene, quality, and 24/7 availability
- **Services & Pricing**: Complete price list with book buttons
  - Black Fade – ₦2,000
  - Scissors Cut – ₦4,000
  - Low Fade & Beard Shave – ₦5,500
  - Haircut with Face Cleansing – ₦8,000
  - Female Cut – ₦12,000
  - Children Cut – ₦2,000
- **Gallery**: Showcase of professional haircuts and shop interior
- **Reviews**: 4.9-star rating display with customer testimonials
- **Contact**: Full address, phone, Google Map, and contact form

## Design

- **Theme**: Dark (black/charcoal) with gold accent highlights
- **Typography**: Playfair Display (headings) + Inter (body)
- **Style**: Premium international barbershop aesthetic
- **Responsive**: Fully mobile-first design

## Tech Stack

- **Frontend**: React 18, Tailwind CSS, Lucide Icons
- **Backend**: FastAPI, MongoDB
- **Deployment**: Supervisor managed services

## Business Information

- **Name**: Abdul D International Barber
- **Address**: 5th Floor, Exclusive Serene Hotel, Plot 31 Reuben Okoya Crescent, Wuye, Abuja, Nigeria
- **Phone**: 0806 445 1637
- **Hours**: Open 24 Hours
- **Rating**: 4.9 stars (59 reviews)

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/services` - List all services with prices
- `GET /api/reviews` - Get customer reviews
- `GET /api/business-info` - Business contact details
- `POST /api/contact` - Submit contact form message

## Running the Project

```bash
# Start all services
sudo supervisorctl restart all

# Check status
sudo supervisorctl status
```

Frontend: http://localhost:3000
Backend: http://localhost:8001
