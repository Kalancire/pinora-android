# PINORA (Android, fully offline)

Offline-first language learning app (Botolan Sambal, Cebuano, Ilocano). No API keys, no backend, no network needed at runtime: the React app is bundled inside the APK via Capacitor.

## Build the APK
See ANDROID_STUDIO_GUIDE.md (Android Studio) or push to GitHub and download the APK from the Actions tab (.github/workflows/android.yml).

## Dev
    npm install
    npm run dev          # browser
    npm run android:sync # rebuild web + copy into android/
