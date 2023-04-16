// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDY022VB5qXYKr3joSG0xVY6YRb8vGpssI',
  authDomain: 'assistance-26510.firebaseapp.com',
  projectId: 'assistance-26510',
  storageBucket: 'assistance-26510.appspot.com',
  messagingSenderId: '79926418470',
  appId: '1:79926418470:web:35f72c077440b53a85dae7',
  measurementId: 'G-HL2ZJ06DB7',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
