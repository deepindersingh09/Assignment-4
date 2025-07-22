import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { supabase } from '../lib/supabase';

interface Props {
  onSignupClick: () => void;
  onLoginSuccess: (user: { firstName: string; lastName: string; email: string }) => void;
}

export default function Login({ onSignupClick, onLoginSuccess }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return Alert.alert('Login Failed', error.message);

    const user = data.user;
    const { data: userDetails, error: fetchError } = await supabase
      .from('user_details')
      .select('*')
      .eq('uuid', user?.id)
      .single();

    if (fetchError || !userDetails) {
      Alert.alert('Failed to fetch user details', fetchError?.message || 'Not found');
      return;
    }

    onLoginSuccess({
      firstName: userDetails.first_name,
      lastName: userDetails.last_name,
      email: userDetails.email
    });
  };

  return (
    <View>
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <Text onPress={onSignupClick}>Don’t have an account? Sign up</Text>
    </View>
  );
}
