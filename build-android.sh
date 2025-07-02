#!/bin/bash

# Blood Donation App Build Script

echo "🩸 Blood Donation App - Build Script"
echo "====================================="

# Set Android SDK path
ANDROID_HOME="/workspaces/boold-donation/android-sdk"
export ANDROID_HOME
export PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH"

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if Android SDK is available
if [ ! -f "$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager" ]; then
    echo "📦 Setting up Android SDK..."
    
    # Create android-sdk directory
    mkdir -p "$ANDROID_HOME"
    cd "$ANDROID_HOME"
    
    # Check if we have curl or wget
    if command_exists curl; then
        DOWNLOAD_CMD="curl -L -o"
    elif command_exists wget; then
        DOWNLOAD_CMD="wget -O"
    else
        echo "❌ Neither curl nor wget found. Please install one of them."
        exit 1
    fi
    
    # Download Android SDK Command Line Tools
    echo "⬇️  Downloading Android SDK Command Line Tools..."
    $DOWNLOAD_CMD tools.zip https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip
    
    if [ ! -f "tools.zip" ]; then
        echo "❌ Failed to download Android SDK tools."
        echo "Please manually download from: https://developer.android.com/studio/command-line"
        exit 1
    fi
    
    # Extract and organize tools
    echo "📦 Extracting Android SDK tools..."
    unzip -q tools.zip
    
    if [ -d "cmdline-tools" ]; then
        mkdir -p cmdline-tools/latest
        # Move contents, not the directory itself
        if [ "$(ls -A cmdline-tools)" ]; then
            mv cmdline-tools/* cmdline-tools/latest/ 2>/dev/null || {
                # If the above fails, it might be that cmdline-tools is already the final structure
                if [ ! -d "cmdline-tools/latest" ]; then
                    mv cmdline-tools cmdline-tools_temp
                    mkdir -p cmdline-tools
                    mv cmdline-tools_temp cmdline-tools/latest
                fi
            }
        fi
    fi
    
    rm tools.zip
    
    # Make tools executable
    if [ -d "cmdline-tools/latest/bin" ]; then
        chmod +x cmdline-tools/latest/bin/*
        echo "✅ Android SDK tools installed"
    else
        echo "❌ Failed to set up Android SDK tools structure"
        echo "Please check the android-sdk directory and set up manually"
        exit 1
    fi
fi

# Go back to project root
cd /workspaces/boold-donation

# Verify sdkmanager works
if [ -f "$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager" ]; then
    echo "� Installing required Android SDK packages..."
    "$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager" "platform-tools" "platforms;android-34" "build-tools;34.0.0" "ndk;25.1.8937393"
    
    echo "� Accepting Android SDK licenses (including NDK)..."
    # Accept all licenses explicitly
    echo y | "$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager" --licenses
    
    # Double-check NDK license specifically
    if [ -d "$ANDROID_HOME/licenses" ]; then
        echo "android-sdk-license" > "$ANDROID_HOME/licenses/android-sdk-license"
        echo "d56f5187479451eabf01fb78af6dfcb131a6481e" >> "$ANDROID_HOME/licenses/android-sdk-license"
        echo "24333f8a63b6825ea9c5514f83c2829b004d1fee" >> "$ANDROID_HOME/licenses/android-sdk-license"
        
        echo "android-ndk-license" > "$ANDROID_HOME/licenses/android-ndk-license"
        echo "601085b94cd77f0b54ff86406957099ebe79c4d6" >> "$ANDROID_HOME/licenses/android-ndk-license"
        
        echo "android-googletv-license" > "$ANDROID_HOME/licenses/android-googletv-license"
        echo "601085b94cd77f0b54ff86406957099ebe79c4d6" >> "$ANDROID_HOME/licenses/android-googletv-license"
    fi
    
    echo "✅ Android SDK setup complete"
else
    echo "❌ sdkmanager not found. Please check Android SDK installation."
    exit 1
fi

echo ""

# Check if local.properties exists
if [ ! -f "android/local.properties" ]; then
    echo "📝 Creating android/local.properties..."
    echo "sdk.dir=$ANDROID_HOME" > android/local.properties
fi

echo "✅ Android SDK found at: $ANDROID_HOME"
echo ""

# Navigate to android directory
cd android

echo "🔨 Building Android App Bundle (AAB)..."
./gradlew bundleRelease

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Build successful!"
    echo ""
    echo "📦 App Bundle location:"
    echo "   app/build/outputs/bundle/release/app-release.aab"
    echo ""
    echo "🚀 Ready for Google Play Store upload!"
    echo ""
    echo "Next steps:"
    echo "1. Upload the AAB file to Google Play Console"
    echo "2. Fill in store listing information"
    echo "3. Set up content rating"
    echo "4. Configure pricing and distribution"
    echo "5. Submit for review"
else
    echo ""
    echo "❌ Build failed! Please check the error messages above."
    exit 1
fi
