#!/bin/bash

# Launch script for Talan Challenge - AI Dashboard and FastAPI Backend
# This script starts both the frontend dashboard and backend APIs

set -e  # Exit on any error

echo "🚀 Starting Talan Challenge AI Dashboard System..."
echo "================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check if a port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        return 0  # Port is in use
    else
        return 1  # Port is free
    fi
}

# Function to kill process on port
kill_port() {
    local port=$1
    echo -e "${YELLOW}Killing process on port $port...${NC}"
    lsof -ti:$port | xargs kill -9 2>/dev/null || true
}

# Check and clean up ports
echo -e "${BLUE}Checking ports...${NC}"

if check_port 3000; then
    echo -e "${RED}Port 3000 is already in use${NC}"
    kill_port 3000
fi

if check_port 5000; then
    echo -e "${RED}Port 5000 is already in use${NC}"
    kill_port 5000
fi

if check_port 8000; then
    echo -e "${RED}Port 8000 is already in use${NC}"
    kill_port 8000
fi

if check_port 8001; then
    echo -e "${RED}Port 8001 is already in use${NC}"
    kill_port 8001
fi

sleep 2

# Create log directory
mkdir -p logs

echo -e "${BLUE}Starting backend services...${NC}"

# Start the main chatbot backend (port 5000)
if [ -f "deep_search_backend/main.py" ]; then
    echo -e "${GREEN}Starting Main Chatbot API on port 5000...${NC}"
    cd deep_search_backend
    nohup python main.py > ../logs/main_backend.log 2>&1 &
    MAIN_PID=$!
    cd ..
    echo "Main Backend PID: $MAIN_PID"
else
    echo -e "${YELLOW}Main backend not found, skipping...${NC}"
fi

# Start the deep search backend (port 8000)
if [ -f "deep_search_backend/web_search_agents.py" ]; then
    echo -e "${GREEN}Starting Deep Search API on port 8000...${NC}"
    cd deep_search_backend
    # Check if there's a specific way to run the deep search
    if command -v uvicorn &> /dev/null; then
        nohup uvicorn web_search_agents:app --host 0.0.0.0 --port 8000 > ../logs/deep_search.log 2>&1 &
    else
        nohup python -m http.server 8000 > ../logs/deep_search_simple.log 2>&1 &
    fi
    DEEP_SEARCH_PID=$!
    cd ..
    echo "Deep Search PID: $DEEP_SEARCH_PID"
else
    echo -e "${YELLOW}Deep search backend not found, skipping...${NC}"
fi

# Wait a moment for backends to start
echo -e "${BLUE}Waiting for backends to start...${NC}"
sleep 5

# Start the frontend dashboard
echo -e "${GREEN}Starting React Dashboard on port 3000...${NC}"
cd frontend

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing frontend dependencies...${NC}"
    npm install
fi

# Start the React development server
nohup npm start > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

echo "Frontend PID: $FRONTEND_PID"

# Save PIDs to file for easy cleanup later
echo $MAIN_PID > logs/main_backend.pid 2>/dev/null || true
echo $DEEP_SEARCH_PID > logs/deep_search.pid 2>/dev/null || true
echo $FRONTEND_PID > logs/frontend.pid

echo ""
echo -e "${GREEN}🎉 All services started successfully!${NC}"
echo "================================================="
echo -e "${BLUE}📊 Dashboard:${NC}       http://localhost:3000"
echo -e "${BLUE}🤖 Main API:${NC}        http://localhost:5000"
echo -e "${BLUE}🔍 Deep Search API:${NC}  http://localhost:8000"
echo -e "${BLUE}🎙️ Transcription:${NC}    http://localhost:8001 (if available)"
echo ""
echo -e "${YELLOW}📝 Logs are saved in the 'logs' directory${NC}"
echo -e "${YELLOW}⏹️  To stop all services, run: ./stop_services.sh${NC}"
echo ""

# Wait for the React server to be ready
echo -e "${BLUE}Waiting for React dashboard to be ready...${NC}"
for i in {1..30}; do
    if check_port 3000; then
        echo -e "${GREEN}✅ React dashboard is ready!${NC}"
        break
    fi
    if [ $i -eq 30 ]; then
        echo -e "${RED}❌ React dashboard failed to start${NC}"
        exit 1
    fi
    sleep 2
done

# Open browser automatically (works on most systems)
if command -v xdg-open > /dev/null; then
    echo -e "${BLUE}🌐 Opening dashboard in browser...${NC}"
    xdg-open http://localhost:3000 &
elif command -v open > /dev/null; then
    echo -e "${BLUE}🌐 Opening dashboard in browser...${NC}"
    open http://localhost:3000 &
fi

echo ""
echo -e "${GREEN}✨ System is ready! Happy coding! ✨${NC}"
echo ""
echo "Press Ctrl+C to stop all services..."

# Function to cleanup on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Stopping all services...${NC}"
    
    # Kill all background processes
    if [ -f logs/main_backend.pid ]; then
        kill $(cat logs/main_backend.pid) 2>/dev/null || true
        rm logs/main_backend.pid
    fi
    
    if [ -f logs/deep_search.pid ]; then
        kill $(cat logs/deep_search.pid) 2>/dev/null || true
        rm logs/deep_search.pid
    fi
    
    if [ -f logs/frontend.pid ]; then
        kill $(cat logs/frontend.pid) 2>/dev/null || true
        rm logs/frontend.pid
    fi
    
    # Kill any remaining processes on our ports
    kill_port 3000
    kill_port 5000
    kill_port 8000
    kill_port 8001
    
    echo -e "${GREEN}✅ All services stopped successfully!${NC}"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Keep the script running
while true; do
    sleep 1
done
