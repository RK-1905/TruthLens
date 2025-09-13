# Overview

TruthLens is an AI-powered misinformation detection application that leverages Google Cloud technologies to analyze and fact-check online content. The system provides real-time credibility scoring for news articles, social media posts, and other text-based content through advanced natural language processing and source verification.

Built as a submission for the Google Gen AI Exchange Hackathon 2024, TruthLens combines a React frontend with an Express.js backend to deliver a seamless fact-checking experience. Users can input URLs or text content and receive comprehensive analysis reports including credibility scores, fact-checks, and source verification.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript in a Single Page Application (SPA) architecture
- **Routing**: Wouter for lightweight client-side routing with three main routes: Home, Analyze, and Results
- **UI Components**: Shadcn/ui component library built on Radix UI primitives with Tailwind CSS for styling
- **State Management**: React Query (TanStack Query) for server state management and caching
- **Styling**: Tailwind CSS with custom CSS variables for theming, supporting dark mode with a custom color palette
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **API Design**: RESTful API with two main endpoints: `/api/analyze` for content submission and `/api/analysis/:id` for retrieving results
- **Data Storage**: In-memory storage implementation with an interface-based design allowing easy migration to persistent storage
- **Development Setup**: Custom Vite integration for hot module replacement and development server proxy

## Data Storage Solutions
- **Current Implementation**: MemStorage class providing in-memory data persistence for development and demo purposes
- **Database Schema**: Drizzle ORM with PostgreSQL dialect configured for future database integration
- **Schema Design**: Zod-based type validation with schemas for analysis input, credibility scores, and analysis results

## Authentication and Authorization
- **Session Management**: Connect-pg-simple for PostgreSQL-backed session storage (configured but not actively implemented)
- **User Model**: Basic user schema with username and ID fields defined in shared schema

## External Service Integrations
- **Google Cloud AI**: Natural Language API integration for entity recognition, sentiment analysis, and content understanding
- **Content Processing**: Multi-stage analysis pipeline including content extraction, entity recognition, source verification, and credibility scoring
- **Mock Implementation**: Frontend includes simulated analysis results for demonstration purposes while backend endpoints are prepared for actual Google Cloud API integration

## Key Design Patterns
- **Monorepo Structure**: Organized into client, server, and shared directories for clear separation of concerns
- **Type Safety**: Full TypeScript implementation with shared schemas between frontend and backend
- **Component Architecture**: Modular React components with consistent design patterns and reusable UI elements
- **Progressive Enhancement**: Analysis functionality works with mock data while being designed for real AI integration
- **Responsive Design**: Mobile-first approach with adaptive layouts using Tailwind CSS breakpoints

# External Dependencies

## Core Technologies
- **Google Cloud Platform**: Natural Language API for text analysis and entity extraction
- **Neon Database**: Serverless PostgreSQL database for production data storage
- **Drizzle ORM**: Type-safe database operations with PostgreSQL support

## Frontend Dependencies
- **React Ecosystem**: React 18, React Router (Wouter), React Query for data fetching
- **UI Framework**: Radix UI primitives, Shadcn/ui components, Tailwind CSS for styling
- **Development Tools**: Vite, TypeScript, PostCSS with Autoprefixer

## Backend Dependencies
- **Server Framework**: Express.js with CORS support and JSON parsing middleware
- **Database**: PostgreSQL with Drizzle ORM and connection pooling
- **Session Management**: Express sessions with PostgreSQL storage backend
- **Development**: TSX for TypeScript execution, ESBuild for production builds

## Validation and Utilities
- **Schema Validation**: Zod for runtime type checking and API validation
- **Utility Libraries**: Clsx and class-variance-authority for conditional styling
- **Date Handling**: date-fns for date manipulation and formatting
- **Icons**: Lucide React and React Icons for consistent iconography
