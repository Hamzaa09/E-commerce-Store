# JOGKAR - E-Commerce Store

A fully custom-built e-commerce platform with a polished storefront, an admin dashboard for running the whole business, and an AI chat assistant to help customers about the store.

<p align="right">

[View Source Code](https://github.com/Hamzaa09/E-commerce-Store) &nbsp; | &nbsp;
[Live Demo](https://e-commerce-store-clientside.vercel.app)
</p>

## Overview

A complete storefront-to-checkout experience, backed by an admin dashboard that gives full visibility and control over the store - products, users, blogs, and customer queries - all in one place.

## Key Features

**Storefront**
- Polished, responsive UI with pagination and loading skeletons for a smooth browsing experience
- AI-powered chat assistant that answers questions about the store
- Multi-provider authentication - sign in with Google (via Google Sign-In), Facebook, or email
- Shopping cart with full Stripe payment integration

**Admin Dashboard**
- Complete store analytics and statistics at a glance
- Manage products, users, blogs, and customer queries
- Add and publish new products and blog posts directly from the dashboard

## Tech Stack

**Frontend**

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?style=flat-square&logo=daisyui&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat-square&logo=mui&logoColor=white)
![ApexCharts](https://img.shields.io/badge/ApexCharts-008FFB?style=flat-square)

**Backend**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)

**Services & Integrations**

![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=flat-square&logo=stripe&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white)
![n8n](https://img.shields.io/badge/n8n-EA4B71?style=flat-square&logo=n8n&logoColor=white)
![Google](https://img.shields.io/badge/Google%20Sign--In-4285F4?style=flat-square&logo=google&logoColor=white)
![Facebook](https://img.shields.io/badge/Facebook%20Login-1877F2?style=flat-square&logo=facebook&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-22B573?style=flat-square)

## Project Structure

```
└── E-commerce-Store/
    ├── backEnd
    │   ├── .gitignore
    │   ├── connection
    │   ├── controllers
    │   ├── index.js
    │   ├── middlewares
    │   ├── models
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── routers
    │   ├── uploads
    │   ├── utilities
    │   └── vercel.json
    └── frontEnd
        ├── .gitignore
        ├── README.md
        ├── eslint.config.js
        ├── index.html
        ├── package-lock.json
        ├── package.json
        ├── public
        ├── src
        ├── store
        ├── utilities
        ├── vercel.json
        └── vite.config.js
```

## Setup & Run

**1. Clone the repo**
```bash
git clone https://github.com/Hamzaa09/E-commerce-Store.git
cd E-commerce-Store
```

**2. Backend setup**
```bash
cd backend
npm install
```
Create a `.env` file in `backend/` with:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_app_password
```
```bash
npm run dev
```

**3. Frontend setup**
```bash
cd frontend
npm install
```
Create a `.env` file in `frontend/` with:
```
VITE_API_BASE_URL=http://localhost:5000
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_FACEBOOK_APP_ID=your_facebook_app_id
VITE_N8N_WEBHOOK_URL=your_n8n_chat_webhook_url
```
```bash
npm run dev
```

> **Note:** never commit real `.env` values - keep them local and add `.env` to `.gitignore`.

## Author

Muhammad Hamza - [github.com/Hamzaa09](https://github.com/Hamzaa09) | [LinkedIn](https://www.linkedin.com/in/muhammad-hamza-109413300/)
