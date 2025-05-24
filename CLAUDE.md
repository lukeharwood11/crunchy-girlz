# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

This is a full-stack web application with a clear separation between frontend and backend:

- **Frontend (`/client/`)**: TypeScript/Vite application that builds to `/dist/`
- **Backend (`/api/`)**: FastAPI Python application with uv dependency management  
- **Database (`/db/`)**: SQL initialization scripts and migrations
- **Configuration**: All config files (package.json, pyproject.toml, vite.config.ts, tsconfig.json) are in the root directory

The Vite configuration is set up to use `/client/` as the root directory while keeping all config files at the project root level.

## Development Commands

### Frontend
- `npm run dev` - Start Vite development server
- `npm run build` - Build TypeScript and bundle with Vite
- `npm run preview` - Preview production build

### Backend  
- `uv run dev-api` - Start FastAPI development server with hot reload on port 8000
- `uv sync` - Sync Python dependencies

### Setup
- `npm install` - Install frontend dependencies
- `uv sync` - Install Python dependencies (requires Python 3.12+)

## Key Configuration

- **Vite**: Configured with `root: 'client'` and `publicDir: 'public'` for static assets
- **TypeScript**: Strict mode enabled, targets ES2020, includes only `/client/` directory
- **Python**: Uses uv for dependency management with FastAPI and uvicorn[standard]
- **Static Assets**: Place in `/client/public/` and reference with absolute paths (e.g., `/logo.png`)

## Project Structure

```
├── client/           # Frontend TypeScript/Vite app
│   ├── public/       # Static assets (images, etc.)
│   └── src/          # TypeScript source code
├── api/              # FastAPI backend
├── db/               # Database scripts and migrations
├── package.json      # Frontend dependencies
├── pyproject.toml    # Backend dependencies  
├── vite.config.ts    # Vite configuration
└── tsconfig.json     # TypeScript configuration
```