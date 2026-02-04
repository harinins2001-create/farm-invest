const express = require("express");
const cors =require("cors");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

//GET investments
app.get("/api/investments", async(req, res) => {
    try{
        const [rows] = await pool.query("SELECT * FROM investments");
        res.json(rows);
    } catch (err){
        res.status(500).json({error: "Database error"});
    }
});

//POST investment
app.post("/api/investments", async(req,res) => {
    const {farmer_name, amount, crop} = req.body;

    if(!farmer_name || !amount || !crop){
        return res.status(400).json({error: "All fields required"});
    }

    try{
        const [result] = await pool.query(
            "INSERT INTO investments (farmer_name, amount, crop) VALUES(?, ?, ?)", [farmer_name, amount, crop]
        );

        const [rows] = await pool.query(
            "SELECT * FROM investments WHERE id = ?", [result.insertId]
        );

        res.status(201).json(rows[0]);
    } catch(err){
        res.status(500).json({error: "Insert failed"});
    }
});

app.listen(3000, () => {
    console.log("Backend running on http://localhost:3000");
});