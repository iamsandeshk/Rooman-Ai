const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to SQLite database
const dbPath = path.resolve(__dirname, '../chat_history.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        createTable();
    }
});

function createTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS chats (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId TEXT NOT NULL,
            userMessage TEXT NOT NULL,
            botResponse TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `;
    db.run(sql, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        }
    });
}

function saveChat(userId, userMessage, botResponse) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO chats (userId, userMessage, botResponse) VALUES (?, ?, ?)`;
        db.run(sql, [userId, userMessage, botResponse], function(err) {
            if (err) {
                console.error('Error saving chat:', err.message);
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
}

function getHistory(userId) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT userMessage, botResponse FROM chats WHERE userId = ? ORDER BY timestamp ASC`;
        db.all(sql, [userId], (err, rows) => {
            if (err) {
                console.error('Error fetching history:', err.message);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports = { saveChat, getHistory };
