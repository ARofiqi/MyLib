import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import api from '../axios';

const BorrowBook = ({route, navigation}) => {
  const {id, title, author, genre, year, image} = route.params;

  const [nim, setNim] = useState('');
  const [days] = useState('7');
  const [isAlreadyBorrowed, setIsAlreadyBorrowed] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkIfBorrowed = async no => {
    setLoading(true);
    try {
      const response = await api.get(`/borrowedBooks/${no}`);
      if (response.status === 200) {
        setIsAlreadyBorrowed(true);
      }
    } catch (error) {
      if (error.response && error.response.status !== 404) {
        Alert.alert(
          'Error',
          'Terjadi kesalahan saat memeriksa status peminjaman buku',
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkIfBorrowed(id);
  }, [id]);

  const handleBorrow = async () => {
    if (!nim) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    const daysInt = parseInt(days);
    setLoading(true);

    try {
      const response = await api.post(`/borrowedBooks/${id}`, {
        borrowedDays: daysInt,
        userNIM: nim,
      });

      if (response.status === 201) {
        setIsConfirmed(true);
        Alert.alert('Success', `Buku "${title}" berhasil dipinjam!`);
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Terjadi kesalahan saat meminjam buku');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Terjadi kesalahan, coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Form Peminjaman Buku</Text>
      <Image source={{uri: image}} style={styles.image} />
      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>Buku: {title}</Text>
        <Text style={styles.bookAuthor}>Penulis: {author}</Text>
        <Text style={styles.bookGenre}>Genre: {genre}</Text>
        <Text style={styles.bookYear}>Tahun: {year}</Text>
      </View>

      {isAlreadyBorrowed ? (
        <View style={styles.card}>
          <Text style={styles.cardText}>Buku ini sudah dipinjam.</Text>
        </View>
      ) : (
        <>
          <Text style={styles.formTitle}>Form Peminjaman</Text>

          <TextInput
            style={styles.input}
            placeholder="NIM Peminjam"
            value={nim}
            onChangeText={setNim}
            keyboardType="numeric"
          />

          <Text style={styles.formLabel}>Buku dipinjam selama {days} Hari</Text>

          <TouchableOpacity onPress={handleBorrow} style={styles.borrowButton}>
            <Text style={styles.buttonText}>Pinjam Buku</Text>
          </TouchableOpacity>
        </>
      )}

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {isConfirmed && (
        <View style={styles.confirmationContainer}>
          <Text style={styles.confirmationText}>Peminjaman Buku Berhasil!</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.confirmationText}>Kembali ke Beranda</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  image: {
    width: 120,
    height: 160,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bookDetails: {
    marginBottom: 20,
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bookAuthor: {
    fontSize: 16,
    color: '#333',
  },
  bookGenre: {
    fontSize: 16,
    color: '#333',
  },
  bookYear: {
    fontSize: 16,
    color: '#333',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
  },
  borrowButton: {
    backgroundColor: '#2D7F2B',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  confirmationContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  confirmationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#FFDDC1',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#FF9E80',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D32F2F',
    textAlign: 'center',
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default BorrowBook;
