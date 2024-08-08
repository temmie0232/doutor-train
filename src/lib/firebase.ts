import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { Card as StudyCard } from '@/lib/spaced-repetition/types';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

export const saveQuizResult = async (userId: string, productName: string, score: number, totalQuestions: number) => {
    const quizResultRef = doc(db, 'users', userId, 'quizResults', productName);
    await setDoc(quizResultRef, {
        score,
        totalQuestions,
        lastAttemptDate: new Date()
    });
};

export const getQuizResults = async (userId: string) => {
    const quizResultsRef = collection(db, 'users', userId, 'quizResults');
    const snapshot = await getDocs(quizResultsRef);
    const results: { [key: string]: { score: number; totalQuestions: number; lastAttemptDate: Date } } = {};
    snapshot.forEach((doc) => {
        const data = doc.data();
        results[doc.id] = {
            score: data.score,
            totalQuestions: data.totalQuestions,
            lastAttemptDate: data.lastAttemptDate.toDate() // Firestore Timestamp を Date オブジェクトに変換
        };
    });
    return results;
};

export const saveUserName = async (userId: string, name: string) => {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, { name }, { merge: true });
};

export const getUserName = async (userId: string): Promise<string | null> => {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
        return userDoc.data().name || null;
    }
    return null;
};


export const saveStudyCardProgress = async (userId: string, card: StudyCard) => {
    const cardRef = doc(db, 'users', userId, 'studyCards', card.id);
    await setDoc(cardRef, {
        ...card,
        nextReviewDate: Timestamp.fromDate(card.nextReviewDate),
        lastReviewDate: Timestamp.fromDate(card.lastReviewDate)
    }, { merge: true });
};

export const getStudyCards = async (userId: string): Promise<StudyCard[]> => {
    const studyCardsRef = collection(db, 'users', userId, 'studyCards');
    const snapshot = await getDocs(studyCardsRef);
    return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            ...data,
            nextReviewDate: data.nextReviewDate.toDate(),
            lastReviewDate: data.lastReviewDate.toDate()
        } as StudyCard;
    });
};

export const updateStudySession = async (userId: string, sessionData: any) => {
    const sessionRef = doc(db, 'users', userId, 'studySession', 'current');
    await setDoc(sessionRef, {
        ...sessionData,
        lastUpdated: Timestamp.now()
    }, { merge: true });
};

export const getStudySession = async (userId: string) => {
    const sessionRef = doc(db, 'users', userId, 'studySession', 'current');
    const snapshot = await getDoc(sessionRef);
    if (snapshot.exists()) {
        const data = snapshot.data();
        return {
            ...data,
            lastUpdated: data.lastUpdated.toDate()
        };
    }
    return null;
};