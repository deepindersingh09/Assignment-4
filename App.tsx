import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Login from './components/Login';
import Signup from './components/Signup';
import Landing from './components/Landing';

export default function App() {
  const [isSignup, setIsSignup] = useState(false);
  const [user, setUser] = useState<{ firstName: string; lastName: string; email: string } | null>(null);

  return (
    <View style={styles.container}>
      {user ? (
        <Landing user={user} onLogout={() => setUser(null)} />
      ) : isSignup ? (
        <Signup onBackToLogin={() => setIsSignup(false)} onLoginSuccess={setUser} />
      ) : (
        <Login onSignupClick={() => setIsSignup(true)} onLoginSuccess={setUser} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 }
});
