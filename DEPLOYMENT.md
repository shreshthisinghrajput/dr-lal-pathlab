# LAL PATH CLINIC - Deployment Guide

## Prerequisites

- Node.js 18+ installed
- MongoDB database (local or MongoDB Atlas)
- Vercel account (for deployment)

## Local Development Setup

### 1. Install Dependencies

```bash
cd DrLalPathlab
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and update values:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lalpathclinic

# JWT Secrets (generate random strings)
JWT_ACCESS_SECRET=your-super-secret-access-token-key-min-32-chars
JWT_REFRESH_SECRET=your-super-secret-refresh-token-key-min-32-chars

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Seed Database (Optional)

To create admin user and sample tests:

```bash
npm run seed
```

**Default Admin Credentials:**
- Email: `admin@lalpathclinic.com`
- Password: `admin1234`

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## Vercel Deployment

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables:
   - `MONGODB_URI`
   - `JWT_ACCESS_SECRET`
   - `JWT_REFRESH_SECRET`
   - `NEXT_PUBLIC_APP_URL` (your Vercel domain)
5. Click "Deploy"

### 3. Seed Production Database

After first deployment, run seed script locally with production MongoDB URI:

```bash
MONGODB_URI=<production-uri> node scripts/seed.js
```

---

## Configuration Reference

### MongoDB Atlas Setup

1. Create account at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a free cluster
3. Create database user with password
4. Whitelist IP addresses (0.0.0.0/0 for Vercel)
5. Get connection string from "Connect" → "Connect your application"

### Replacing Placeholder Images

Test images can be replaced by:
1. Updating `imageURL` field in Test documents via Admin Panel
2. Use any public image URL (recommended: Cloudinary, AWS S3, Vercel Blob)

---

## Features Summary

| Feature | Route | Access |
|---------|-------|--------|
| Home Page | `/` | Public |
| All Tests | `/tests` | Public |
| Test Details | `/tests/[id]` | Public |
| About Us | `/about` | Public |
| Contact | `/contact` | Public |
| Login | `/login` | Public |
| Register | `/register` | Public |
| Patient Dashboard | `/patient` | Patient |
| Browse Tests | `/patient/tests` | Patient |
| Book Test | `/patient/book` | Patient |
| My Bookings | `/patient/bookings` | Patient |
| Admin Dashboard | `/admin` | Admin |
| Manage Tests | `/admin/tests` | Admin |
| Manage Bookings | `/admin/bookings` | Admin |
| View Patients | `/admin/patients` | Admin |

---

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TailwindCSS
- **Backend**: Next.js API Routes, MongoDB, Mongoose
- **Auth**: JWT (httpOnly cookies), bcrypt
- **Validation**: Zod
- **Deployment**: Vercel

---

## Support

For issues or questions, contact: `support@lalpathclinic.com`
