import {
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import api from '../axios';

const colors = {
  primary: '#133E87',
  secondary: '#B59F78',
  white: '#FBFBFB',
  black: '#1A1A1D',
  gray: '#D3D3D3',
};

const DetailBook = ({route, navigation}) => {
  const {id} = route.params;
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = no => {
    api
      .get(`/books/${no}`)
      .then(response => {
        setBook(response.data);
      })
      .catch(err => {
        console.error(err);
        setError('Terjadi kesalahan saat mengambil data buku');
      });
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Kembali</Text>
        </TouchableOpacity>
      </View>

      {book ? (
        <>
          <Image source={{uri: book.image}} style={styles.image} />
          <Text style={styles.title}>{book.title}</Text>

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              <Text style={styles.bold}>Penulis:</Text> {book.author}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.bold}>Genre:</Text> {book.genre}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.bold}>Tahun Terbit:</Text> {book.year}
            </Text>
          </View>

          <Text style={styles.summaryTitle}>Deskripsi:</Text>
          <Text style={styles.summaryText}>{book.summary}</Text>

          <TouchableOpacity style={styles.bookmarkButton}>
            <Text style={styles.bookmarkButtonText}>Bookmark Buku</Text>
          </TouchableOpacity>
        </>
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <Text style={styles.content}>Loading...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: '100%',
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  backButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 10,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: colors.black,
    marginVertical: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  summaryTitle: {
    fontSize: 18,
    color: colors.primary,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  summaryText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.black,
    marginBottom: 20,
  },
  bookmarkButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignSelf: 'center',
  },
  bookmarkButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
  content: {
    color: colors.black,
    fontSize: 16,
    lineHeight: 24,
  },
});

export default DetailBook;
