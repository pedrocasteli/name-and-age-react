import express from "express";
import cors from "cors";
import db from "./config/dbConnect.js";
import Person from "./models/Person.js";
import routes from "./routes/index.js";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
    console.log("Cenexão bem-sucedida!");
});

const app = express();

app.use(express.json());
app.use(cors());
routes(app);

app.use((req, res) => {
    res.status(404).send({
        status: "fail",
        error: "Rota ou Método não encontrado",
    });
});

app.get("/people/:name", (req, res) => {
    Person.find((e, person) => {
        res.status(200).json(person);
    });
});

app.post("/people", (req, res) => {
    res.status(200).json({ status: "success", message: "Rota POST" });
});

export default app;
