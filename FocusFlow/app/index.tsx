import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { initializeDatabase, addTask, getTasks } from '@/assets/database/database';

export default function App() {
  const [tasks, setTasks] = useState<string[]>([]);

  useEffect(() => {
    // Initialisation de la base de données au lancement de l'application
    initializeDatabase();
    loadTasks();
  }, []);

  const loadTasks = () => {
    getTasks((fetchedTasks) => {
      setTasks(fetchedTasks.map(task => task.task));
    });
  };

  const handleAddTask = () => {
    const newTask = `Tâche ajoutée à ${new Date().toLocaleTimeString()}`;
    addTask(newTask); // Ajoute une nouvelle tâche dans la base
    loadTasks(); // Recharge les tâches après ajout
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habit Tracker</Text>
      <View>
        {tasks.map((task, index) => (
          <Text key={index}>{task}</Text>
        ))}
      </View>
      <Button title="Ajouter une tâche" onPress={handleAddTask} />
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
