# Stock AI Frontend

A modern React-based frontend for the Stock AI Analysis System. Built with React, Tailwind CSS, and Lucide React icons.

## Features

- **Modern UI/UX**: Clean, professional interface with smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Real-time Updates**: Live system status and database monitoring
- **Interactive Components**: Rich query interface with AI suggestions
- **Data Visualization**: Analytics dashboard with charts and metrics
- **Toast Notifications**: User-friendly feedback and error handling

## Tech Stack

- **React 18**: Modern React with hooks and functional components
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful, customizable icons
- **Axios**: HTTP client for API communication
- **React Hot Toast**: Toast notifications
- **Recharts**: Data visualization (ready for future use)

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Backend server running on localhost:8000

### Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## Project Structure

```
frontend/
├── public/
│   └── index.html          # Main HTML file
├── src/
│   ├── components/         # React components
│   │   ├── Layout.js      # Main layout with navigation
│   │   ├── Dashboard.js   # Dashboard overview
│   │   ├── QueryInterface.js # AI query interface
│   │   ├── DatabaseStatus.js # Database monitoring
│   │   ├── Suggestions.js # AI suggestions
│   │   └── Analytics.js   # Analytics dashboard
│   ├── services/
│   │   └── api.js         # API service layer
│   ├── App.js             # Main app component
│   ├── index.js           # React entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies and scripts
├── tailwind.config.js    # Tailwind configuration
└── postcss.config.js     # PostCSS configuration
```

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Components

### Layout
- Responsive sidebar navigation
- Mobile-friendly design
- System status indicator

### Dashboard
- System health overview
- Quick action cards
- Feature highlights

### Query Interface
- Natural language input
- Real-time results display
- SQL query preview
- Example questions sidebar

### Database Status
- Connection monitoring
- Table structure display
- Schema information

### Suggestions
- AI-generated questions
- Category classification
- One-click usage

### Analytics
- Performance metrics
- Query statistics
- System monitoring

## API Integration

The frontend communicates with the backend via REST API:

- **Health Check**: `/health`
- **Database Status**: `/database/status`
- **Process Query**: `POST /query`
- **Get Suggestions**: `/suggestions`
- **Get Examples**: `/examples`

## Styling

The app uses Tailwind CSS with custom components:

- `.btn-primary` - Primary action buttons
- `.btn-secondary` - Secondary action buttons
- `.card` - Card containers
- `.input-field` - Form inputs
- `.loading-spinner` - Loading animation

## Development

### Adding New Components

1. Create component in `src/components/`
2. Add route in `App.js`
3. Add navigation item in `Layout.js`

### Styling Guidelines

- Use Tailwind utility classes
- Follow the established color scheme
- Maintain responsive design
- Use consistent spacing and typography

### API Integration

- Use the `stockAIApi` service
- Handle loading and error states
- Show user-friendly notifications
- Implement proper error boundaries

## Production Build

```bash
npm run build
```

The build output will be in the `build/` directory, ready for deployment.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Follow the existing code style
2. Add proper error handling
3. Test on multiple screen sizes
4. Ensure accessibility compliance
5. Add appropriate loading states 