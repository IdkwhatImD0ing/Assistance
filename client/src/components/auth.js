import {useEffect, useState} from 'react'
import {onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../../firebase'

export function logIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

export function useAuthUser() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    return onAuthStateChanged(auth, setUser)
  }, [])

  return user
}
