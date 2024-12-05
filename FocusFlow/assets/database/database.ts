import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('tasks.db'); // Ouvre ou crée une base de données

export const initializeDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT);',
      [],
      () => {
        console.log('Table "tasks" créée avec succès.');
      },
      (_, error) => {
        console.error('Erreur lors de la création de la table', error);
        return false;
      }
    );
  });
};

// Fonction pour ajouter une tâche
export const addTask = (task: string) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO tasks (task) VALUES (?);',
      [task],
      () => {
        console.log('Tâche ajoutée avec succès');
      },
      (_, error) => {
        console.error('Erreur lors de l\'ajout de la tâche', error);
        return false;
      }
    );
  });
};

// Fonction pour récupérer toutes les tâches
export const getTasks = (callback: (tasks: any[]) => void) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM tasks;',
      [],
      (_, { rows }) => {
        callback(rows._array); // Retourne toutes les lignes sous forme de tableau
      },
      (_, error) => {
        console.error('Erreur lors de la récupération des tâches', error);
        return false;
      }
    );
  });
};
