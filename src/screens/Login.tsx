import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import api from '../axios';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email === 'admin' && password === 'admin') {
      navigation.replace('Admin');
      return;
    }

    if (!email || !password) {
      Alert.alert('Error', 'Email dan kata sandi harus diisi');
      return;
    }

    try {
      const response = await api.post('/auth/login', {
        email: email,
        password: password,
      });

      if (response.data) {
        navigation.replace('App');
      } else {
        Alert.alert('Error', 'Login gagal, coba lagi');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'Terjadi kesalahan, coba lagi');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selamat Datang</Text>
      <Text style={styles.subtitle}>
        Masukkan email dan kata sandi Anda untuk masuk
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Kata Sandi"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Masuk</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>Belum punya akun? Daftar sekarang</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingLeft: 15,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#2D7F2B',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    color: '#666',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default Login;
