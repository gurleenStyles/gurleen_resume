#Portfolio

A modern, responsive portfolio website built with Next.js, featuring AI-powered content personalization and secure communication options.

## Features

### 🎨 **Modern Design**
- Responsive design with dark theme
- Tailwind CSS with custom components
- Framer Motion animations
- Custom cursor effects
- Glow shadows and backdrop blur effects

### 🤖 **AI-Powered Personalization**
- Dynamic content personalization based on user interactions
- Google Gemini AI integration for intelligent content adaptation
- Real-time content optimization

### 📧 **Contact System**
- Contact form with validation using React Hook Form and Zod
- Server-side email sending via Nodemailer
- SMTP integration for reliable email delivery
- Toast notifications for user feedback

### 🔐 **Security Features**
- PGP public key download for secure communication
- Interactive PGP explanation popup for visitors
- Secure email transmission capabilities

### 🛠 **Technical Stack**
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion
- **AI**: Google Gemini API
- **Email**: Nodemailer with SMTP
- **Validation**: Zod schema validation
- **Forms**: React Hook Form
- **TypeScript**: Full type safety

### 📱 **Components**
- Responsive header with navigation
- Hero section with animated content
- Skills showcase with interactive elements
- Projects gallery
- Contact form with real-time validation
- Custom UI components (buttons, cards, forms, etc.)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- SMTP email account (Gmail, Outlook, etc.)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gurleen_portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Fill in your environment variables:
```env
# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# SMTP Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
CONTACT_RECEIVER_EMAIL=your_email@gmail.com
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

### Email Setup (Gmail Example)
1. Enable 2-factor authentication on your Google account
2. Generate an App Password for your application
3. Use the App Password in the `SMTP_PASS` environment variable

### AI Personalization
- Obtain a Google Gemini API key from Google AI Studio
- Add it to your `.env` file as `GEMINI_API_KEY`

## Project Structure

```
src/
├── app/
│   ├── api/contact/          # Email sending API route
│   ├── actions.ts            # Server actions
│   ├── globals.css           # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── contact.tsx          # Contact form
│   ├── header.tsx           # Navigation header
│   ├── hero.tsx             # Hero section
│   ├── projects.tsx         # Projects showcase
│   └── skills.tsx           # Skills section
├── ai/
│   ├── flows/               # AI flow definitions
│   └── genkit.ts            # AI configuration
├── hooks/                   # Custom React hooks
└── lib/
    ├── types.ts             # TypeScript definitions
    └── utils.ts             # Utility functions
```

## Deployment

This project can be deployed on:
- Vercel (recommended for Next.js)
- Netlify
- Firebase Hosting
- Any platform supporting Node.js

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
