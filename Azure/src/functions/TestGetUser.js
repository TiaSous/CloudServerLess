const { app } = require('@azure/functions');
const mysql = require('mysql2/promise');

// configuration db
const config = {
  host: process.env["Host"],
  port: 3306,
  user: process.env["User"],
  password: process.env["Password"],
  database: process.env["Database"],
  connectTimeout: 30000,
}

app.http('TestGetUser', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'users',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);
        let connection;
        try {
            // Connexion à la base de données
            connection = await mysql.createConnection(config);
            const [rows] = await connection.execute('SELECT * FROM t_users');

            // Vérifiez si des utilisateurs ont été trouvés
            if (rows.length === 0) {
              return { status: 404, body: 'No users found' };
            }
      
            // Retourner les utilisateurs en réponse JSON
            return { jsonBody: rows };
          } catch (error) {
            context.log(`Error: ${error}`);
            return { status: 500, body: 'Internal Server Error : ' + error };
          } finally {
            if (connection) {
              await connection.end();
            }
          }
    }
});

