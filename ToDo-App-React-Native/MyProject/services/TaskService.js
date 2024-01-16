import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_STORAGE_KEY = 'tasks';

const getTasks = async () => {
  try {
    const tasksJSON = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
    return tasksJSON ? JSON.parse(tasksJSON) : [];
  } catch (error) {
    console.error('Error getting tasks from AsyncStorage:', error);
    return [];
  }
};

const saveTasks = async (tasks) => {
  try {
    await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to AsyncStorage:', error);
  }
};

export { getTasks, saveTasks };
