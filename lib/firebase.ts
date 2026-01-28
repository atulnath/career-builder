import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAwqGRg98HVfVJUi5yjT_4Q3r2yO8avV5Y",
    authDomain: "cvbuilder-bc842.firebaseapp.com",
    projectId: "cvbuilder-bc842",
    storageBucket: "cvbuilder-bc842.firebasestorage.app",
    messagingSenderId: "532571159124",
    appId: "1:532571159124:web:5e036e5c8893dcdcec8bc1",
    measurementId: "G-1469T11CNG"
};

// Initialize Firebase using the SSR-safe singleton pattern
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
