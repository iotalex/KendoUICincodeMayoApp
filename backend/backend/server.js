const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3001;  // Different from your frontend server

app.use(bodyParser.json());

// Set up SQLite database
const db = new sqlite3.Database('./cincoDeMayo.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the cinco de mayo database.');
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        item TEXT NOT NULL
    )`);
});

// Routes
app.get('/todos', (req, res) => {
    db.all("SELECT * FROM todos", [], (err, rows) => {
        if (err) {
            res.status(400).send(err.message);
            return;
        }
        res.json(rows);
    });
});

app.post('/todos', (req, res) => {
    const { item } = req.body;
    db.run(`INSERT INTO todos (item) VALUES (?)`, [item], function(err) {
        if (err) {
            res.status(400).send(err.message);
            return;
        }
        res.status(201).send(`Todo added with ID: ${this.lastID}`);
    });
});

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM todos WHERE id = ?`, id, function(err) {
        if (err) {
            res.status(400).send(err.message);
            return;
        }
        res.send(`Todo deleted`);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
