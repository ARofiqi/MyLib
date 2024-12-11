import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import api from '../axios';
import Toast from 'react-native-toast-message';
import BorrowedBookCard from '../components/BorrowedBookCard';

const BorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBorrowedBooks = async () => {
    setLoading(true);
    try {
      const response = await api.get('/borrowedBooks');
      setBorrowedBooks(response.data);
    } catch (error) {
      console.error('Error fetching borrowed books:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchBorrowedBooks();
    }, []),
  );

  const handleReturn = async bookId => {
    try {
      const response = await api.delete(`/borrowedBooks/${bookId}`);
      if (response.status === 200) {
        setBorrowedBooks(borrowedBooks.filter(book => book.id !== bookId));
        Toast.show({
          type: 'success',
          text1: 'Sukses',
          text2: 'Buku berhasil dikembalikan',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Terjadi kesalahan saat mengembalikan buku',
        });
      }
    } catch (error) {
      console.error('Error returning the book:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Terjadi kesalahan saat mengembalikan buku',
      });
    }
  };

  const handleExtendLoan = async (bookId, currentDays) => {
    const extendedDays = currentDays + 7;
    try {
      const response = await api.put(`/borrowedBooks/${bookId}`, {
        additionalDays: 7,
      });
      if (response.status === 200) {
        setBorrowedBooks(
          borrowedBooks.map(book =>
            book.id === bookId ? {...book, borrowedDays: extendedDays} : book,
          ),
        );
        Toast.show({
          type: 'success',
          text1: 'Sukses',
          text2: 'Peminjaman buku diperpanjang selama 7 hari',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Terjadi kesalahan saat memperpanjang buku',
        });
      }
    } catch (error) {
      console.error('Error extending the loan:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Terjadi kesalahan saat memperpanjang buku',
      });
    }
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={styles.loadingIndicator}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buku yang Sedang Dipinjam</Text>

      {borrowedBooks.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyCardText}>
            Tidak ada buku yang sedang dipinjam
          </Text>
        </View>
      ) : (
        <FlatList
          data={borrowedBooks}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <BorrowedBookCard
              book={item}
              onReturn={handleReturn}
              onExtend={handleExtendLoan}
            />
          )}
        />
      )}

      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyCard: {
    padding: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCardText: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
  },
  loadingIndicator: {
    marginTop: 50,
  },
});

export default BorrowedBooks;
