# Lost Checks Affidavit - Frontend Mock App

A fully functional React + Vite + TypeScript application that simulates the Lost Checks Affidavit workflow. This is a **demo-ready mock** application with no backend dependencies.

## 🚀 Quick Start

### Prerequisites
- Node.js 22.x
- npm

### Installation

```bash
# Load nvm and use Node 22
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 22

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173` (or the port Vite assigns).

## 📁 Project Structure

```
src/
  api/              # Mock API hooks (TanStack React Query)
  components/       # Reusable components
  pages/            # Page components
  hooks/            # Custom React hooks (if needed)
  styles/           # Additional styles
  main.tsx          # App entry point with routing
  index.css         # Global styles
```

## 🎯 Features

### Pages

1. **Landing Page (`/`)** - Welcome page with link to services
2. **Services List (`/services`)** - Display available services
3. **New Affidavit Form (`/affidavit/new`)** - Complete form for creating affidavits
4. **Requests Dashboard (`/requests`)** - View drafts, submitted, and completed requests

### Components

- `Header` - Navigation bar
- `Layout` - Page wrapper with consistent styling
- `ServiceCard` - Service display card
- `CheckForm` - Reusable check input form
- `SuccessModal` - Submission success modal

### Mock API

All API calls are mocked using TanStack React Query with simulated delays:
- `useServicesQuery` - Fetch available services
- `useSaveDraft` - Save draft affidavit
- `useSubmitAffidavit` - Submit affidavit request
- `useDraftsQuery` - Fetch draft requests
- `useSubmittedQuery` - Fetch submitted requests
- `useCompletedQuery` - Fetch completed requests

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **React Bootstrap** - UI components
- **TanStack React Query** - Data fetching and state management

## 📝 Notes

- No authentication required
- No backend connection
- All data is mocked
- Perfect for demos and stakeholder presentations
- Ready to be integrated with Django backend later

## 🎨 Styling

The app uses React Bootstrap for consistent, responsive styling. All components are mobile-friendly and follow Bootstrap's grid system.
