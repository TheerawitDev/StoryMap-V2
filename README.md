# Story Map

An interactive web application for exploring and tracking filming locations of popular Thai series. Discover where your favorite scenes were shot, track locations you've visited, and contribute to the growing map of series locations.

## Features

- **Interactive Map**: Visualize series locations on a dynamic map powered by Leaflet.
- **Series Explorer**: Browse a collection of Thai series and their specific filming locations.
- **Location Details**: View detailed information, scene descriptions, and photos for each location.
- **User Accounts**: Secure authentication using Google Login (via NextAuth.js).
- **Visit Tracking**: Mark locations as "Visited" to keep a travel log of your series pilgrimage.
- **Reviews**: Share your experiences by leaving ratings and comments on locations.
- **Community Contributions**: Submit new series and locations with image uploads.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Shadcn/UI](https://ui.shadcn.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via [Prisma ORM](https://www.prisma.io/))
- **Authentication**: [NextAuth.js v5](https://authjs.dev/)
- **Maps**: [React Leaflet](https://react-leaflet.js.org/) & [Leaflet](https://leafletjs.com/)
- **Storage**: [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)
- **Deployment**: [Vercel](https://vercel.com)

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- A PostgreSQL database (local or cloud-hosted like Vercel Postgres or Supabase)

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd story-map_v3
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   # Database Connection
   POSTGRES_URL="postgresql://user:password@host:port/database?schema=public"

   # NextAuth.js Configuration
   AUTH_SECRET="your-generated-secret" # Run `npx auth secret` to generate
   
   # Google OAuth Provider
   AUTH_GOOGLE_ID="your-google-client-id"
   AUTH_GOOGLE_SECRET="your-google-client-secret"

   # Vercel Blob Storage
   BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"
   ```

4. **Setup Database:**

   Generate the Prisma client and push the schema to your database:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

   (Optional) Seed the database with initial series data:

   ```bash
   npx prisma db seed
   ```

5. **Run the Development Server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code issues.
- `postinstall`: Automatically generates Prisma Client after installation.

## Project Structure

- `app/`: Next.js App Router pages and API routes.
- `components/`: Reusable UI components.
- `prisma/`: Database schema and seed scripts.
- `store/`: Zustand state management stores.
- `lib/`: Utility functions and shared logic.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
