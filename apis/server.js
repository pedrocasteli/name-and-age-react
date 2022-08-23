import dotenv from "dotenv";
import app from "./src/app.js";

dotenv.config({ path: "./.env" });

const port = process.env.PORT || 3003;

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
