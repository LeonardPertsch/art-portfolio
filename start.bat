@echo off
echo ================================
echo   Art Portfolio - Starting...
echo ================================
echo.

REM Check if Maven is installed
where mvn >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo X Maven is not installed. Please install Maven first.
    echo   Visit: https://maven.apache.org/install.html
    pause
    exit /b 1
)

REM Check if Java is installed
where java >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo X Java is not installed. Please install Java 17 or higher.
    pause
    exit /b 1
)

echo + Maven found
echo + Java found
echo.

REM Start the application
echo Starting Spring Boot application...
echo.
mvn spring-boot:run

echo.
echo ================================
echo   Application started!
echo   Access at: http://localhost:8080
echo ================================
pause
