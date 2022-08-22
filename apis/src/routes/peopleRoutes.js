import express from "express";
import PeopleController from "../controllers/peopleController.js";

const router = express.Router();

router
    .get("/people/:name", PeopleController.listPerson)
    .post("/people", PeopleController.newPerson);

export default router;
