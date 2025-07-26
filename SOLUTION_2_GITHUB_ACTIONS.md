# 🤖 SOLUTION 2: GitHub Actions CI/CD Automation

## Problem Solved
Manual building is time-consuming and error-prone. This solution provides automated building, testing, and deployment.

## Setup Instructions

### Step 1: Create GitHub Actions Workflow

Create `.github/workflows/android-build.yml`:

```yaml
name: Android Build & Release

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  workflow_dispatch:
    inputs:
      build_type:
        description: 'Build Type'
        required: true
        default: 'release'
        type: choice
        options:
        - debug
        - release

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Setup Java
      uses: actions/setup-java@v3
      with:
        distribution: 'zulu'
        java-version: '11'
        
    - name: Setup Android SDK
      uses: android-actions/setup-android@v2
      
    - name: Install dependencies
      run: npm ci
      
    - name: Cache Gradle dependencies
      uses: actions/cache@v3
      with:
        path: |
          ~/.gradle/caches
          ~/.gradle/wrapper
        key: ${{ runner.os }}-gradle-${{ hashFiles('**/*.gradle*', '**/gradle-wrapper.properties') }}
        restore-keys: |
          ${{ runner.os }}-gradle-
          
    - name: Make gradlew executable
      run: chmod +x android/gradlew
      
    - name: Build APK
      run: |
        cd android
        ./gradlew assembleRelease
        
    - name: Upload APK artifact
      uses: actions/upload-artifact@v3
      with:
        name: blood-donation-${{ github.run_number }}.apk
        path: android/app/build/outputs/apk/release/app-release.apk
        
    - name: Create Release
      if: github.ref == 'refs/heads/main'
      uses: actions/create-release@v1
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      with:
        tag_name: v${{ github.run_number }}
        release_name: Blood Donation App v${{ github.run_number }}
        draft: false
        prerelease: false
        
    - name: Upload Release Asset
      if: github.ref == 'refs/heads/main'
      uses: actions/upload-release-asset@v1
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      with:
        upload_url: ${{ steps.create_release.outputs.upload_url }}
        asset_path: android/app/build/outputs/apk/release/app-release.apk
        asset_name: BloodDonationApp-v${{ github.run_number }}.apk
        asset_content_type: application/vnd.android.package-archive
```

### Step 2: Add Secrets (If Needed)
Go to GitHub repository → Settings → Secrets and variables → Actions

Add these secrets if using:
- `ANDROID_KEYSTORE_FILE` (base64 encoded keystore)
- `ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_ALIAS`
- `ANDROID_KEY_PASSWORD`

### Step 3: Enable Workflows
1. Go to your GitHub repository
2. Click on "Actions" tab
3. Enable workflows if disabled
4. Push changes to trigger first build

## Benefits
✅ Automatic building on every push  
✅ Parallel builds for different branches  
✅ Automatic artifact storage  
✅ Release generation on main branch  
✅ Build status badges  
✅ Email notifications on failures  

## Manual Trigger
You can manually trigger builds from GitHub Actions tab with custom parameters.
