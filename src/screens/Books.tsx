import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import api from '../axios';
import CardBookAdmin from '../components/CardBookAdmin';

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

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [image, setImage] = useState('');
  const [summary, setSummary] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchBooks = () => {
    api
      .get('/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = () => {
    api
      .post('/books', {title, author, genre, year, image, summary})
      .then(response => {
        setBooks([...books, response.data]);
        setTitle('');
        setAuthor('');
        setGenre('');
        setYear('');
        setImage('');
        setSummary('');
      })
      .catch(error => console.error(error));
  };

  const deleteBook = id => {
    api
      .delete(`/books/${id}`)
      .then(() => setBooks(books.filter(book => book.id !== id)))
      .catch(error => console.error(error));
  };

  const startEdit = book => {
    setEditMode(true);
    setEditId(book.id);
    setTitle(book.title);
    setAuthor(book.author);
    setGenre(book.genre);
    setYear(book.year);
    setImage(book.image);
    setSummary(book.summary);
  };

  const saveEdit = () => {
    api
      .put(`/books/${editId}`, {title, author, genre, year, image, summary})
      .then(response => {
        const updatedBooks = books.map(book =>
          book.id === editId ? response.data : book,
        );
        setBooks(updatedBooks);
        setTitle('');
        setAuthor('');
        setGenre('');
        setYear('');
        setImage('');
        setSummary('');
        setEditMode(false);
        setEditId(null);
      })
      .catch(error => console.error(error));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>📚 Admin Dashboard</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Book Title"
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Author"
          value={author}
          onChangeText={text => setAuthor(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Genre"
          value={genre}
          onChangeText={text => setGenre(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Year"
          keyboardType="numeric"
          value={year}
          onChangeText={text => setYear(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Image URL"
          value={image}
          onChangeText={text => setImage(text)}
        />
        <TextInput
          style={[styles.input, styles.summaryInput]}
          placeholder="Summary"
          multiline
          numberOfLines={4}
          value={summary}
          onChangeText={text => setSummary(text)}
        />
        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: editMode ? colors.primary : colors.primary},
          ]}
          onPress={editMode ? saveEdit : addBook}>
          <Text style={styles.buttonText}>
            {editMode ? '💾 Save Changes' : '+ Add Book'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={books}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <CardBookAdmin item={item} onEdit={startEdit} onDelete={deleteBook} />
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgApp,
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: colors.primary,
  },
  formContainer: {
    backgroundColor: colors.background,
    padding: 20,
    borderRadius: 10,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.input,
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
  summaryInput: {
    height: 100,
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
    marginLeft: 10,
  },
});

export default BookList;
