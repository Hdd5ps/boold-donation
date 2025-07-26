#!/bin/bash

# Optimized Android APK Build Script
# This script tries multiple optimization strategies to build the APK

echo "🚀 Starting optimized Android APK build..."

# Set memory optimization environment variables
export GRADLE_OPTS="-Xmx3500m -XX:MaxMetaspaceSize=768m -XX:+UseG1GC -XX:+UseStringDeduplication"
export _JAVA_OPTIONS="-Xmx3500m"

cd android

echo "📋 Current memory status:"
free -h

echo "🧹 Cleaning previous builds..."
./gradlew clean --no-daemon --no-parallel

echo "🔧 Building APK with memory optimizations..."
./gradlew assembleRelease \
  --no-daemon \
  --no-parallel \
  --max-workers=1 \
  --no-build-cache \
  --gradle-user-home=/tmp/gradle-cache \
  -Dorg.gradle.jvmargs="-Xmx3500m -XX:MaxMetaspaceSize=768m -XX:+UseG1GC" \
  -Dfile.encoding=UTF-8 \
  --info

if [ $? -eq 0 ]; then
    echo "✅ APK build successful!"
    echo "📱 APK location: android/app/build/outputs/apk/release/"
    ls -la app/build/outputs/apk/release/
else
    echo "❌ APK build failed. Trying fallback options..."
    
    echo "🔄 Attempt 2: Minimal memory build..."
    ./gradlew assembleDebug \
      --no-daemon \
      --no-parallel \
      --max-workers=1 \
      -Dorg.gradle.jvmargs="-Xmx2048m -XX:MaxMetaspaceSize=512m"
fi
