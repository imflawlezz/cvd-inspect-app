#!/bin/bash

echo "🔨 Rebuilding iOS project..."

echo "📦 Step 1: Building web assets..."
npm run build

echo "🔄 Step 2: Syncing with Capacitor..."
npx cap sync ios

echo "📱 Step 3: Installing CocoaPods dependencies..."
cd ios/App
pod install

echo "✅ iOS project rebuilt successfully!"
echo "📂 Open the workspace (not the project):"
echo "   open App.xcworkspace"

