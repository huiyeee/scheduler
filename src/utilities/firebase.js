import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useEffect, useState } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyBE-OCe-kQYEZmZUoTirLx_cXoZM8AfHjA",
  authDomain: "scheduler-6defg.firebaseapp.com",
  databaseURL: "https://scheduler-6defg-default-rtdb.firebaseio.com",
  projectId: "scheduler-6defg",
  storageBucket: "scheduler-6defg.appspot.com",
  messagingSenderId: "589739567965",
  appId: "1:589739567965:web:1b580b51cdb26f1eb816b4"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
};