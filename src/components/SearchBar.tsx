import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const SearchBar = ({searchText, setSearchText}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Cari buku..."
        placeholderTextColor="#999"
        value={searchText}
        onChangeText={setSearchText}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    height: 40,
    fontSize: 16,
    color: '#333',
  },
});

export default SearchBar;
