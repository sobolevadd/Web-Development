import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import trashIcon from '../assets/trashIcon.png';
import editIcon from '../assets/editIcon.png';

const ListingTasks = ({ tasks, onDelete, onEdit, onComplete }) => {
  return (
    <View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity onPress={() => onComplete(item.id)}>
              <View style={styles.checkbox}>
                {/* When item.completed is true, then make checkmark */}
                {item.completed && <View style={styles.checkmark} />}
              </View>
            </TouchableOpacity>

            {/* When item.completed is true, then style 'line-through' */}
            <Text style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }}>
              {item.title}
            </Text>

            <View style={styles.iconsContainer}>
              <TouchableOpacity onPress={() => onEdit(item)}>
                <Image source={editIcon} style={styles.icon} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => onDelete(item.id)}>
                <Image source={trashIcon} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

// Styles 
const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    width: 14,
    height: 14,
    backgroundColor: 'black',
    borderRadius: 2,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 10, 
  },
});

export default ListingTasks;
