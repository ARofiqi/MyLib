/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import api from '../axios';
import SearchBar from '../components/SearchBar';
import CardBook from '../components/CardBook';
const {
  createTable,
  insertBooks,
  fetchBooksFromDB,
  closeDatabase,
} = require('../sql');

const colors = {
  primary: '#133E87',
  secondary: '#B59F78',
  white: '#FBFBFB',
  black: '#1A1A1D',
};

const Home = ({navigation}) => {
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    api
      .get('/books')
      .then(response => {
        const booksFromAPI = response.data;
        insertBooks(booksFromAPI);
        fetchBooksFromDB(setBooks);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        fetchBooksFromDB(setBooks);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    createTable();
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Perpustakaan Online</Text>
          <Image
            source={require('../assets/banner.png')}
            style={styles.bannerImage}
          />
          <Text style={styles.headerDescription}>
            Kami menyediakan buku yang dapat dipinjam melalui aplikasi, terdapat
            berbagai jenis buku
          </Text>
        </View>
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={styles.loadingIndicator}
          />
        ) : filteredBooks.length === 0 ? (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>
              Tidak ada buku yang ditemukan
            </Text>
          </View>
        ) : (
          <View style={styles.bookContainer}>
            {filteredBooks.map(item => (
              <View key={item.id} style={styles.gridItem}>
                <CardBook
                  id={item.id || 'N/A'}
                  title={item.title || 'Judul tidak tersedia'}
                  author={item.author || 'Penulis tidak diketahui'}
                  genre={item.genre || 'Genre tidak diketahui'}
                  year={item.year || 'Tahun tidak diketahui'}
                  image={item.image || null}
                  navigation={navigation}
                />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    backgroundColor: colors.white,
    minHeight: '100%',
  },
  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  header: {
    gap: 10,
    paddingVertical: 10,
  },
  headerTitle: {
    color: colors.black,
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerDescription: {
    color: colors.black,
    fontSize: 16,
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  noResultsContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  noResultsText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  gridItem: {
    marginBottom: 15,
  },
});

export default Home;
