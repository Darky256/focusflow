import { Stack } from "expo-router";

export default function RootLayout() {
  return 
  <Stack>
    <Stack.Screen name="index" options={{title: 'Home'}}/>
    <Stack.Screen name="history" options={{title: 'History'}}/>
    <Stack.Screen name="settings" options={{title: 'Settings'}}/>
  </Stack>;
}
