import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

import { initDatabase } from '../../assets/database/database'; // Chemin vers ton fichier database.ts
import TaskScreen from './task'; // Ton écran principal des tâches

export default function HomeScreen() {
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        await initDatabase(); // Initialise la base de données
        setDbReady(true); // Marque la base comme prête
      } catch (error) {
        console.error("Erreur lors de l'initialisation de la base :", error);
      }
    };

    initializeDatabase();
  }, []);

  if (!dbReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Chargement de la base de données...</Text>
      </View>
    );
  }

  return <TaskScreen />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});
