import React from 'react';
import { Stack } from 'expo-router';

export default function ZTypeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Z-Type',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
