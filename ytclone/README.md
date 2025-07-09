# YouTube Clone Web Application

A full-stack YouTube clone built with React (TypeScript) frontend and Django (PostgreSQL) backend.

## 🚀 Features Implemented

### Backend (Django + PostgreSQL)
- ✅ User authentication (register, login, logout) with token-based auth
- ✅ Video upload with title, description, and thumbnail
- ✅ Video listing and viewing with metadata
- ✅ Like and unlike videos functionality
- ✅ Comment system with threaded replies
- ✅ Subscribe/unsubscribe to channels
- ✅ Watch later functionality
- ✅ Playlist creation and management
- ✅ Search functionality
- ✅ User profiles with avatar and bio
- ✅ View count tracking
- ✅ Admin interface for content management
- ✅ REST API with proper serialization
- ✅ Media file handling for uploads

### Frontend (React + TypeScript + Tailwind CSS)
- ✅ Modern UI with YouTube-like design
- ✅ Responsive navigation with header and sidebar
- ✅ User authentication pages (login/register)
- ✅ Home page with video grid layout
- ✅ Video cards with thumbnails, metadata, and formatting
- ✅ Authentication context for state management
- ✅ Protected routes and user session handling
- ✅ Search functionality in header
- ✅ Collapsible sidebar navigation
- ✅ Error handling and loading states
- ✅ TypeScript interfaces for type safety

## 🛠️ Technology Stack

### Backend
- **Django 5.2.4** - Web framework
- **Django REST Framework** - API development
- **PostgreSQL** - Database
- **psycopg2** - PostgreSQL adapter
- **Pillow** - Image processing
- **Django CORS Headers** - Cross-origin requests

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icon library

## 📁 Project Structure

```
ytclone/
├── backend/                 # Django backend
│   ├── backend/            # Django project settings
│   │   ├── settings.py     # Configuration
│   │   ├── urls.py         # Main URL routing
│   │   └── ...
│   ├── videos/             # Main Django app
│   │   ├── models.py       # Database models
│   │   ├── views.py        # API views
│   │   ├── serializers.py  # Data serialization
│   │   ├── urls.py         # App URL routing
│   │   ├── admin.py        # Admin interface
│   │   └── migrations/     # Database migrations
│   ├── media/              # User uploaded files
│   ├── venv/               # Python virtual environment
│   └── manage.py           # Django management script
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── Header.tsx  # Navigation header
│   │   │   ├── Sidebar.tsx # Navigation sidebar
│   │   │   ├── Layout.tsx  # Main layout wrapper
│   │   │   └── VideoCard.tsx # Video display card
│   │   ├── pages/          # Page components
│   │   │   ├── Home.tsx    # Home page with video grid
│   │   │   ├── Login.tsx   # Login form
│   │   │   └── Register.tsx # Registration form
│   │   ├── contexts/       # React contexts
│   │   │   └── AuthContext.tsx # Authentication state
│   │   ├── api/            # API configuration
│   │   │   └── api.ts      # Axios setup and interceptors
│   │   ├── types/          # TypeScript type definitions
│   │   │   └── index.ts    # Interface definitions
│   │   ├── App.tsx         # Main app component with routing
│   │   └── main.tsx        # App entry point
│   ├── package.json        # Node.js dependencies
│   └── tailwind.config.js  # Tailwind CSS configuration
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL
- Git

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd ytclone/backend
   ```

2. **Activate virtual environment:**
   ```bash
   source venv/bin/activate
   ```

3. **Install dependencies** (if not already installed):
   ```bash
   pip install django djangorestframework django-cors-headers psycopg2-binary pillow
   ```

4. **Start PostgreSQL service:**
   ```bash
   sudo service postgresql start
   ```

5. **Set up database** (if not already done):
   ```bash
   sudo -u postgres createdb ytclone_db
   sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"
   ```

6. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

7. **Create superuser** (if not already done):
   ```bash
   python manage.py createsuperuser
   ```

8. **Start Django server:**
   ```bash
   python manage.py runserver 0.0.0.0:8000
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd ytclone/frontend
   ```

2. **Install dependencies** (if not already installed):
   ```bash
   npm install
   ```

3. **Start React development server:**
   ```bash
   npm run dev
   ```

## 🌐 Application URLs

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000/api/
- **Django Admin:** http://localhost:8000/admin/

### Default Admin Credentials
- **Username:** admin
- **Password:** admin

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout

### Videos
- `GET /api/videos/` - List all videos
- `POST /api/videos/` - Upload new video
- `GET /api/videos/{id}/` - Get video details
- `POST /api/videos/{id}/like/` - Like/unlike video
- `POST /api/videos/{id}/increment_views/` - Increment view count
- `POST /api/videos/{id}/watch_later/` - Add/remove from watch later

### Comments
- `GET /api/comments/?video={video_id}` - Get video comments
- `POST /api/comments/` - Create comment

### Search
- `GET /api/search/?q={query}` - Search videos

### User Management
- `GET /api/users/{id}/` - Get user profile
- `GET /api/users/{id}/videos/` - Get user's videos
- `POST /api/users/{id}/subscribe/` - Subscribe to user

## 🎯 Features To Implement Next

1. **Video Player Page** - Full video viewing experience with comments
2. **Video Upload Page** - Form for uploading videos with file handling
3. **Search Results Page** - Display search results with filtering
4. **Channel/Profile Pages** - User profile and channel management
5. **Dashboard Page** - User's video management interface
6. **Watch Later Page** - Saved videos list
7. **Playlists Management** - Create and manage playlists
8. **Video Recommendations** - Related videos and suggestions
9. **Real-time Notifications** - WebSocket integration
10. **Video Processing** - Thumbnail generation and video optimization

## 🔧 Development Notes

### Database Models
- **Video:** Core video entity with metadata
- **User:** Extended Django user model
- **UserProfile:** Additional user information
- **Like:** Video likes tracking
- **Comment:** Threaded comment system
- **Subscription:** User subscription relationships
- **WatchLater:** Saved videos for later viewing
- **Playlist/PlaylistVideo:** Playlist management

### Authentication
- Token-based authentication using Django REST Framework
- Automatic token management in React frontend
- Protected routes and API endpoints
- Session persistence with localStorage

### File Handling
- Media files served through Django in development
- Separate upload paths for videos and thumbnails
- File validation and security measures

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error:**
   - Ensure PostgreSQL is running: `sudo service postgresql start`
   - Check database credentials in `settings.py`

2. **CORS Errors:**
   - Verify CORS settings in Django `settings.py`
   - Check if frontend URL is in `CORS_ALLOWED_ORIGINS`

3. **Authentication Issues:**
   - Clear browser localStorage and cookies
   - Check token validity and API endpoints

4. **File Upload Issues:**
   - Ensure media directory has proper permissions
   - Check `MEDIA_ROOT` and `MEDIA_URL` settings

## 📄 License

This project is created for educational purposes as a YouTube clone demonstration.

## 🤝 Contributing

This is a learning project. Feel free to fork and experiment with additional features!