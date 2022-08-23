import fs from "fs";
import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const people = JSON.parse(fs.readFileSync("./dev-data/people.json"));

app.get("/people/:name", (req, res) => {
    const person = people.find((el) => el.username === req.params.name);

    if (!person) {
        return res.status(200).send({
            status: "success",
            match: false,
        });
    }

    res.status(200).send({
        status: "success",
        match: true,
        name: person.name,
        username: person.username,
        email: person.email,
    });
});

app.post("/people", (req, res) => {
    res.status(200).json({ status: "success", message: "Rota POST" });
});

export default app;
