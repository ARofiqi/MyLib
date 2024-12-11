import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import BorrowedBooks from '../src/screens/BorrowedBooks';
import api from '../src/axios';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

jest.mock('../src/axios');
jest.mock('react-native-toast-message', () => ({show: jest.fn()}));
jest.mock('@react-navigation/native', () => ({useNavigation: jest.fn()}));

describe('BorrowedBooks', () => {
  let navigation;

  beforeEach(() => {
    navigation = {navigate: jest.fn()};
    useNavigation.mockReturnValue(navigation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading indicator while fetching data', async () => {
    api.get.mockResolvedValueOnce({data: []});
    const {getByTestId} = render(<BorrowedBooks />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('should display books when data is fetched', async () => {
    const books = [{id: 1, title: 'Book 1'}];
    api.get.mockResolvedValueOnce({data: books});
    const {getByText} = render(<BorrowedBooks />);
    await waitFor(() => expect(getByText('Book 1')).toBeTruthy());
  });

  it('should show message if no books are borrowed', async () => {
    api.get.mockResolvedValueOnce({data: []});
    const {getByText} = render(<BorrowedBooks />);
    await waitFor(() =>
      expect(getByText('Tidak ada buku yang sedang dipinjam')).toBeTruthy(),
    );
  });

  it('should handle return book action', async () => {
    const books = [{id: 1, title: 'Book 1'}];
    api.get.mockResolvedValueOnce({data: books});
    api.delete.mockResolvedValueOnce({status: 200});
    const {getByText, queryByText} = render(<BorrowedBooks />);
    await waitFor(() => expect(getByText('Book 1')).toBeTruthy());
    fireEvent.press(getByText('Kembalikan'));
    await waitFor(() => expect(queryByText('Book 1')).toBeNull());
    expect(Toast.show).toHaveBeenCalledWith({
      type: 'success',
      text1: 'Sukses',
      text2: 'Buku berhasil dikembalikan',
    });
  });

  it('should handle error when returning book', async () => {
    const books = [{id: 1, title: 'Book 1'}];
    api.get.mockResolvedValueOnce({data: books});
    api.delete.mockRejectedValueOnce(new Error('Network Error'));
    const {getByText} = render(<BorrowedBooks />);
    await waitFor(() => expect(getByText('Book 1')).toBeTruthy());
    fireEvent.press(getByText('Kembalikan'));
    await waitFor(() =>
      expect(Toast.show).toHaveBeenCalledWith({
        type: 'error',
        text1: 'Error',
        text2: 'Terjadi kesalahan saat mengembalikan buku',
      }),
    );
  });

  it('should handle extend loan action', async () => {
    const books = [{id: 1, title: 'Book 1', borrowedDays: 14}];
    api.get.mockResolvedValueOnce({data: books});
    api.put.mockResolvedValueOnce({status: 200});
    const {getByText} = render(<BorrowedBooks />);
    await waitFor(() => expect(getByText('Book 1')).toBeTruthy());
    fireEvent.press(getByText('Perpanjang Peminjaman'));
    await waitFor(() =>
      expect(Toast.show).toHaveBeenCalledWith({
        type: 'success',
        text1: 'Sukses',
        text2: 'Peminjaman buku diperpanjang selama 7 hari',
      }),
    );
  });
});
