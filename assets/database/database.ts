import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset'; // Utilisé pour charger des assets

const dbFilePath = `${FileSystem.documentDirectory}SQLite/tasks.db`;

// Fonction pour vérifier si le fichier de la base de données existe, et le copier depuis les assets si nécessaire
const copyDatabaseFile = async () => {
  const dbAsset = Asset.fromModule(require('@/assets/database/database')); // Le chemin vers ton fichier d'asset de base de données

  try {
    // Vérifier si la base de données existe déjà dans le répertoire cible
    const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
    if (!fileInfo.exists) {
      console.log('Copie du fichier de base de données...');
      await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`, { intermediates: true });
      await FileSystem.downloadAsync(dbAsset.uri, dbFilePath);
      console.log('Base de données copiée avec succès.');
    } else {
      console.log('Le fichier de base de données existe déjà.');
    }
  } catch (error) {
    console.error('Erreur lors de la copie de la base de données :', error);
  }
};

// Fonction pour initialiser la base de données SQLite
export const initDatabase = async () => {
  await copyDatabaseFile(); // Copie la base de données si nécessaire

  const db = SQLite.openDatabase('@/assets/database/database'); // Ouvre la base de données
  console.log('Base de données initialisée.');

  return db;
};

// Fonction pour créer les tables dans la base de données
export const createTables = async (db: SQLite.WebSQLDatabase) => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        completed INTEGER NOT NULL DEFAULT 0
      );`,
      [],
      (_, result) => {
        console.log('Table "tasks" créée avec succès.');
      },
      (_, error) => {
        console.error('Erreur lors de la création de la table :', error);
        return false;
      }
    );
  });
};

// Fonction pour insérer une tâche dans la base de données
export const insertTask = async (db: SQLite.WebSQLDatabase, taskName: string) => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO tasks (name) VALUES (?);',
      [taskName],
      (_, result) => {
        console.log('Tâche ajoutée avec succès.');
      },
      (_, error) => {
        console.error('Erreur lors de l\'insertion de la tâche :', error);
        return false;
      }
    );
  });
};

// Fonction pour récupérer toutes les tâches
export const getAllTasks = async (db: SQLite.WebSQLDatabase): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM tasks;',
        [],
        (_, result) => {
          resolve(result.rows._array); // Retourner les résultats sous forme de tableau
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

// Fonction pour marquer une tâche comme terminée
export const completeTask = async (db: SQLite.WebSQLDatabase, taskId: number) => {
  db.transaction((tx) => {
    tx.executeSql(
      'UPDATE tasks SET completed = 1 WHERE id = ?;',
      [taskId],
      (_, result) => {
        console.log('Tâche terminée avec succès.');
      },
      (_, error) => {
        console.error('Erreur lors de la mise à jour de la tâche :', error);
        return false;
      }
    );
  });
};

// Fonction pour supprimer une tâche
export const deleteTask = async (db: SQLite.WebSQLDatabase, taskId: number) => {
  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM tasks WHERE id = ?;',
      [taskId],
      (_, result) => {
        console.log('Tâche supprimée avec succès.');
      },
      (_, error) => {
        console.error('Erreur lors de la suppression de la tâche :', error);
        return false;
      }
    );
  });
};
