import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
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

    if (error) {
      Alert.alert('Sign Up Failed', error.message);
      return;
    }

    const user = data.user;
    if (!user) return;

    const { error: insertError } = await supabase.from('user_details').insert([
      {
        uuid: user.id,
        first_name: firstName,
        last_name: lastName,
        email: user.email
      }
    ]);

    if (insertError) {
      Alert.alert('Insert Failed', insertError.message);
    } else {
      onLoginSuccess({ firstName, lastName, email });
    }
  };

  return (
    <View>
      <TextInput placeholder="First Name" onChangeText={setFirstName} value={firstName} />
      <TextInput placeholder="Last Name" onChangeText={setLastName} value={lastName} />
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry />
      <Button title="Sign Up" onPress={handleSignup} />
      <Text onPress={onBackToLogin}>Already have an account? Login</Text>
    </View>
  );
}
