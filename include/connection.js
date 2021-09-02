//We will create database connection in this file

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vittor_cloud'
});

//connect to database :
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

module.exports = db