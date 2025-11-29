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
│   MySQL Database    │
│                     │
│ • chat_history      │
│ • recommendations   │
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
- **Database**: Local MySQL setup required (not cloud-ready by default)

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
- **MySQL2** - Database driver
- **@google/generative-ai** - Gemini AI SDK
- **dotenv** - Environment variable management
- **cors** - Cross-origin resource sharing

### Database
- **MySQL** (v8.0+) - Relational database for chat history

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
- MySQL (v8.0 or higher)
- Gemini API Key (from Google AI Studio)
- Git
```

### Step 1: Clone Repository
```bash
git clone https://github.com/iamsandeshk/Rooman-Ai.git
cd Rooman-Ai
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set Up MySQL Database
```sql
-- Create database
CREATE DATABASE rooman_support;

-- Use database
USE rooman_support;

-- Create chat_history table
CREATE TABLE chat_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    role ENUM('user', 'bot') NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_session (session_id),
    INDEX idx_created (created_at)
);

-- Create recommendations table
CREATE TABLE recommendations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    priority INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample recommendations
INSERT INTO recommendations (text, category, priority) VALUES
('What courses do you offer?', 'courses', 1),
('Tell me about certifications', 'certifications', 2),
('Placement assistance details', 'placement', 3),
('Course duration and fees', 'fees', 4);
```

### Step 4: Configure Environment Variables
Create a `.env` file in the root directory:
```env
# Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# MySQL Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=rooman_support

# Server Configuration
PORT=3000
```

**Get Gemini API Key:**
1. Visit https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Create new API key
4. Copy and paste into `.env` file

### Step 5: Start the Server
```bash
# Development mode
node server.js

# The server will start on http://localhost:3000
```

### Step 6: Access the Application
Open your browser and navigate to:
```
http://localhost:3000
```

## 🚀 Deployment Guide

### Option 1: Deploy to Render (Recommended)

#### Backend Deployment
1. Create account on [Render.com](https://render.com)
2. Create new **Web Service**
3. Connect GitHub repository
4. Configure:
   - Build Command: `npm install`
   - Start Command: `node server.js`
5. Add Environment Variables:
   - `GEMINI_API_KEY`
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
6. Deploy

#### Database Deployment
1. Create MySQL database on Render or use:
   - [PlanetScale](https://planetscale.com) (Free tier)
   - [Railway](https://railway.app) (MySQL support)
   - [Clever Cloud](https://www.clever-cloud.com)
2. Update environment variables with hosted DB credentials

### Option 2: Deploy to Railway
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Add environment variables
railway variables set GEMINI_API_KEY=your_key_here

# Deploy
railway up
```

### Option 3: Docker Deployment
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
