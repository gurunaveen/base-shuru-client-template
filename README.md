# Interview Boilerplate - React + Vite

## Quick Start
```bash
npm run dev
```

## Project Structure
```
src/
├── components/     # Reusable UI components
│   └── Layout.jsx
├── pages/          # Page components (routes)
│   ├── Home.jsx
│   ├── Page1.jsx
│   └── Page2.jsx
├── services/       # API calls and external services
│   └── api.js
└── utils/          # Helper functions
```

## Features Included
- ✅ React Router (3 pages ready)
- ✅ API service utility
- ✅ Basic layout component
- ✅ Clean minimal styling

## Quick Tips

### Adding a new page:
1. Create file in `src/pages/NewPage.jsx`
2. Add route in `App.jsx`: `<Route path="/new" element={<NewPage />} />`

### Making API calls:
```javascript
import { api } from '../services/api';

// GET request
const data = await api.get('/endpoint');

// POST request
const result = await api.post('/endpoint', { key: 'value' });
```

### Common patterns:
- Use `useState` for component state
- Use `useEffect` for data fetching
- Use `Link` from react-router-dom for navigation

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
