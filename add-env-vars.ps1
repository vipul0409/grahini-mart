# Add all environment variables to Vercel
Write-Host "Adding environment variables to Vercel..." -ForegroundColor Yellow

# Firebase variables
echo "grahini-mart.firebaseapp.com" | vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN production
echo "grahini-mart" | vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID production
echo "grahini-mart.firebasestorage.app" | vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET production
echo "1065580782606" | vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID production
echo "1:1065580782606:web:cd33386748c60129ab085f" | vercel env add NEXT_PUBLIC_FIREBASE_APP_ID production

# Admin variables
echo "Pranjal" | vercel env add NEXT_PUBLIC_ADMIN_USERNAME production
echo "Saksham@#2029#456789" | vercel env add NEXT_PUBLIC_ADMIN_PASSWORD production

# App variables
echo "918989475895" | vercel env add NEXT_PUBLIC_WHATSAPP_NUMBER production
echo "grahinimart7@gmail.com" | vercel env add ADMIN_EMAIL production

Write-Host "Done! Now run: vercel --prod" -ForegroundColor Green
