# Backend Integration & Admin Dashboard Plan

We will build a complete backend using **Prisma ORM** and **Next.js API Routes**. 

To accommodate your plan to host on Vercel, we will use **SQLite** for local development. SQLite stores the database in a local file, meaning everything will work immediately on your computer without extra setup. When you deploy to Vercel, you can easily swap this to **Vercel Postgres** with zero code changes (just by updating the database URL in your Vercel settings).

## User Review Required & Open Questions

> [!WARNING]
> **Registration Number Format:** You mentioned "first two letters and numbers and next three alphabets" (e.g., `21BCE`). Standard VIT registration numbers usually have 4 digits at the end (e.g., `21BCE1234`). Should I strictly enforce exactly 5 characters, or should I enforce the prefix format and allow the trailing digits?

> [!WARNING]
> **Password Visibility:** You asked to display user passwords in the Admin panel. I will store them in a way that allows the admin to read them for your event's convenience, but please note this is generally an insecure practice for production apps outside of college hackathons!

## Proposed Changes

### 1. Database Schema (`prisma/schema.prisma`)
- **[NEW] User:** `regNo` (unique, uppercase), `name`, `password`, `teamId`, `isLeader`
- **[NEW] Team:** `name`, `code` (unique), `isConfirmed`, `domain`, `statementId`, `isLocked`
- **[NEW] Admin:** `username`, `password`, `isMain` (boolean to separate main admin from sub-admins)
- **[NEW] Announcement:** `message`, `createdAt`
- **[NEW] AuditLog:** `adminUser`, `action`, `createdAt` (Only visible to main admin)

### 2. API Routes (`src/app/api/...`)
- **[NEW] `/api/auth/register` & `/api/auth/login`**: Handle user registration and login.
- **[NEW] `/api/teams/*`**: Create team, join team, confirm team.
- **[NEW] `/api/admin/*`**: Endpoints protected by admin sessions to fetch users, manage teams, assign problem statements, and add sub-admins.

### 3. Frontend Updates
- **[MODIFY] `src/app/register/page.tsx`**: Hook up the 3D flip card to actual database endpoints. Add RegNo validation (auto-uppercase).
- **[MODIFY] `src/app/dashboard/page.tsx`**: 
  - Switch from `localStorage` to fetching team data from the database.
  - Add a **"Confirm Team"** button for the Team Leader (only allowed when size is 2-4).
  - Hide the "Bidding" section and display the locked problem statement if the Admin has assigned one.
- **[NEW] `src/app/admin/page.tsx`**: 
  - Login screen for Admins.
  - Dashboard with tabs: **Participants**, **Teams**, **Announcements**, **Sub-Admins**, and **Logs** (Main Admin only).

### 4. Announcements
- **[MODIFY] `src/app/announcements/page.tsx`**: Fetch live announcements from the database instead of hardcoded placeholders.

## Verification Plan

1. Install Prisma and initialize the SQLite database.
2. Seed the database with the default `placeitadmin` / `place5.0` main admin.
3. Test user registration, team creation, and the team confirmation flow.
4. Log into `/admin`, verify all features work (assigning blueprints, viewing logs, adding announcements).
