import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfigJson from '../../firebase-applet-config.json';

// Use provisioned config or fallback to environment variables
const firebaseConfig = firebaseConfigJson && firebaseConfigJson.apiKey ? firebaseConfigJson : {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA4xR7rsdSw6-Dv4gy11Y3XnJ0BUQtFM6Y",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "bionic-bebop-t8gvj.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "bionic-bebop-t8gvj",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "bionic-bebop-t8gvj.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "640261110206",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:640261110206:web:4f9d06c956934fe38f61ef",
  firestoreDatabaseId: firebaseConfigJson?.firestoreDatabaseId || "ai-studio-28d6c28d-288e-42e9-aa74-b72d32fad691"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// CRITICAL: Initialize firestore with database ID from config
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || 'default');
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}

// Invoke connection test on startup
testConnection().catch(() => {});
