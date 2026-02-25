const express = require ('express')
const app = express();
const port = 3000;
const path = require('path');
const mysql = require('mysql2');
const dotenv = require('dotenv');
require('dotenv').config();
const cors = require('cors');

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT 
};


const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error('Fallo al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos yuumi_cosmetics');
});

//Settings
app.set('port', process.env.PORT || 3000);


//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

//Routes

app.get('/api/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/api/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/api/users', (req, res) => {
    connection.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            res.status(500).json({ error: 'Error al obtener usuarios' });
            return;
        }
        res.json(results);
    });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.post('/api/register', (req, res) => {
    // Capturamos los valores directamente desde el objeto que ya confirmamos que llega bien
    const nombre = req.body.nombre;
    const correo = req.body.correo;
    const contrasena = req.body.contrasena;

    console.log("Insertando en BD:", { nombre, correo, contrasena });

    const sql = 'INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)';
    
    connection.query(sql, [nombre, correo, contrasena], (err, results) => {
        if (err) {
            console.error('Error al agregar usuario:', err);
            return res.status(500).json({ error: 'Error al agregar usuario' });
        }
        res.status(201).json({ message: 'Usuario agregado correctamente', results });
    });
});


app.delete('/api/users/delete', (req, res) => {
    
    const { id_usuario } = req.body; 

    if (!id_usuario) {
        return res.status(400).json({ error: 'Falta el ID en el cuerpo de la petición' });
    }

    const sql = 'DELETE FROM usuarios WHERE id_usuario = ?';

    connection.query(sql, [id_usuario], (err, results) => {
        if (err) {
            console.error('Error al eliminar usuario:', err);
            return res.status(500).json({ error: 'Error al eliminar usuario' });
        }
        
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ message: 'Usuario eliminado correctamente', results });
    });
});

app.put('/api/users/update', (req, res) => {
    const { id_usuario, nombre, correo } = req.body;
    if (!id_usuario || !nombre || !correo) {
        return res.status(400).json({ error: 'Faltan datos en el cuerpo de la petición' });
    }
    const sql = 'UPDATE usuarios SET nombre = ?, correo = ? WHERE id_usuario = ?';
    connection.query(sql, [nombre, correo, id_usuario], (err, results) => {
        if (err) {
            console.error('Error al actualizar usuario:', err);
            return res.status(500).json({ error: 'Error al actualizar usuario' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario actualizado correctamente', results });
    });
});

app.set('port',3000);

app.listen(app.get('port'), () => {
console.log(`Servidor corriendo en puerto ${app.get('port')}`)
});