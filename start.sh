#!/bin/bash

# Art Portfolio - Local Development Startup Script
# This script helps you quickly start the application locally

set -e

echo "🎨 Art Portfolio - Local Development Setup"
echo "=========================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed!${NC}"
    echo "Please install Docker from: https://www.docker.com/get-started"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed!${NC}"
    echo "Please install Docker Compose from: https://docs.docker.com/compose/install/"
    exit 1
fi

echo -e "${GREEN}✓ Docker is installed${NC}"
echo -e "${GREEN}✓ Docker Compose is installed${NC}"
echo ""

# Show menu
echo "What would you like to do?"
echo "1) Start application (build + run)"
echo "2) Start application (detached mode)"
echo "3) View logs"
echo "4) Stop application"
echo "5) Clean everything (remove containers, volumes, images)"
echo "6) Run tests"
echo "7) Build only"
echo ""
read -p "Enter your choice (1-7): " choice

case $choice in
    1)
        echo -e "${YELLOW}Starting application...${NC}"
        docker-compose up --build
        ;;
    2)
        echo -e "${YELLOW}Starting application in background...${NC}"
        docker-compose up -d --build
        echo -e "${GREEN}✓ Application is running!${NC}"
        echo "Access at: http://localhost:8080"
        echo "View logs: docker-compose logs -f"
        ;;
    3)
        echo -e "${YELLOW}Showing logs (Ctrl+C to exit)...${NC}"
        docker-compose logs -f
        ;;
    4)
        echo -e "${YELLOW}Stopping application...${NC}"
        docker-compose down
        echo -e "${GREEN}✓ Application stopped${NC}"
        ;;
    5)
        echo -e "${RED}⚠️  This will delete all data!${NC}"
        read -p "Are you sure? (yes/no): " confirm
        if [ "$confirm" = "yes" ]; then
            echo -e "${YELLOW}Cleaning everything...${NC}"
            docker-compose down -v --rmi all
            echo -e "${GREEN}✓ Everything cleaned${NC}"
        else
            echo "Cancelled."
        fi
        ;;
    6)
        echo -e "${YELLOW}Running tests...${NC}"
        mvn clean test
        ;;
    7)
        echo -e "${YELLOW}Building Docker image...${NC}"
        docker build -t art-portfolio .
        echo -e "${GREEN}✓ Image built successfully${NC}"
        ;;
    *)
        echo -e "${RED}Invalid choice!${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}Done!${NC}"