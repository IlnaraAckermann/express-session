const sqlite3 = require("sqlite3").verbose();

// Classe Singleton para o banco de dados
class DatabaseSingleton {
  constructor() {
    if (!DatabaseSingleton.instance) {
      // Cria uma instância do banco de dados SQLite
      this.db = new sqlite3.Database("database.db");
      this.db.serialize(() => {


        this.db.run(`
          CREATE TABLE IF NOT EXISTS clientes (
            id INTEGER PRIMARY KEY,
            nome TEXT,
            senha TEXT,
            email TEXT,
            endereco TEXT
          );
        `);

        this.db.run(`
          CREATE TABLE IF NOT EXISTS categorias (
            id INTEGER PRIMARY KEY,
            nome TEXT
          );
        `);

        this.db.run(`
          CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY,
            nome TEXT,
            estoque INTEGER,
            id_categoria INTEGER,
            id_usuario INTEGER,
            preco REAL,
            descricao TEXT, 
            url_da_imagem TEXT,
            FOREIGN KEY (id_categoria) REFERENCES categorias (id)
            FOREIGN KEY (id_usuario) REFERENCES clientes (id)
          );
        `);
      });

      // Atribui a instância atual à propriedade estática
      DatabaseSingleton.instance = this;
    }

    // Retorna a instância única
    return DatabaseSingleton.instance;
  }
}

// Exporta a instância única
module.exports = DatabaseSingleton;
