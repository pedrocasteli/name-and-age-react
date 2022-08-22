import express from "express";
import people from "./peopleRoutes.js";
import Person from "../models/Person.js";

const routes = (app) => {
    app.route("/people").get((req, res) => {
        Person.find((e, person) => {
            res.status(200).json(person);
        });
    });

    app.use(express.json(), people);
};

export default routes;
