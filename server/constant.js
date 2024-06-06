const constant = {
  http: {
    port: 5173,
  },
  https: {
    port: 443,
    options: {
      key: 'server.key',
      cert: 'server.cert',
      passphrase: 'hypertube',
    },
  },
  nodemailer: {
    host: 'mail.smtpbucket.com', // Using SMTP Bucket for testing
    port: 8025,
    ignoreTLS: true, // TLS is a security feature, but not needed for testing
  },
  database: {
    connection_parameters: {
      user: 'postgres',
      host: 'localhost',
      database: 'hypertube',
      password: 'pg',
      port: 5432,
    },
    users_private: {
      columns: [
        `id SERIAL PRIMARY KEY`,

        `email VARCHAR(50) UNIQUE CHECK (char_length(email) BETWEEN 6 AND 50 AND email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$')`,
        `password VARCHAR(60)`,
        `view_history INT[] DEFAULT ARRAY[]::INT[]`,

        `created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`,
        `updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`
      ],
      column_names: [
        `email`, `password`, `view_history`,
      ],
    },
    users_preview: {
      columns: [
        `id SERIAL PRIMARY KEY`,

        `activation_key VARCHAR(20)`,
        `email VARCHAR(50) UNIQUE CHECK (char_length(email) BETWEEN 6 AND 50 AND email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$')`,
        `password VARCHAR(60)`,
        `username VARCHAR(20) UNIQUE CHECK (char_length(username) BETWEEN 6 AND 20 AND username ~ '^[A-Za-z0-9]+$')`,

        `created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`,
        `updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`
      ],
      column_names: [
        `activation_key`, `email`, `password`, `username`,
      ],
    },
    users_public: {
      columns: [
        `id SERIAL PRIMARY KEY`,

        `username VARCHAR(20) UNIQUE CHECK (char_length(username) BETWEEN 6 AND 20 AND username ~ '^[A-Za-z0-9]+$')`,
        `date_of_birth DATE CHECK (date_of_birth BETWEEN '1900-01-01' AND '2021-12-31')`,
        `gender VARCHAR(35) CHECK (gender IN ('Male', 'Female', 'Other'))`,
        `biography VARCHAR(255)`,
        `pictures VARCHAR(255)[5] DEFAULT ARRAY[]::VARCHAR(255)[]`,
        `geolocation VARCHAR[2]`,
        `localization VARCHAR(255)`,
        `last_connection TIMESTAMP`,

        `created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`,
        `updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`
      ],
      column_names: [
        `username`, `date_of_birth`, `gender`, `biography`, `pictures`, `geolocation`, `localization`
      ],
    },
  },
};

module.exports = constant;