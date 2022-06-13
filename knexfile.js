module.exports = {
    development: {
        client: 'postgres',
        connection: {
            host: 'db',
            user: 'root',
            password: 'toor',
            database: 'votoElectronico',
          },
        migrations: {
            directory: __dirname + '/scripts',
          },
      },
    test: {
        client: 'postgres',
        connection: {
            host: 'db',
            user: 'root',
            password: 'toor',
            database: 'votoElectronico',
          },
        migrations: {
            directory: __dirname + '/scripts',
          },
      },
    production: {
        client: 'postgres',
        connection: { 
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        },
        migrations: {
            directory: __dirname + '/scripts',
          },
      },
  };