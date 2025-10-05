#!/bin/bash

# Stop script for Talan Challenge - AI Dashboard and FastAPI Backend
# This script stops all running services

echo "🛑 Stopping Talan Challenge AI Dashboard System..."
echo "================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to kill process on port
kill_port() {
    local port=$1
    echo -e "${BLUE}Stopping services on port $port...${NC}"
    lsof -ti:$port | xargs kill -9 2>/dev/null || true
}

# Stop services using PID files
if [ -f logs/main_backend.pid ]; then
    PID=$(cat logs/main_backend.pid)
    echo -e "${YELLOW}Stopping Main Backend (PID: $PID)...${NC}"
    kill $PID 2>/dev/null || true
    rm logs/main_backend.pid
fi

if [ -f logs/deep_search.pid ]; then
    PID=$(cat logs/deep_search.pid)
    echo -e "${YELLOW}Stopping Deep Search API (PID: $PID)...${NC}"
    kill $PID 2>/dev/null || true
    rm logs/deep_search.pid
fi

if [ -f logs/frontend.pid ]; then
    PID=$(cat logs/frontend.pid)
    echo -e "${YELLOW}Stopping Frontend Dashboard (PID: $PID)...${NC}"
    kill $PID 2>/dev/null || true
    rm logs/frontend.pid
fi

# Force kill any remaining processes on our ports
echo -e "${BLUE}Cleaning up ports...${NC}"
kill_port 3000  # React dashboard
kill_port 5000  # Main chatbot API
kill_port 8000  # Deep search API
kill_port 8001  # Transcription API

# Clean up any node processes that might be hanging
pkill -f "react-scripts start" 2>/dev/null || true
pkill -f "npm start" 2>/dev/null || true

echo ""
echo -e "${GREEN}✅ All services stopped successfully!${NC}"
echo -e "${BLUE}📝 Log files are preserved in the 'logs' directory${NC}"
echo ""
