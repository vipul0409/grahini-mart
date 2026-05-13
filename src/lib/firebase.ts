import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getStorage, FirebaseStorage } from 'firebase/storage'
import { isDummyMode, mockAuth, mockDb, mockStorage } from './firebase-mock'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Check if using dummy credentials or if we're in build time
const useMockMode = isDummyMode() || typeof window === 'undefined'

if (useMockMode && typeof window !== 'undefined') {
  console.log('🔧 Running in MOCK MODE with dummy Firebase credentials')
  console.log('📝 To use real Firebase, update credentials in .env.local')
}

// Initialize Firebase or use mocks
let app: FirebaseApp | null = null
let auth: any
let db: any
let storage: any

if (useMockMode) {
  // Use mock implementations
  auth = mockAuth as any
  db = mockDb as any
  storage = mockStorage as any
} else {
  // Use real Firebase
  if (!getApps().length) {
    app = initializeApp(firebaseConfig)
  } else {
    app = getApps()[0]
  }
  auth = getAuth(app)
  db = getFirestore(app)
  storage = getStorage(app)
}

export { auth, db, storage }
export default app
