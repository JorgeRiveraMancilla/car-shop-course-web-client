# Car Shop Course - Frontend (Next.js)

Frontend web application built with Next.js, NextAuth.js, and Tailwind CSS for the Car Shop Course microservices project.

## 📚 Course Credits

This project is based on the excellent course by **Neil Cummings**:
**[Build a microservices app with .Net and NextJS from scratch](https://www.udemy.com/course/build-a-microservices-app-with-dotnet-and-nextjs-from-scratch)**

## 🚀 Tech Stack

- **Next.js 15.3.3** - React framework with App Router
- **NextAuth.js 5.0** - Authentication library with Duende Identity Server 6 provider
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type safety
- **React Hook Form + Zod** - Form validation
- **Axios** - HTTP client
- **Zustand** - State management

## 💻 Prerequisites

Before starting, make sure you have the following software installed:

- **Node.js 18+** - [Download from nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download from git-scm.com](https://git-scm.com/)
- **VS Code** - [Download from code.visualstudio.com](https://code.visualstudio.com/)

**Backend Requirements:**

- Backend microservices must be running (see Backend README)

## ⚙️ Setup & Installation

### 1. Clone Repository and Navigate

```bash
git clone <repository-url>
cd car-shop-course-web-client
```

### 2. Install Dependencies

```bash
npm install
```

## 🔧 Environment Configuration

The project includes pre-configured authentication and API routing:

- **NextAuth.js** configured with Duende Identity Server 6 provider
- **API Routes** automatically redirect to Gateway Service (port 6001)
- **Authentication Routes** handled by NextAuth (port 5001)

### Environment Variables

Ensure your `.env.local` file contains:

```bash
AUTH_SECRET="your-generated-secret-here"
ID_SERVER_ISSUER="http://localhost:5001"
NEXTAUTH_URL="http://localhost:3000"
```

**Note:** The `AUTH_SECRET` should already be generated. If you need to regenerate it, run:

```bash
npx auth secret
```

## 🚦 Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```
