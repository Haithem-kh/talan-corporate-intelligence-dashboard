# Talan Challenge - AI Dashboard System

## Overview

This project is a comprehensive AI-powered corporate research dashboard built for the **Talan Challenge**. It combines a **React frontend dashboard** with a **multi-agent backend system** using **LangGraph**, **LangChain**, and **FastAPI** to deliver deep, structured intelligence on any company.

The system leverages multiple data sources and AI agents to gather exhaustive corporate intelligence across 8 key dimensions:
- Company Overview
- Business Operations
- Global Presence
- Financial Performance
- Digital & Marketing Presence
- Technology & Innovation
- Sustainability & CSR
- Recent News & Developments

## Architecture

```
frontend/              ← React Dashboard (Port 3000)
deep_search_backend/   
├── main.py            ← Main Chatbot API (Port 5000)  
├── web_search_agents.py ← Deep Research API (Port 8000) [FastAPI]
└── search_agent.py    ← Core research logic
launch.sh              ← Master launch script
stop_services.sh       ← Cleanup script
logs/                  ← Runtime logs and PIDs
```

## Features

### AI Research Agent
- **Multi-tool integration**: Google Search (via Tavily & NovaDA), LinkedIn API, Twitter, Facebook
- **Structured research workflow** using LangGraph state machines
- **Comprehensive 8-pillar analysis framework**
- **Automatic query refinement** and multi-step reasoning

### Backend APIs
- **Main API (5000)**: Entry point for chatbot interactions
- **Deep Search API (8000)**: FastAPI endpoint for structured company research
- **CORS enabled** for seamless frontend integration

### Frontend Dashboard
- Modern React interface
- Real-time research visualization
- Structured report display
- Auto-launched browser integration

## Prerequisites

- Python 3.9+
- Node.js 16+
- npm
- API Keys for:
  - Google Gemini (`GOOGLE_API_KEY`)
  - Tavily Search (`TAVILY_API_KEY`)
  - NovaDA Scraper (`NOVADA_API_KEY`)
  - RapidAPI (LinkedIn, Twitter, Facebook scrapers)

## Quick Start

1. **Clone and setup**
```bash
git clone <repository-url>
cd talan-challenge-ai
```

2. **Set environment variables**
```bash
export GOOGLE_API_KEY="your-gemini-key"
export TAVILY_API_KEY="your-tavily-key"
export NOVADA_API_KEY="your-novada-key"
```

3. **Launch all services**
```bash
chmod +x launch.sh
./launch.sh
```

The script will:
- Kill any conflicting ports
- Start backend services on ports 5000 and 8000
- Install frontend dependencies
- Launch React dashboard on port 3000
- Automatically open browser
- Save logs and PIDs

## API Endpoints

### Deep Search API (`http://localhost:8000`)

**GET /**
```json
{ "message": "Web Search Agent API is running!" }
```

**POST /search**
```json
{
  "company": "Inetum"
}
```
or use query parameter: `?company=Inetum`

**Response:**
```json
{
  "query": "Inetum",
  "report": "...comprehensive AI-generated analysis...",
  "overview": "Comprehensive analysis for Inetum",
  "strategy": "Strategic insights extracted from research",
  "products": "Products and services information",
  "financials": "Financial data and performance metrics"
}
```

## Usage

1. **Access Dashboard**: http://localhost:3000
2. **Enter Company Name**: Type any company (e.g., "Microsoft", "Inetum")
3. **View Structured Report**: AI agent researches across all data sources
4. **Export Results**: Structured JSON format ready for integration

## Project Structure

```
.
├── launch.sh                  # Master launcher
├── stop_services.sh           # Cleanup script
├── logs/                      # Runtime logs
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── deep_search_backend/
    ├── main.py               # Legacy backend
    ├── web_search_agents.py  # FastAPI research endpoint
    ├── search_agent.py       # Core AI logic
    └── requirements.txt
```

## Technologies

- **Frontend**: React, Create React App
- **Backend**: FastAPI, Python 3.9+
- **AI Framework**: 
  - LangChain
  - LangGraph (workflow orchestration)
  - Google Gemini 2.5 Flash
- **Search Tools**:
  - Tavily Search API
  - NovaDA Google Scraper
  - RapidAPI (LinkedIn, Twitter, Facebook)
- **Infrastructure**: Bash scripting, nohup, port management

## API Keys Configuration

The system uses hardcoded keys in the current implementation. For production:

1. Move keys to `.env` file
2. Use `python-dotenv` for loading
3. Implement key rotation and secret management

Current keys (development only):
```python
TAVILY_API_KEY="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"
GOOGLE_API_KEY="AIzaSyCNgCX_OVqGEMrRNmLOdT4-Hv0X9ls8DV8"
NOVADA_API_KEY="05cbcc4f64098ddac08df219ba22af37"
RAPIDAPI_KEY="af3a7f9a9cmsh9b80fe7a10929e9p1c214cjsnf7ba6e506a5a"
```

## Stopping Services

```bash
./stop_services.sh
```

Or press `Ctrl+C` in the launch terminal (uses trap cleanup)

## Logs

All services log to `logs/` directory:
- `main_backend.log`
- `deep_search.log` 
- `frontend.log`
- PID files for process management

## Customization

### Add New Data Sources
1. Create new tool with `@lc_tool` decorator
2. Add to tools list in agent creation
3. Update system prompt if needed

### Modify Research Scope
Edit the 8-pillar framework in `make_system_prompt()` function

### Change LLM
Replace `ChatGoogleGenerativeAI` with any LangChain-compatible model

## Security Notes

- Development configuration allows all CORS origins (`*`)
- API keys are currently hardcoded
- Uses RapidAPI and third-party scrapers (terms of service apply)
- For production: implement authentication, rate limiting, and key management

## Troubleshooting

**Port conflicts**: Script auto-kills processes on 3000, 5000, 8000, 8001

**Frontend not starting**: 
```bash
cd frontend && npm install && npm start
```

**API errors**: Check logs in `logs/` directory

**Missing dependencies**:
```bash
pip install fastapi uvicorn langchain langgraph langchain-google-genai langchain-community requests
```

## Future Enhancements

- [ ] Add authentication and user sessions
- [ ] Implement report caching (Redis)
- [ ] Add export to PDF/Word
- [ ] Integrate company database (Crunchbase, etc.)
- [ ] Add real-time news monitoring
- [ ] Implement multi-language support
- [ ] Add data visualization charts

---
**Talan Challenge Submission**  
*AI-Powered Corporate Intelligence Platform*  
*Built with LangGraph, Gemini, and React*  

--- 

*Happy researching!* 🚀
