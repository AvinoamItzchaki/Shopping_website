# Shopping Website

A full-featured e-commerce web application built with React and Firebase. Users can browse products, add items to a cart, manage purchases, view statistics, and leave feedback. Includes an administrator panel for managing the store.

## Features

- **User Authentication** — Login and registration with custom user management
- **Product Catalog** — Browse products with category and price filters
- **Shopping Cart** — Add, remove, and manage items before checkout
- **Purchase History** — Track past purchases and expenses
- **Statistics** — View spending analytics and expense breakdowns
- **Product Feedback** — Leave and view feedback on products
- **Administrator Panel** — Manage products and store data (admin-only)
- **Responsive Design** — Built with Tailwind CSS and React Bootstrap

## Tech Stack

- **React 19** — UI framework
- **React Router** — Client-side routing
- **Firebase / Firestore** — Backend database and analytics
- **Tailwind CSS** — Utility-first styling
- **React Bootstrap** — UI components

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- A [Firebase](https://firebase.google.com/) project with Firestore enabled

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Shopping_website.git
   cd Shopping_website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a project in the [Firebase Console](https://console.firebase.google.com)
   - Enable Firestore Database
   - Go to Project Settings → General → Your apps → Add web app
   - Copy the Firebase config values

4. **Create environment variables**
   - Create a `.env` file in the project root
   - Add your Firebase credentials:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

5. **Configure Firestore rules** — In Firebase Console → Firestore Database → Rules, configure rules to allow your app to read/write (or use Firebase Authentication for production).

## Usage

### Development

```bash
npm start
```

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Build for Production

```bash
npm run build
```

Creates an optimized production build in the `build` folder.

### Run Tests

```bash
npm test
```

Launches the test runner in interactive watch mode.

## Project Structure

```
src/
├── components/
│   ├── AuthContext.js          # Authentication state
│   ├── HandleDB.js             # Firebase/Firestore operations
│   ├── ShoppingList.js         # Product catalog
│   ├── CartPage.js             # Shopping cart
│   ├── LoginForm.js            # User login
│   ├── RegistrationForm.js     # User registration
│   ├── Statistics.js           # Spending analytics
│   ├── AdministratorExtension.js # Admin panel
│   ├── Feedbacks.js            # Product feedback
│   └── ...
├── App.js                      # Main app and routing
└── index.js                    # Entry point
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Login page |
| `/shop` | Product catalog |
| `/cart` | Shopping cart |
| `/about` | About page |
| `/statistics` | Spending statistics |
| `/feedbacks` | Product feedbacks |
| `/administrator` | Admin panel (admin only) |

## License

This project is private. All rights reserved.
