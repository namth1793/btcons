@echo off
echo ============================================
echo   BTCONS Website - Starting Servers
echo ============================================

echo.
echo Starting backend on http://localhost:5014 ...
cd /d "%~dp0backend"
start "BTCONS Backend" cmd /k "node server.js"

timeout /t 2 /nobreak >nul

echo Starting frontend on http://localhost:5173 ...
cd /d "%~dp0frontend"
start "BTCONS Frontend" cmd /k "npm run dev"

timeout /t 3 /nobreak >nul

echo.
echo ============================================
echo   Website is running!
echo   Frontend : http://localhost:5173
echo   Backend  : http://localhost:5014
echo ============================================
start "" "http://localhost:5173"
