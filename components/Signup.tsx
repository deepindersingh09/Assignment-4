import { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { supabase } from '../lib/supabase';

interface Props {
  onBackToLogin: () => void;
  onLoginSuccess: (user: { firstName: string; lastName: string; email: string }) => void;
}

export default function Signup({ onBackToLogin, onLoginSuccess }: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) return Alert.alert('Signup failed', error.message);
    const user = data.user;
    if (!user) return;

    console.log("Insert payload:", {
  uuid: user.id,
  first_name: firstName,
  last_name: lastName,
  email: user.email
});

    const { error: insertError } = await supabase.from('user_details').insert([
      {
        uuid: user.id,
        first_name: firstName,
        last_name: lastName,
        email: user.email,
      },
    ]);

    if (insertError) return Alert.alert('Insert failed', insertError.message);

    onLoginSuccess({ firstName, lastName, email });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <Button title="Sign Up" onPress={handleSignup} />

      <Text style={styles.switchText} onPress={onBackToLogin}>
        Already have an account? <Text style={styles.link}>Login</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',     // center vertically
    alignItems: 'center',         // center horizontally
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  switchText: {
    marginTop: 20,
    fontSize: 14,
    color: '#333',
  },
  link: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});
