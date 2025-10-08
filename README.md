# AI Creator Platform

A modern content creation platform built with Next.js 15, featuring AI-powered tools for creators.

## Tech Stack

- **Framework**: Next.js 15.5.4 with Turbopack
- **UI**: React 19, Tailwind CSS 4, Radix UI components
- **Authentication**: Clerk
- **Backend**: Convex (real-time database)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Theme**: next-themes for dark/light mode
- **Icons**: Lucide React
- **Notifications**: Sonner

## Features

-  **Authentication** - Secure user authentication with Clerk
-  **Modern UI** - Beautiful, accessible components with Radix UI
-  **Theme Support** - Light/dark mode toggle
-  **Real-time Data** - Powered by Convex backend
-  **Performance** - Built with Next.js 15 and Turbopack

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd AI-Creator-Platform
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env.local` file with:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
CONVEX_DEPLOYMENT=your_convex_deployment
NEXT_PUBLIC_CONVEX_URL=your_convex_url
```

4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── (auth)/       # Authentication routes
│   │   └── page.tsx      # Home page
│   ├── components/       # Reusable UI components
│   │   └── ui/          # shadcn/ui components
│   └── lib/             # Utility functions
├── convex/              # Convex backend
│   ├── schema.js        # Database schema
│   └── auth.config.ts   # Auth configuration
└── public/              # Static assets
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Database Schema

The platform uses Convex with the following schema:

- **users** - User profiles with authentication tokens

## Authentication

Authentication is handled by Clerk with the following routes:
- `/sign-in` - User login
- `/sign-up` - User registration

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Convex Documentation](https://docs.convex.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a pull request

## License

This project is private and not licensed for public use.

## Support

For issues or questions, please open an issue in the repository.
