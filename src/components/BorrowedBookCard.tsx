import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

const BorrowedBookCard = ({book, onReturn, onExtend}) => {
  return (
    <View style={styles.bookItem}>
      <Image source={{uri: book.image}} style={styles.bookImage} />
      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{book.title}</Text>
        <Text style={styles.bookAuthor}>Penulis: {book.author}</Text>
        <Text style={styles.borrowedAt}>
          Dipinjam pada: {new Date(book.borrowedAt).toLocaleDateString()}
        </Text>
        <Text style={styles.borrowedDays}>
          Durasi Peminjaman: {book.borrowedDays} hari
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.returnButton}
            onPress={() => onReturn(book.id)}>
            <Text style={styles.returnButtonText}>Kembalikan Buku</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.extendButton}
            onPress={() => onExtend(book.id, book.borrowedDays)}>
            <Text style={styles.extendButtonText}>Perpanjang Peminjaman</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  bookImage: {
    width: 80,
    height: 120,
    borderRadius: 5,
    marginRight: 15,
  },
  bookDetails: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  borrowedAt: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  borrowedDays: {
    fontSize: 12,
    color: '#888',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  returnButton: {
    backgroundColor: '#D32F2F',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  returnButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  extendButton: {
    backgroundColor: '#FF9800',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
  },
  extendButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default BorrowedBookCard;
