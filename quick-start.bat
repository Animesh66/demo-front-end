@echo off
REM E-Commerce Application - Quick Start Script for Windows
REM This script helps you quickly set up and run the application

setlocal enabledelayedexpansion

:banner
echo.
echo ================================================
echo    E-Commerce Application Quick Start
echo ================================================
echo.
goto menu

:menu
echo Please select an option:
echo.
echo   1) Install dependencies and start (Local Development)
echo   2) Start application (Local Development)
echo   3) Build and run with Docker
echo   4) Stop Docker containers
echo   5) Clean up (remove node_modules)
echo   6) Exit
echo.
set /p choice="Enter your choice [1-6]: "

if "%choice%"=="1" goto install_and_start
if "%choice%"=="2" goto start_app
if "%choice%"=="3" goto docker_start
if "%choice%"=="4" goto docker_stop
if "%choice%"=="5" goto cleanup
if "%choice%"=="6" goto exit_script
echo Invalid option. Please try again.
echo.
goto menu

:check_node
echo Checking prerequisites...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed. Please install Node.js v16 or higher.
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo Node.js !NODE_VERSION! is installed

where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: npm is not installed. Please install npm.
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo npm !NPM_VERSION! is installed
echo.
exit /b 0

:install_deps
echo Installing dependencies...
echo.

echo Installing root dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install root dependencies
    pause
    exit /b 1
)

echo Installing server dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install server dependencies
    pause
    exit /b 1
)
cd ..

echo Installing client dependencies...
cd client
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install client dependencies
    pause
    exit /b 1
)
cd ..

echo All dependencies installed successfully!
echo.
exit /b 0

:install_and_start
call :check_node
if %errorlevel% neq 0 exit /b 1
call :install_deps
if %errorlevel% neq 0 exit /b 1
goto start_app

:start_app
call :check_node
if %errorlevel% neq 0 exit /b 1
echo Starting the application...
echo Backend will run on: http://localhost:3000
echo Frontend will run on: http://localhost:5173
echo.
echo Press Ctrl+C to stop the application
echo.
call npm start
goto end

:docker_start
echo Checking Docker...
where docker >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Docker is not installed. Please install Docker Desktop.
    pause
    goto menu
)

docker info >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Docker daemon is not running. Please start Docker Desktop.
    pause
    goto menu
)

echo Docker is ready
echo.
echo Building and starting Docker containers...
docker compose up --build
goto end

:docker_stop
echo Stopping Docker containers...
docker compose down
echo Docker containers stopped
echo.
pause
goto menu

:cleanup
echo WARNING: This will remove all node_modules directories
set /p confirm="Are you sure? (y/N): "
if /i "%confirm%"=="y" (
    echo Cleaning up...
    if exist node_modules rmdir /s /q node_modules
    if exist server\node_modules rmdir /s /q server\node_modules
    if exist client\node_modules rmdir /s /q client\node_modules
    echo Cleanup complete
) else (
    echo Cleanup cancelled
)
echo.
pause
goto menu

:exit_script
echo Goodbye!
exit /b 0

:end
pause
