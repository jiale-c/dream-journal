import React, { useContext, useState, useEffect } from "react";
import { auth, projectFirestore } from "../../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      return projectFirestore
        .collection("users")
        .doc(cred.user.uid)
        .set({
          dreams: [
            {
              id: 0,
              text: "Sample diary",
              details: "Delete this to start journalling!",
              day: "Feb 5th at 2:30pm",
              reminder: false,
            },
          ],
        });
    });
  }

  // login 
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  // logout
  function logout() {
    return auth.signOut();
  }

  // reset password
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  // update email address
  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  // update password
  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
