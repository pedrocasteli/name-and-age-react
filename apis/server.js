import app from "./src/app.js";
import "dotenv/config";

const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
