# 🤖 Rooman AI Support Assistant

An intelligent chatbot powered by Google's Gemini AI, designed to provide instant support for Rooman Technologies' courses, certifications, and services.

![Architecture Diagram](https://via.placeholder.com/800x400/6366f1/ffffff?text=Architecture+Diagram)

## 📋 Overview

Rooman AI Support Assistant is a full-stack web application that leverages Google's Gemini 1.5 Flash model to provide intelligent, context-aware responses to student queries. The chatbot is specifically trained to assist with course information, certifications, placement assistance, and general inquiries about Rooman Technologies.

### How It Works (End-to-End Flow)

```
┌─────────────┐
│   User      │
│  (Browser)  │
└──────┬──────┘
       │ 1. User sends message
       ▼
┌─────────────────────┐
│   Frontend (HTML/   │
│   CSS/JavaScript)   │
│                     │
│ • Chat Interface    │
│ • Message Display   │
│ • Input Handling    │
└──────┬──────────────┘
       │ 2. POST /api/chat
       ▼
┌─────────────────────┐
│  Backend (Node.js)  │
│                     │
│ • Express Server    │
│ • Request Handler   │
│ • Session Mgmt      │
└──────┬──────────────┘
       │ 3. Fetch chat history
       ▼
┌─────────────────────┐
│   SQLite Database   │
│  (chat_history.db)  │
│                     │
│ • chats table       │
└──────┬──────────────┘
       │ 4. Returns history
       ▼
┌─────────────────────┐
│  Backend (Node.js)  │
│                     │
│ • Build context     │
│ • Add system prompt │
└──────┬──────────────┘
       │ 5. Send prompt + history
       ▼
┌─────────────────────┐
│   Gemini AI API     │
│  (Google AI Studio) │
│                     │
│ • Model: gemini-    │
│   1.5-flash         │
│ • Processes query   │
└──────┬──────────────┘
       │ 6. Returns AI response
       ▼
┌─────────────────────┐
│  Backend (Node.js)  │
│                     │
│ • Save to DB        │
│ • Return response   │
└──────┬──────────────┘
       │ 7. JSON response
       ▼
┌─────────────────────┐
│   Frontend          │
│                     │
│ • Display message   │
│ • Update UI         │
│ • Show typing       │
└─────────────────────┘
```

## ✨ Features

### Core Features
- 🤖 **AI-Powered Responses** - Leverages Google Gemini 1.5 Flash for intelligent conversations
- 💬 **Real-time Chat Interface** - Smooth, responsive chat experience
- 📱 **Fully Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🎨 **Modern Glassmorphism UI** - Beautiful interface with solid colors and smooth animations
- 💾 **Conversation History** - Stores chat history in MySQL database
- 🔄 **Context-Aware** - Maintains conversation context for better responses
- 📌 **Quick Suggestions** - Smart recommendation chips for common queries
- 📞 **Contact Integration** - Easy access to contact information
- ⚡ **Typing Indicators** - Visual feedback during AI processing
- 🎭 **Message Avatars** - Distinct avatars for bot and user messages

### UI Features
- Animated mesh background with floating particles
- Smooth message animations (slide-in, avatar pop)
- Glassmorphism effects with backdrop blur
- Sparkle welcome animation
- Mobile-optimized header and navigation
- Auto-resizing textarea
- Scroll-to-bottom on new messages

## 🚧 Limitations

### Current Limitations
- **Context Window**: Limited to last 10 messages in conversation history
- **Single User Session**: No multi-user authentication or session management
- **Rate Limiting**: Depends on Gemini API rate limits (15 RPM for free tier)
- **Language Support**: Primarily optimized for English
- **No File Uploads**: Cannot process images or documents
- **Offline Mode**: Requires internet connection for AI responses
- **Database**: Uses SQLite (single file, not suitable for high-concurrency scenarios)

### Known Issues
- Large conversation histories may slow down response time
- Mobile keyboard may cover input area on some devices
- No conversation export/backup feature

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties, animations, glassmorphism
- **Vanilla JavaScript** - DOM manipulation, fetch API
- **Google Fonts** - Inter font family

### Backend
- **Node.js** (v18+) - Runtime environment
- **Express.js** - Web framework
- **SQLite3** - Lightweight embedded database
- **@google/generative-ai** - Gemini AI SDK
- **dotenv** - Environment variable management
- **cors** - Cross-origin resource sharing

### Database
- **SQLite** (v3) - Embedded SQL database for chat history

### AI/API
- **Google Gemini 1.5 Flash** - Large language model
- **Gemini API** - AI inference service

### Development Tools
- **Git** - Version control
- **npm** - Package management

## 📦 Setup & Run Instructions

### Prerequisites
```bash
- Node.js (v18 or higher)
- Gemini API Key (from Google AI Studio)
- Git
```

**Note:** SQLite is included as a dependency and requires no separate installation.

### Step 1: Clone Repository
```bash
git clone https://github.com/iamsandeshk/Rooman-Ai.git
cd Rooman-Ai
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a `.env` file in the root directory:
```env
# Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Server Configuration
PORT=3000
```

**Note:** SQLite database (`chat_history.db`) will be automatically created when you first run the server. No additional database configuration needed!

**Get Gemini API Key:**
1. Visit https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Create new API key
4. Copy and paste into `.env` file

### Step 4: Start the Server
```bash
# Development mode
node server.js

# The server will start on http://localhost:3000
# SQLite database will be automatically created
```

### Step 5: Access the Application
Open your browser and navigate to:
```
http://localhost:3000
```

## 🚀 Deployment Guide

### Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy this full-stack application!

#### Prerequisites
1. Create account on [Vercel.com](https://vercel.com)
2. Install Vercel CLI (optional):
   ```bash
   npm i -g vercel
   ```

#### Method 1: Deploy via Vercel Dashboard (Easiest)
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository: `iamsandeshk/Rooman-Ai`
3. Configure Project:
   - **Framework Preset**: Other
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`
4. Add Environment Variables:
   - Click "Environment Variables"
   - Add: `GEMINI_API_KEY` = `your_gemini_api_key_here`
5. Click **Deploy**
6. Your app will be live at: `https://your-project.vercel.app`

#### Method 2: Deploy via CLI
```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Add environment variable
vercel env add GEMINI_API_KEY
# Paste your API key when prompted

# Redeploy with new environment variable
vercel --prod
```

#### Important Notes for Vercel:
- ✅ **Serverless Functions**: Works perfectly with Node.js backend
- ✅ **Static Files**: Frontend automatically served
- ✅ **SQLite Database**: Persists during session (ephemeral on redeployment)
- ⚠️ **Deprecation Warnings**: You may see npm warnings during deployment (npmlog, rimraf, glob) - these are from sqlite3 dependencies and won't affect functionality
- ⚠️ **Database Limitation**: SQLite resets on each deployment. For persistent storage, consider:
  - **Vercel Postgres** (Recommended for production)
  - **MongoDB Atlas** (Free tier available)
  - **PlanetScale** (MySQL-compatible)

#### Upgrade to Persistent Database (Optional)
For production use with persistent data:

**Option A: Vercel Postgres**
```bash
# Install Vercel Postgres
vercel postgres create

# Update your code to use Vercel Postgres
# Add connection string to environment variables
```

**Option B: MongoDB Atlas**
1. Create free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Get connection string
3. Add to Vercel environment variables: `MONGODB_URI`
4. Update `src/db.js` to use MongoDB

### Alternative: Docker Deployment
```dockerfile
# Create Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

```bash
# Build and run
docker build -t rooman-ai .
docker run -p 3000:3000 --env-file .env rooman-ai
```

## 📈 Potential Improvements

### Short-term Improvements
1. **User Authentication**
   - User login/signup system
   - Session management with JWT
   - Personalized chat history per user

2. **Enhanced UI/UX**
   - Dark mode toggle
   - Message reactions (👍 👎)
   - Copy message functionality
   - Export chat history as PDF
   - Voice input support

3. **Better Context Management**
   - Increase context window to 50+ messages
   - Implement conversation summarization
   - Add conversation branching

4. **Performance Optimization**
   - Implement Redis caching for frequent queries
   - Add response streaming for faster perceived performance
   - Lazy loading for chat history

### Medium-term Improvements
5. **Advanced Features**
   - Multi-language support (Hindi, Tamil, Telugu)
   - File upload support (PDF, images)
   - Course recommendation engine
   - Sentiment analysis
   - Chat analytics dashboard

6. **Admin Panel**
   - Monitor conversations
   - Update system prompts
   - Manage recommendations
   - View usage statistics
   - A/B testing for responses

7. **Integration Enhancements**
   - WhatsApp integration
   - Email notifications
   - Calendar integration for course schedules
   - Payment gateway integration
   - CRM integration

### Long-term Improvements
8. **AI Enhancements**
   - Fine-tune custom model on Rooman-specific data
   - Multi-modal support (image understanding)
   - Voice responses (Text-to-Speech)
   - Proactive suggestions based on user behavior

9. **Scalability**
   - Microservices architecture
   - Load balancing
   - Database sharding
   - CDN for static assets
   - Kubernetes deployment

10. **Enterprise Features**
    - Multi-tenancy support
    - Role-based access control
    - API rate limiting
    - Webhook support
    - Custom branding options

## 📝 API Documentation

### Endpoints

#### POST /api/chat
Send a message and get AI response
```json
// Request
{
  "message": "What courses do you offer?",
  "sessionId": "unique-session-id"
}

// Response
{
  "response": "We offer various courses in...",
  "sessionId": "unique-session-id"
}
```

#### GET /api/recommendations
Get quick suggestion chips
```json
// Response
[
  { "id": 1, "text": "What courses do you offer?" },
  { "id": 2, "text": "Tell me about certifications" }
]
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Contact

**Rooman Technologies**
- Email: online@rooman.net
- Phone: 08069451000
- Address: #30, 12th Main, 1st Stage Rajajinagar, Bangalore – 560010

**Developer**
- GitHub: [@iamsandeshk](https://github.com/iamsandeshk)
- Repository: [Rooman-Ai](https://github.com/iamsandeshk/Rooman-Ai)

## 🙏 Acknowledgments

- Google Gemini AI for powerful language model
- Rooman Technologies for domain expertise
- Open source community for tools and libraries

---

**Made with ❤️ for Rooman Technologies**
