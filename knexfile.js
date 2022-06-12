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
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: __dirname + '/scripts',
          },
      },
  };