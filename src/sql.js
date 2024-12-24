const SQLite = require('react-native-sqlite-storage');

const db = SQLite.openDatabase(
  {
    name: 'Library.db',
    location: 'default',
  },
  () => {
    console.log('Database berhasil dibuka');
  },
  error => {
    console.error('Error membuka database:', error);
  },
);

const createTable = () => {
  if (!db) {
    console.error('Database tidak tersedia');
    return;
  }

  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        genre TEXT,
        year INTEGER,
        image TEXT,
        summary TEXT
      );`,
      [],
      () => {
        console.log('Tabel berhasil dibuat');
      },
      error => {
        console.error('Error membuat tabel:', error);
      },
    );
  });
};

const insertBooks = books => {
  if (!db) {
    console.error('Database tidak tersedia');
    return;
  }

  db.transaction(tx => {
    books.forEach(book => {
      tx.executeSql(
        `INSERT OR REPLACE INTO books (id, title, author, genre, year, image, summary) VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [
          book.id,
          book.title,
          book.author,
          book.genre || null,
          book.year || null,
          book.image || null,
          book.summary || null,
        ],
        () => {
          console.log(`Buku "${book.title}" berhasil disisipkan`);
        },
        error => {
          console.error(`Error menyisipkan buku "${book.title}":`, error);
        },
      );
    });
  });
};

const fetchBooksFromDB = (callback = () => {}) => {
  if (!db) {
    console.error('Database tidak tersedia');
    return;
  }

  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM books;`,
      [],
      (_, results) => {
        const rows = results.rows;
        const books = [];
        for (let i = 0; i < rows.length; i++) {
          books.push(rows.item(i));
        }
        console.log('Data berhasil diambil:', books);
        callback(books);
      },
      error => {
        console.error('Error mengambil data:', error);
        callback([]);
      },
    );
  });
};

const closeDatabase = () => {
  if (db) {
    db.close(
      () => {
        console.log('Database berhasil ditutup');
      },
      error => {
        console.error('Error menutup database:', error);
      },
    );
  } else {
    console.warn('Database sudah dalam keadaan tertutup atau tidak tersedia');
  }
};

module.exports = {
  createTable,
  insertBooks,
  fetchBooksFromDB,
  closeDatabase,
};
