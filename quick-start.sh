#!/bin/bash

# E-Commerce Application - Quick Start Script
# This script helps you quickly set up and run the application

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored messages
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Print banner
print_banner() {
    echo ""
    echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║   E-Commerce Application Quick Start      ║${NC}"
    echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}"
    echo ""
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
check_prerequisites() {
    print_info "Checking prerequisites..."
    
    local missing_deps=0
    
    if ! command_exists node; then
        print_error "Node.js is not installed. Please install Node.js v16 or higher."
        missing_deps=1
    else
        NODE_VERSION=$(node -v)
        print_success "Node.js $NODE_VERSION is installed"
    fi
    
    if ! command_exists npm; then
        print_error "npm is not installed. Please install npm."
        missing_deps=1
    else
        NPM_VERSION=$(npm -v)
        print_success "npm $NPM_VERSION is installed"
    fi
    
    if [ $missing_deps -eq 1 ]; then
        print_error "Please install missing dependencies and try again."
        exit 1
    fi
    
    echo ""
}

# Install dependencies
install_dependencies() {
    print_info "Installing dependencies..."
    
    # Root dependencies
    print_info "Installing root dependencies..."
    npm install
    
    # Server dependencies
    print_info "Installing server dependencies..."
    cd server
    npm install
    cd ..
    
    # Client dependencies
    print_info "Installing client dependencies..."
    cd client
    npm install
    cd ..
    
    print_success "All dependencies installed successfully!"
    echo ""
}

# Start application
start_application() {
    print_info "Starting the application..."
    print_info "Backend will run on: http://localhost:3000"
    print_info "Frontend will run on: http://localhost:5173"
    echo ""
    print_warning "Press Ctrl+C to stop the application"
    echo ""
    
    npm start
}

# Docker setup
setup_docker() {
    print_info "Setting up Docker environment..."
    
    if ! command_exists docker; then
        print_error "Docker is not installed. Please install Docker Desktop."
        exit 1
    fi
    
    if ! docker info >/dev/null 2>&1; then
        print_error "Docker daemon is not running. Please start Docker Desktop."
        exit 1
    fi
    
    print_success "Docker is ready"
    echo ""
    
    print_info "Building and starting Docker containers..."
    docker compose up --build
}

# Main menu
show_menu() {
    print_banner
    echo "Please select an option:"
    echo ""
    echo "  1) Install dependencies and start (Local Development)"
    echo "  2) Start application (Local Development)"
    echo "  3) Build and run with Docker"
    echo "  4) Stop Docker containers"
    echo "  5) Clean up (remove node_modules)"
    echo "  6) Exit"
    echo ""
    read -p "Enter your choice [1-6]: " choice
    
    case $choice in
        1)
            check_prerequisites
            install_dependencies
            start_application
            ;;
        2)
            check_prerequisites
            start_application
            ;;
        3)
            setup_docker
            ;;
        4)
            print_info "Stopping Docker containers..."
            docker compose down
            print_success "Docker containers stopped"
            ;;
        5)
            print_warning "This will remove all node_modules directories"
            read -p "Are you sure? (y/N): " confirm
            if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
                print_info "Cleaning up..."
                rm -rf node_modules server/node_modules client/node_modules
                print_success "Cleanup complete"
            else
                print_info "Cleanup cancelled"
            fi
            ;;
        6)
            print_info "Goodbye!"
            exit 0
            ;;
        *)
            print_error "Invalid option. Please try again."
            echo ""
            show_menu
            ;;
    esac
}

# Run the menu
show_menu
