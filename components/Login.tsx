import { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
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

    if (error) return Alert.alert('Login failed', error.message);

    const { user } = data;
    if (!user) return;

    const { data: details, error: fetchError } = await supabase
      .from('user_details')
      .select('*')
      .eq('uuid', user.id)
      .single();

    if (fetchError || !details) {
      Alert.alert('User Info Error', fetchError?.message || 'User not found');
    } else {
      onLoginSuccess({
        firstName: details.first_name,
        lastName: details.last_name,
        email: details.email,
      });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.link} onPress={onSignupClick}>Don’t have an account? Sign up</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 10 },
  link: { marginTop: 15, color: 'blue', textAlign: 'center' }
});
