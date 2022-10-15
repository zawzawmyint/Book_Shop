import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
const port = 8800;

const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "book"
})

app.get("/", (req, res) => {
    res.json("Hello this is backend")
})

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";

    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data); s
    })
})

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`,`price`,`cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json(data);
    })
})

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json("Books have been deleted successfully.")
    })
})

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ? , `desc` = ?,`price` = ?,`cover` = ? WHERE id = ?";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ]
    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json("Books have been updated successfully.")
    })
})

app.listen(port, () => {
    console.log(`Connected to backend port on ${port}`);
})
