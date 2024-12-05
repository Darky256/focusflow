import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { initDatabase, createTables, insertTask, getAllTasks, completeTask, deleteTask } from "../../assets/database/database"; // Importer les fonctions de la base

export default function TaskScreen() {
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState([]);

  // Initialiser la base de données et charger les tâches
  useEffect(() => {
    const initializeDB = async () => {
      const db = await initDatabase();
      await createTables(db);
      const tasksFromDb = await getAllTasks(db);
      setTasks(tasksFromDb);
    };
    initializeDB();
  }, []);

  const handleAddTask = async () => {
    if (taskName.trim()) {
      const db = await initDatabase();
      await insertTask(db, taskName);
      const tasksFromDb = await getAllTasks(db);
      setTasks(tasksFromDb);
      setTaskName(""); // Réinitialiser le champ de saisie
    }
  };

  const handleCompleteTask = async (taskId: number) => {
    const db = await initDatabase();
    await completeTask(db, taskId);
    const tasksFromDb = await getAllTasks(db);
    setTasks(tasksFromDb);
  };

  const handleDeleteTask = async (taskId: number) => {
    const db = await initDatabase();
    await deleteTask(db, taskId);
    const tasksFromDb = await getAllTasks(db);
    setTasks(tasksFromDb);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a new task"
        value={taskName}
        onChangeText={setTaskName}
      />
      <TouchableOpacity onPress={handleAddTask} style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <View style={styles.taskList}>
        {tasks.map((task) => (
          <View key={task.id} style={styles.taskItem}>
            <Text style={task.completed ? styles.completedTask : styles.taskText}>{task.name}</Text>
            <TouchableOpacity onPress={() => handleCompleteTask(task.id)} style={styles.completeButton}>
              <Text style={styles.buttonText}>✔</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteTask(task.id)} style={styles.deleteButton}>
              <Text style={styles.buttonText}>❌</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  input: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "white",
    fontSize: 20,
  },
  taskList: {
    marginTop: 10,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
  },
  completedTask: {
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "#aaa",
  },
  completeButton: {
    padding: 5,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
  },
  deleteButton: {
    padding: 5,
    backgroundColor: "#F44336",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
});
