# Building the PINORA APK

The app is 100% offline. No Gemini/API key or `.env` file is needed.

## Option A: Android Studio
1. Unzip the project, run `npm install` then `npm run android:sync`.
2. In Android Studio choose **Open** and select the `android` folder. Wait for Gradle sync.
3. **Build > Build Bundle(s) / APK(s) > Build APK(s)**. The file is `android/app/build/outputs/apk/debug/app-debug.apk`.
4. For Play Store: **Build > Generate Signed Bundle / APK**.

## Option B: GitHub (no Android Studio)
Push this folder to a GitHub repo. Open **Actions > Build PINORA APK** and download `pinora-debug-apk` when it finishes.

## After editing `src/`
    npm run android:sync
