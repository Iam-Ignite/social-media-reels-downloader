import {  Stack } from 'expo-router';
// import 'expo-dev-client';

import React from 'react';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */


export default function TabLayout() {

  return (
     <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="facebook" options={{ headerShown: false }} />
        <Stack.Screen name="media" options={{ headerShown: false }} />
        <Stack.Screen name="tiktok" options={{ headerShown: false }} />
        <Stack.Screen name="yt" options={{ headerShown: false }} />
      </Stack>
  );
}
