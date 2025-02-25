# 🛒 Snoke Stationery Shop Frontend

This project is a **React-based frontend application** for **Snoke Stationery Shop**, designed to provide a seamless and user-friendly shopping experience. It integrates **Shadcn UI components** for a modern and responsive design and **Stripe** for secure payment processing. The application supports **user authentication**, **role-based access**, and **e-commerce functionalities** like product browsing, cart management, and order placement.

---

## 🚀 Features

### 1. **User Registration & Authentication**

- **Secure Registration**: Users can register with their name, email, and password.
- **Role-Based Access**: Default role is `user`, but admins can be manually assigned.
- **JWT Authentication**: Secure login with JSON Web Tokens (JWT).
- **Logout**: Clear JWT from local storage upon logout.

### 2. **Public Routes**

- **Home Page**:
  - **Navbar**: Includes a logo, navigation items, and login/signup buttons.
  - **Banner**: Highlights special offers or platform features.
  - **Featured Products**: Displays up to 6 products with a "View All" button.
  - **Testimonials**: Showcases customer feedback.
  - **Footer**: Contains essential links, social media icons, and contact details.
- **All Products Page**:
  - **Search Functionality**: Search products by name, brand, or category.
  - **Filters**: Filter products by price range, category, and availability.
  - **Product Cards**: Display product details like name, price, and category.
- **Product Details Page**:
  - **Product Information**: Displays detailed product information and images.
  - **Add to Cart**: Allows users to add products to their cart.
- **About Page**:
  - **Shop Information**: Provides details about the shop and its mission.

### 3. **Private Routes**

- **Cart Page**:
  - **Order Placement**: Users can place orders for products in their cart.
  - **Stock Validation**: Ensures ordered quantities do not exceed available stock.
  - **Payment Integration**: Secure payment processing via **Stripe**.
- **Dashboard**:
  - **Admin Dashboard**:
    - **User Management**: Block or unblock users.
    - **Product Management**: Create, update, and delete products.
    - **Order Management**: Approve orders and update order status.
  - **User Dashboard**:
    - **Order History**: View past orders.
    - **Profile Management**: Update user profile and settings.

### 4. **UI/UX Design**

- **Responsive Design**: Works seamlessly on all screen sizes.
- **Error Handling**: Displays user-friendly error messages for invalid inputs or failed operations.
- **Loading States**: Shows spinners or loaders during API calls.
- **Toasts**: Notifies users of important actions (e.g., "Login successful", "Order placed").

---

## 🛠️ Technologies Used

- **Frontend Framework**: [React](https://reactjs.org/)
- **UI Library**: [Shadcn UI](https://ui.shadcn.com/)
- **State Management**: [React Context API](https://reactjs.org/docs/context.html)
- **Routing**: [React Router](https://reactrouter.com/)
- **Payment Processing**: [Stripe](https://stripe.com/)
- **API Integration**: [Axios](https://axios-http.com/)
- **Environment Management**: [dotenv](https://www.npmjs.com/package/dotenv)
- **Toast Notifications**: [Sonner](https://www.npmjs.com/package/sonner)

---

## 📂 Project Structure

plaintext

Copy

snoke-stationery-frontend/
├── public/ # Static assets (e.g., images, favicon)
├── src/
│ ├── assets/ # Images, icons, and other static files
│ ├── components/ # Reusable UI components (e.g., Navbar, Footer)
│ ├── contexts/ # React Context for state management
│ ├── hooks/ # Custom React hooks
│ ├── pages/ # Application pages (e.g., Home, Cart, Dashboard)
│ ├── services/ # API service functions
│ ├── styles/ # Global styles and CSS files
│ ├── utils/ # Utility functions (e.g., token handling)
│ ├── App.tsx # Main application component
│ ├── main.tsx # Entry point for the application
├── .env.example # Environment variables template
├── .gitignore # Files and directories to ignore in Git
├── package.json # Project dependencies and scripts
├── tsconfig.json # TypeScript configuration
└── README.md # Project documentation

---

## 📋 Pages Overview

### **Home Page**

- **Navbar**: Includes logo, navigation links, and login/signup buttons.
- **Banner**: Displays a hero section with special offers.
- **Featured Products**: Shows up to 6 products with a "View All" button.
- **Testimonials**: Displays customer feedback.
- **Footer**: Contains links, social media icons, and contact details.

### **All Products Page**

- **Search Bar**: Allows users to search products by name, brand, or category.
- **Filters**: Filter products by price range, category, and availability.
- **Product Cards**: Display product details like name, price, and category.

### **Product Details Page**

- **Product Information**: Displays detailed product information and images.
- **Add to Cart**: Allows users to add products to their cart.

### **Cart Page**

- **Order Summary**: Displays products in the cart with their quantities and prices.
- **Payment Integration**: Secure payment processing via **Stripe**.

### **Dashboard**

- **Admin Dashboard**:
  - **User Management**: Block or unblock users.
  - **Product Management**: Create, update, and delete products.
  - **Order Management**: Approve orders and update order status.
- **User Dashboard**:
  - **Order History**: View past orders.
  - **Profile Management**: Update user profile and settings.

---

## 🛑 Prerequisites

- **Node.js** (v16+)
- **npm** (or yarn)
- **Stripe Account**: For payment processing.

---

## 🔧 Setup

1. **Clone the repository**:

   bash

   Copy

   git clone https://github.com/snokeOver/stationary-shop-frontend-full-stack
   cd snoke-stationery-frontend

2. **Install dependencies**:

   bash

   Copy

   npm install

3. **Set up environment variables**:

   Create a `.env` file in the root directory and add the following environment variables:

   plaintext

   Copy

   VITE_API_BASE_URL=http://localhost:3500 # Backend API base URL
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key # Stripe public key for payment processing

4. **Start the application**:

   bash

   Copy

   npm run dev

5. **Open the application** in your browser:

   bash

   Copy

   http://localhost:5173

---

## 🖥️ Deployment

- **Deployed Link**: [Live Demo](https://snoke-stationary-front.vercel.app/)
- **GitHub Repository**: [Snoke Stationery Frontend](https://github.com/snokeOver/stationary-shop-frontend-full-stack)

---

## 🎥 Video Walkthrough

Watch the frontend walkthrough: [Video Explanation](https://drive.google.com/file/d/1bPaPIERabhza6jswb9MH-cmbQB2Nj2sW/view?usp=drive_link)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the **Issues** page or submit a pull request.

---

## 👨‍💻 Author

**Shubhankar Halder**

###### MERN, TypeScript, Next.js, Node.js, MongoDB | Crafting user-friendly, secure, scalable Web Apps | Passionate about Software Engineering

- **GitHub**: [@snokeOver](https://github.com/snokeOver)
- **LinkedIn**: [Shubhankar Halder](https://www.linkedin.com/in/shubhankar-halder/)
