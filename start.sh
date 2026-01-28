#!/bin/bash

echo "================================"
echo "  Art Portfolio - Starting..."
echo "================================"
echo ""

# Check if Maven is installed
if ! command -v mvn &> /dev/null
then
    echo "❌ Maven is not installed. Please install Maven first."
    echo "   Visit: https://maven.apache.org/install.html"
    exit 1
fi

# Check if Java is installed
if ! command -v java &> /dev/null
then
    echo "❌ Java is not installed. Please install Java 17 or higher."
    exit 1
fi

echo "✓ Maven found: $(mvn -version | head -n 1)"
echo "✓ Java found: $(java -version 2>&1 | head -n 1)"
echo ""

# Start the application
echo "🚀 Starting Spring Boot application..."
echo ""
mvn spring-boot:run

echo ""
echo "================================"
echo "  Application started!"
echo "  Access at: http://localhost:8080"
echo "================================"
