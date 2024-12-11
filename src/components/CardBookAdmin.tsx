import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

const colors = {
  bgApp: '#f4f5f7',
  primary: '#4A90E2',
  danger: '#FF2C2C',
  background: '#fff',
  shadow: '#000',
  textPrimary: '#555',
  border: '#ccc',
  input: '#fff',
  buttonText: '#fff',
  sidebar: '#333',
  cardShadow: 'rgba(0, 0, 0, 0.1)',
};

const CardBookAdmin = ({item, onEdit, onDelete}) => {
  return (
    <View style={styles.card}>
      <Image source={{uri: item.image}} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.author}>By: {item.author}</Text>
      <Text style={styles.genre}>Genre: {item.genre}</Text>
      <Text style={styles.year}>Year: {item.year}</Text>
      <ScrollView style={styles.summaryContainer}>
        <Text style={styles.summary}>Summary: {item.summary}</Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: colors.primary}]}
          onPress={() => onEdit(item)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: colors.danger}]}
          onPress={() => onDelete(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    padding: 20,
    marginVertical: 10,
    borderRadius: 12,
    shadowColor: colors.cardShadow,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 130,
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: colors.textPrimary,
  },
  author: {
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 5,
  },
  genre: {
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 5,
  },
  year: {
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 15,
  },
  summaryContainer: {
    maxHeight: 100,
    marginBottom: 15,
  },
  summary: {
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 5,
    textAlign: 'justify',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.buttonText,
    fontWeight: 'bold',
  },
});

export default CardBookAdmin;
