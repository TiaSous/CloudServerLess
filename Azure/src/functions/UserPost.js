const { app } = require('@azure/functions');
const mysql = require('mysql2/promise');

// configuration db
const config = {
    host: process.env.Host,
    port: 3306,
    user: process.env.User,
    password: process.env.Password,
    database: process.env.Database,
    connectTimeout: 30000,
}

app.http('UserPost', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'user',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);
        let connection;
        try {
            const username = request.query.get("username")
            if (username == null)
            {
                return { status: 400, body: 'les 3 champs sont obligatoires: ' + error };
            }

            // Connexion à la base de données
            connection = await mysql.createConnection(config);

            
            const sqlQuery = "INSERT INTO t_users (username) VALUES (?)"

            const [results] = await connection.execute(sqlQuery, [username]);
            return {jsonBody: results};
        }
        catch (error){
            return { status: 400 };
            
        } finally {
            if (connection) {
              await connection.end();
            }
          }
    }
});
