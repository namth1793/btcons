@echo off
echo ============================================
echo   BTCONS Website - Installing Dependencies
echo ============================================

echo.
echo [1/2] Installing backend dependencies...
cd /d "%~dp0backend"
call npm install
if errorlevel 1 ( echo ERROR: Backend install failed & pause & exit /b 1 )

echo.
echo [2/2] Installing frontend dependencies...
cd /d "%~dp0frontend"
call npm install
if errorlevel 1 ( echo ERROR: Frontend install failed & pause & exit /b 1 )

echo.
echo ============================================
echo   Installation complete!
echo   Run start.bat to launch the website.
echo ============================================
pause
