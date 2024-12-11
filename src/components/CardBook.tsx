import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

const colors = {
  primary: '#133E87',
  white: '#FBFBFB',
  black: '#1A1A1D',
};

const CardBook = ({id, title, author, genre, year, image, navigation}) => (
  <View style={styles.card}>
    <Image source={{uri: image}} style={styles.image} />
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Penulis : {author}</Text>
        <Text style={styles.infoText}>Genre : {genre}</Text>
        <Text style={styles.infoText}>Tahun : {year}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Detail', {id})}
          style={styles.button}>
          <Text style={styles.buttonText}>Lihat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('BorrowBook', {
              id,
              title,
              author,
              genre,
              year,
              image,
            })
          }
          style={[styles.button, styles.borrowButton]}>
          <Text style={styles.buttonText}>Pinjam</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    margin: 6,
    borderRadius: 5,
    width: '45%',
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 5,
  },
  textContainer: {
    marginVertical: 10,
  },
  title: {
    color: colors.black,
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    paddingVertical: 5,
  },
  infoText: {
    color: colors.black,
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    flex: 1,
  },
  borrowButton: {
    backgroundColor: '#2D7F2B',
  },
  buttonText: {
    color: colors.white,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default CardBook;
