import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';


export default function App() {
  const db = SQLite.openDatabaseSync('@/assets/database/BDD.db');
  const [isloading, setIsLoading] = useState(true);
  const [names, setNames] = useState([]);
  const [currentname, setCurrentName] = useState(undefined);

  // Affiche un message de chargement
  if(isloading) {
    return (
      <view style={styles.container}>
        <Text>Chargement...</Text>
      </view>

    );
  }

  return (
    <View style={styles.container}>
      <TextInput value={currentname} placeholder='Nom' onChangeText={setCurrentName} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
