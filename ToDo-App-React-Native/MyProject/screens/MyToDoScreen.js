import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import ListingTasks from '../components/ListingTasks';
import { getTasks, saveTasks } from '../services/TaskService';

const MyToDoScreen = () => {

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

   // Function to load tasks from storage 
  const loadTasks = async () => {
    try {
      const loadedTasks = await getTasks();
      setTasks(loadedTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const handleAddTask = () => {
    // if the newTask is an empty string, exit the function
    if (newTask.trim() === '') return; 

    // creates a newTaskItem with unique id, a title (input of task) and incompleted status
    const newTaskItem = {
      id: Date.now(),
      title: newTask,
      completed: false,
    };

    const updatedTasks = [...tasks, newTaskItem];
    setTasks(updatedTasks);

    try {
      saveTasks(updatedTasks);
    } catch (error) {
      console.error('Error saving tasks:', error);
    }

    setNewTask('');
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);

    try {
      saveTasks(updatedTasks);
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setModalVisible(true);
  };

  const handleSaveEdit = () => {
    if (!editingTask || editingTask.title.trim() === '') return;

    // if task.id is not the same as editingTask.id, then modify, other tasks stays the same, only editingTask.title is changing
    const updatedTasks = tasks.map((task) =>
      task.id === editingTask.id ? { ...task, title: editingTask.title } : task
    );

    setTasks(updatedTasks);

    try {
      saveTasks(updatedTasks);
    } catch (error) {
      console.error('Error saving tasks:', error);
    }

    setModalVisible(false);
    setEditingTask(null);
  };

  const handleCompleteTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    setTasks(updatedTasks);

    try {
      saveTasks(updatedTasks);
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>My ToDos</Text>
      </View>

      <View style={styles.contentContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Task..."
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
        />

        <View style={styles.addButtonContainer}>
          <Button
            title="Add Task"
            onPress={handleAddTask}
            color="black" 
            style={styles.addButtonText} 
          />
        </View>

        <ListingTasks
          tasks={tasks}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
          onComplete={handleCompleteTask}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            setModalVisible(!isModalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.modalInput}
                placeholder="Edit Task"
                value={editingTask ? editingTask.title : ''}
                onChangeText={(text) =>
                  setEditingTask((prevTask) => ({
                    ...prevTask,
                    title: text,
                  }))
                }
              />

              <View style={styles.saveButtonContainer}>
                <Button
                  title="Save"
                  onPress={handleSaveEdit}
                  color="black" 
                  style={styles.saveButtonText} 
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9EFDB",
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 48,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  addButtonContainer: {
    backgroundColor: '#638889',
    borderRadius: 5,
    marginBottom: 8,
  },
  addButtonText: {
    color: 'black', 
    fontWeight: 'bold', 
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#EBD9B4',
    padding: 16,
    borderRadius: 8,
    elevation: 5,
  },
  modalInput: {
    backgroundColor: 'white',
    height: 40,
    width: 250,
    borderWidth: 1.5,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  saveButtonContainer: {
    backgroundColor: '#9DBC98', 
    borderRadius: 5,
    padding: 5,
    marginVertical: 8,
  },
  saveButtonText: {
    color: 'black', 
    fontWeight: 'bold', 
  },
});

export default MyToDoScreen;
