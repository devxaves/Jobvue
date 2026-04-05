<div align="center">

# 🚀 JobVue AI

## Your Complete Career Operating System

**Find jobs. Practice interviews. Land offers.**

A full-stack career platform blending a hyperlocal job marketplace with AI-powered interview prep and gamified progress tracking.

---

### ⚡ Tech Stack

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript_5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma_5.22-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-EA4335?style=for-the-badge&logoColor=white)
![Vapi](https://img.shields.io/badge/Vapi_Voice-18C5A9?style=for-the-badge&logoColor=white)

</div>

---

## 🎯 Why JobVue AI?

Students, freelancers, and early-career pros need **one place** to:

✨ **Discover real local opportunities** → Browse, save, apply to jobs near you  
🎙️ **Practice with AI interviews** → Get instant feedback from Gemini  
🏆 **Track progress & earn badges** → Streaks, tokens, leaderboards

Built as a **production-style app** with modern Next.js, typed server actions, and hybrid persistence (PostgreSQL + MongoDB) optimized for real-world workflows.

---

## 🧭 Core Product Areas

### 💼 Job Marketplace

Find and post opportunities in your network  
✅ Browse jobs by role, skills, location  
✅ Save favorites and track applications  
✅ Manage postings (for employers)  
✅ Apply directly in-app

### 🎙️ Intervue AI (Interview Prep)

Generate questions → Practice with voice AI → Get scored feedback  
✅ Role-based question generation  
✅ Live Vapi voice interview sessions  
✅ Real-time transcript collection  
✅ Structured AI scoring (5 categories)  
✅ Auto-redirect to feedback page

### 🏆 Profile & Gamification

Track mastery, earn rewards, climb leaderboards  
✅ Unified profile (skills, bio, preferences)  
✅ Token system for milestones  
✅ Streaks for consistency  
✅ Unlockable badges  
✅ Public leaderboards

---

## 🏗️ Architecture at a Glance

```
┌─────────────────────────────────────┐
│   Frontend: Next.js 15 + React 19   │
│   (TypeScript, Tailwind, Framer)    │
└────────────────┬────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
   ┌────▼─────┐     ┌────▼─────┐
   │PostgreSQL│     │ MongoDB  │
   │(Prisma)  │     │(Mongoose)│
   │ ─────────│     │ ─────────│
   │ Users    │     │ Jobs     │
   │ Feedback │     │ Apps     │
   │ Badges   │     │ Saved    │
   │ Tokens   │     │          │
   └──────────┘     └────┬─────┘
                         │
        ┌────────┬───────┼────────┬──────┐
        │        │       │        │      │
   ┌────▼──┐ ┌──▼───┐ ┌─▼──────┐┌▼───┐┌─▼──┐
   │Gemini │ │Vapi  │ │Firebase││Auth││JWT │
   │(AI)   │ │Voice │ │(Legacy)││    ││    │
   └───────┘ └──────┘ └────────┘└────┘└────┘
```

---

## 📁 Project Structure

```
jobvue/
├── app/                    🛣️  Next.js routes & API handlers
│   ├── (interview)/        Interview pages & flows
│   ├── (auth)/             Auth pages
│   ├── jobs/               Job marketplace
│   ├── profile/            User profiles
│   ├── api/                REST endpoints
│   └── layout.tsx          Root layout
│
├── components/             ⚛️  React components
│   ├── Agent.tsx           Interview session component
│   ├── FeedbackClient.tsx  Feedback display
│   ├── Navbar.tsx          Navigation
│   └── ui/                 Radix-based primitives
│
├── lib/                    🔧  Utilities & services
│   ├── actions/            Server actions (Prisma, AI)
│   ├── models/             Mongoose schemas
│   ├── auth.ts             JWT + auth logic
│   ├── prisma.ts           Prisma client
│   └── vapi.sdk.ts         Vapi initialization
│
├── prisma/                 📊  Database
│   ├── schema.prisma       PostgreSQL schema
│   ├── seed.ts             Demo data seeder
│   └── migrations/         Schema versions
│
├── constants/              ⚙️  Config & schemas
│   └── index.ts            Zod schemas, mappings
│
└── public/                 📦  Static assets
```

---

## 🌐 Key Routes & Features

### 🎯 User-Facing Pages

| Route                    | Feature              |
| ------------------------ | -------------------- |
| /                        | Home + hero          |
| /jobs                    | Browse marketplace   |
| /jobs/[id]               | Job details          |
| /jobs/post               | Post new listing     |
| /jobs/manage             | Manage your postings |
| /profile                 | View/edit profile    |
| /interview               | Interview history    |
| /interview/[id]          | Run interview        |
| /interview/[id]/feedback | View results         |
| /quiz                    | Practice quizzes     |
| /leaderboard             | Rankings             |

### 🔌 API Endpoints

```
POST   /api/vapi/generate           Generate & start interview
GET    /api/jobs                    List jobs
POST   /api/jobs/[id]/apply         Submit application
GET    /api/me                      Current user
GET    /api/gamification/badges     User badges
GET    /api/gamification/leaderboard Global rankings
```

---

## 🚀 Get Started in 5 Minutes

### 1️⃣ Clone & Install

```bash
git clone https://github.com/your-org/jobvue.git
cd jobvue
npm install
```

### 2️⃣ Configure .env

Create a `.env` file in the root:

```env
# 🗄️  Databases
DATABASE_URL=postgresql://user:pass@host/db
DIRECT_URL=postgresql://user:pass@host/db
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/jobvue

# 🔐 Security
JWT_SECRET=your-super-secret-key-min-32-chars

# 🤖 AI & Voice
GEMINI_API_KEY=your-gemini-key
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-key
NEXT_PUBLIC_VAPI_WEB_TOKEN=your-vapi-token
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your-workflow-id
```

> ⚠️ Never commit `.env` to version control. Use `.env.local` for local development.

### 3️⃣ Initialize Database

```bash
npm run prisma:generate    # Generate Prisma client
npm run prisma:push        # Sync schema
npm run seed               # Load demo data
```

### 4️⃣ Start Development

```bash
npm run dev
```

Server runs at `http://localhost:3000` with Turbopack hot reload.

### 5️⃣ Open & Login

Visit the app and use demo credentials:

| Email             | Password   | Role            |
| ----------------- | ---------- | --------------- |
| demo@jobvue.com   | demo1234   | Seeker + Poster |
| poster@jobvue.com | poster1234 | Poster          |

---

## 📦 Available Commands

```bash
npm run dev              # Start dev server (Turbopack)
npm run build            # Production build
npm run start            # Run production server
npm run lint             # ESLint checks
npm run prisma:generate  # Regenerate Prisma client
npm run prisma:push      # Push schema to DB
npm run prisma:migrate   # Interactive migrations
npm run seed             # Seed PostgreSQL + MongoDB
```

---

## 🎙️ Interview Flow (End-to-End)

```
┌──────────────────────────────────────────────────────────────────┐
│                    Interview Session Flow                          │
└──────────────────────────────────────────────────────────────────┘

1. User clicks "Call" → Vapi session starts
   ├─ Questions loaded
   ├─ Voice agent initialized
   └─ Client listening for transcripts

2. Live conversation
   ├─ User speaks (captured by Vapi)
   ├─ Agent responds
   └─ Transcripts streamed to frontend

3. User clicks "End" → Call terminates
   ├─ All messages collected
   └─ Sent to server action

4. Server processes feedback
   ├─ Gemini analyzes transcript
   ├─ Generates structured scores (5 categories)
   ├─ Saves to PostgreSQL
   └─ Creates/awards badges (non-blocking)

5. Auto-redirect → /interview/[id]/feedback
   ├─ Client automatically navigated
   └─ Feedback page displays scores & analysis
```

### Interview Scoring Categories

| Category                | Focus                            |
| ----------------------- | -------------------------------- |
| 🗣️ Communication Skills | Clarity, articulation, structure |
| 💡 Technical Knowledge  | Depth of understanding           |
| 🧩 Problem Solving      | Analysis & solution design       |
| 👥 Cultural Fit         | Values alignment & collaboration |
| 💪 Confidence & Clarity | Assertiveness & decisiveness     |

Each scores 0–100, with detailed comments and actionable improvement areas.

---

## 🛡️ Recent Fixes & Improvements

✅ **Schema Validation** — Fixed AI output category naming to match strict Zod schema  
✅ **Dependency Updates** — Upgraded @daily-co/daily-js and @vapi-ai/web  
✅ **Badge System** — Made non-blocking with lazy badge creation  
✅ **Auto-Redirect** — Interview completion now reliably routes to feedback page  
✅ **Windows EPERM** — Resolved native module lock issues with clean install script

---

## ⚡ Performance & Reliability

- **Server Actions** — Type-safe, compiled Prisma queries
- **Streaming** — Next.js streaming for fast TTFB
- **Error Boundaries** — Graceful fallbacks for badge/gamification failures
- **Database Optimization** — Indexes on frequently queried fields (userId, interviewId)
- **Native Modules** — Proper lightningcss and Prisma engine management

---

## 🔒 Security Checklist

✅ Use strong, unique JWT_SECRET (min 32 chars)  
✅ Rotate API keys every 90 days  
✅ Never commit .env files  
✅ Restrict DB users with least-privilege access  
✅ Enable HTTPS in production  
✅ Validate all user inputs with Zod

---

## 🐛 Troubleshooting

### ❌ Native Module Errors (Windows EPERM)

```bash
# Kill node processes
taskkill /F /IM node.exe

# Clean & reinstall
rm -r .next node_modules package-lock.json
npm ci
npm run build
```

### ❌ Feedback Not Generating

1. Check Gemini API key in .env
2. Verify PostgreSQL connectivity
3. Confirm interview transcript collection
4. Check server logs for Zod validation errors

**Fix:** Category names must match exactly:

- "Problem Solving" (not "Problem-Solving")
- "Cultural Fit" (not "Cultural & Role Fit")
- "Confidence and Clarity" (not "Confidence & Clarity")

### ❌ Voice Call Not Connecting

1. Verify NEXT_PUBLIC_VAPI_WEB_TOKEN
2. Verify NEXT_PUBLIC_VAPI_WORKFLOW_ID
3. Check Vapi dashboard for endpoint status
4. Confirm browser microphone permissions

### ❌ Database Connection Failed

```bash
# Verify PostgreSQL
psql $DATABASE_URL -c "SELECT 1"

# Verify MongoDB
mongosh "$MONGODB_URI" --eval "db.adminCommand('ping')"

# Reset Prisma
npm run prisma:generate
npm run prisma:push
```

---

## 📊 Deployment Checklist

Before shipping to production:

- [ ] All environment variables configured
- [ ] `prisma generate` succeeds in CI/CD pipeline
- [ ] `npm run build` completes without errors
- [ ] Database connectivity tested (PostgreSQL + MongoDB)
- [ ] Gemini & Vapi API keys verified
- [ ] JWT_SECRET is strong & unique
- [ ] CORS properly configured
- [ ] Rate limiting enabled on API routes
- [ ] Monitoring & error tracking set up (Sentry, etc.)

---

## 🚀 Next Steps & Roadmap

Future enhancements in progress:

🔄 **Peer interviews** — Practice with real people  
📈 **Interview analytics** — Trend tracking over time  
🎯 **Personalized learning paths** — Adaptive question generation  
🤝 **Mentorship matching** — Connect with industry professionals  
📱 **Mobile app** — React Native companion

---

## 📄 License

[MIT License](LICENSE) - Free to use, modify, and distribute.

---

## 🤝 Contributing

We welcome PRs! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 💬 Support & Community

- 📧 Email: support@jobvue.ai
- 🐛 Report bugs: [GitHub Issues](https://github.com/your-org/jobvue/issues)
- 💭 Discuss: [GitHub Discussions](https://github.com/your-org/jobvue/discussions)

---

<div align="center">

### 🌟 Built for practical outcomes, not demo-only workflows.

**[⬆ Back to top](#jobvue-ai)**

</div>
