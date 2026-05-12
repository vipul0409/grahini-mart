// Mock Firebase for development without real credentials
// This allows the app to run with dummy data

export const mockAuth = {
  currentUser: null,
  onAuthStateChanged: (callback: any) => {
    callback(null)
    return () => {}
  },
  signInWithEmailAndPassword: async (email: string, password: string) => {
    console.log('Mock login:', email)
    return { user: { uid: 'mock-user-id', email } }
  },
  createUserWithEmailAndPassword: async (email: string, password: string) => {
    console.log('Mock signup:', email)
    return { user: { uid: 'mock-user-id', email } }
  },
  signOut: async () => {
    console.log('Mock logout')
  },
}

export const mockDb = {
  collection: (name: string) => ({
    doc: (id: string) => ({
      get: async () => ({
        exists: () => false,
        data: () => null,
      }),
      set: async (data: any) => {
        console.log(`Mock set ${name}/${id}:`, data)
      },
      update: async (data: any) => {
        console.log(`Mock update ${name}/${id}:`, data)
      },
    }),
    where: () => ({
      get: async () => ({
        docs: [],
      }),
    }),
    get: async () => ({
      docs: [],
    }),
    add: async (data: any) => {
      console.log(`Mock add to ${name}:`, data)
      return { id: 'mock-doc-id' }
    },
  }),
}

export const mockStorage = {
  ref: (path: string) => ({
    put: async (file: any) => {
      console.log('Mock upload:', path)
      return {
        ref: {
          getDownloadURL: async () => 'https://via.placeholder.com/400',
        },
      }
    },
  }),
}

// Check if we're using dummy credentials
export const isDummyMode = () => {
  return process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.includes('Dummy')
}
