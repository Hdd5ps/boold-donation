#!/bin/bash

# Blood Donation App - Build Script for Play Store Deployment
# This script automates the build process for Android release

set -e  # Exit on any error

echo "🩸 Blood Donation App - Build Script"
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root directory."
    exit 1
fi

# Check if android directory exists
if [ ! -d "android" ]; then
    print_error "Android directory not found. This script is for Android builds only."
    exit 1
fi

print_status "Starting build process..."

# Clean previous builds
print_status "Cleaning previous builds..."
cd android
./gradlew clean
cd ..

# Install dependencies
print_status "Installing/updating dependencies..."
npm install

# Check for common issues
print_status "Checking for common issues..."

# Check Node version
NODE_VERSION=$(node --version)
print_status "Node.js version: $NODE_VERSION"

# Check React Native CLI
if ! command -v npx react-native &> /dev/null; then
    print_warning "React Native CLI not found. Installing..."
    npm install -g @react-native-community/cli
fi

# Check Android SDK
if [ -z "$ANDROID_HOME" ]; then
    print_warning "ANDROID_HOME environment variable not set."
    print_warning "Please set ANDROID_HOME to your Android SDK path."
fi

# Check Java version
if command -v java &> /dev/null; then
    JAVA_VERSION=$(java -version 2>&1 | head -n 1)
    print_status "Java version: $JAVA_VERSION"
else
    print_error "Java not found. Please install Java JDK 11 or higher."
    exit 1
fi

# Build type selection
echo ""
echo "Select build type:"
echo "1) Debug APK (for testing)"
echo "2) Release APK (signed)"
echo "3) Release App Bundle (for Play Store)"
echo "4) All builds"
read -p "Enter your choice (1-4): " BUILD_CHOICE

case $BUILD_CHOICE in
    1)
        print_status "Building debug APK..."
        cd android
        ./gradlew assembleDebug
        print_success "Debug APK built successfully!"
        print_status "Location: android/app/build/outputs/apk/debug/app-debug.apk"
        ;;
    2)
        print_status "Building release APK..."
        cd android
        ./gradlew assembleRelease
        print_success "Release APK built successfully!"
        print_status "Location: android/app/build/outputs/apk/release/app-release.apk"
        ;;
    3)
        print_status "Building release App Bundle..."
        cd android
        ./gradlew bundleRelease
        print_success "Release App Bundle built successfully!"
        print_status "Location: android/app/build/outputs/bundle/release/app-release.aab"
        ;;
    4)
        print_status "Building all variants..."
        cd android
        
        print_status "Building debug APK..."
        ./gradlew assembleDebug
        
        print_status "Building release APK..."
        ./gradlew assembleRelease
        
        print_status "Building release App Bundle..."
        ./gradlew bundleRelease
        
        print_success "All builds completed successfully!"
        echo ""
        print_status "Build locations:"
        print_status "- Debug APK: android/app/build/outputs/apk/debug/app-debug.apk"
        print_status "- Release APK: android/app/build/outputs/apk/release/app-release.apk"
        print_status "- Release AAB: android/app/build/outputs/bundle/release/app-release.aab"
        ;;
    *)
        print_error "Invalid choice. Exiting."
        exit 1
        ;;
esac

cd ..

# Check if builds were successful
if [ $BUILD_CHOICE -eq 1 ] || [ $BUILD_CHOICE -eq 4 ]; then
    if [ -f "android/app/build/outputs/apk/debug/app-debug.apk" ]; then
        APK_SIZE=$(du -h "android/app/build/outputs/apk/debug/app-debug.apk" | cut -f1)
        print_success "Debug APK size: $APK_SIZE"
    fi
fi

if [ $BUILD_CHOICE -eq 2 ] || [ $BUILD_CHOICE -eq 4 ]; then
    if [ -f "android/app/build/outputs/apk/release/app-release.apk" ]; then
        APK_SIZE=$(du -h "android/app/build/outputs/apk/release/app-release.apk" | cut -f1)
        print_success "Release APK size: $APK_SIZE"
    fi
fi

if [ $BUILD_CHOICE -eq 3 ] || [ $BUILD_CHOICE -eq 4 ]; then
    if [ -f "android/app/build/outputs/bundle/release/app-release.aab" ]; then
        AAB_SIZE=$(du -h "android/app/build/outputs/bundle/release/app-release.aab" | cut -f1)
        print_success "Release AAB size: $AAB_SIZE"
    fi
fi

echo ""
print_success "Build process completed! 🎉"

# Additional information for Play Store deployment
if [ $BUILD_CHOICE -eq 3 ] || [ $BUILD_CHOICE -eq 4 ]; then
    echo ""
    print_status "📱 Play Store Deployment Notes:"
    print_status "1. Upload the .aab file to Google Play Console"
    print_status "2. Ensure all store listing information is complete"
    print_status "3. Add required screenshots and graphics"
    print_status "4. Set up content rating and pricing"
    print_status "5. Review and publish when ready"
    echo ""
    print_status "For detailed deployment instructions, see DEPLOYMENT.md"
fi

echo ""
print_status "Build script completed successfully! 🚀"
