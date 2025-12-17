# Integrated Music Course Platform

An online platform for interactive music education, providing a seamless experience for students, instructors, and administrators. This project is a full-stack application featuring a React frontend with Vite and a Node.js/Express backend, optimized for deployment on Vercel.

The original design concept can be found on [Figma](https://www.figma.com/design/00ohNXypXfuPLzDSmUCQGG/Integrated-Music-Course-Platform).

## ✨ Features

- **Role-Based Dashboards:** Separate, tailored dashboards for Administrators, Instructors, and Members.
- **Course Management:** Browse, view details, and manage course content.
- **E-commerce Functionality:** A shop to purchase music-related products, complete with a shopping cart and checkout process.
- **User Authentication:** Secure user registration and login system with password hashing.
- **Responsive Design:** A modern and responsive user interface built with Shadcn/UI and Tailwind CSS.

## 🚀 Fitur dan Deployment Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fintegrated-music-course-platform)

Proyek ini dirancang untuk memanfaatkan kemampuan deployment Vercel yang efisien, termasuk dukungan serverless untuk backend Node.js/Express.

### Pengaturan Build

When importing the project to Vercel, use the following settings:

- **Framework Preset:** `Vite`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

The `vercel.json` file in the root directory is configured to route all API requests from `/api` to the Express server running as a serverless function.

### ❗️ Important Note on Database

This project uses **SQLite** as its database, which is stored in the `server/database.sqlite` file. The file systems of Vercel's serverless functions are **ephemeral**, meaning the database will be **reset** with every deployment and may not persist between requests.

**For a production environment on Vercel, you must migrate to a serverless database solution, such as:**

- [Vercel Postgres](https://vercel.com/storage/postgres)
- [Neon](https://neon.tech/)
- [PlanetScale](https://planetscale.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas)

## 🛠️ Technologies Used

- **Frontend:**
  - [React](https://reactjs.org/)
  - [Vite](https://vitejs.dev/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [React Router](https://reactrouter.com/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Shadcn/UI](https://ui.shadcn.com/)

- **Backend:**
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
  - [SQLite3](https://www.sqlite.org/index.html) (**Development Only**)
  - [JWT](https://jwt.io/) for authentication
  - [bcryptjs](https://www.npmjs.com/package/bcryptjs) for password hashing

## 🚀 Getting Started (Local Development)

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/en/download/) (v18.x or later recommended)
- [npm](https://www.npmjs.com/get-npm)

### Installation

1. Clone the repository to your local machine (replace `your-username` if you forked it):
   ```sh
   git clone https://github.com/your-username/integrated-music-course-platform.git
   cd integrated-music-course-platform/Integrated%20Music%20Course%20Platform
   ```

2. Install the required dependencies:
   ```sh
   npm install
   ```

### Running the Application

To start both the frontend and backend servers for local development, run:

```sh
npm run dev
```

The application will be available at `http://localhost:5173`, and the server will be running on `http://localhost:3000`.

## 📜 Available Scripts

- `npm run dev`: Starts both the backend server and the frontend Vite dev server for local development.
- `npm run server`: Starts only the backend server using `nodemon`.
- `npm run build`: Builds the frontend application for production.


