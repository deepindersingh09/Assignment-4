import React from 'react';
import { View, Text, Button } from 'react-native';
import { supabase } from '../lib/supabase';

interface Props {
  user: { firstName: string; lastName: string; email: string };
  onLogout: () => void;
}

export default function Landing({ user, onLogout }: Props) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  return (
    <View>
      <Text>Welcome, {user.firstName} {user.lastName}</Text>
      <Text>Email: {user.email}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}