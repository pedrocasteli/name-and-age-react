import Person from "../models/Person.js";

class PeopleController {
    static listPerson = (req, res) => {
        try {
            Person.find(
                { name: new RegExp("^" + req.params.name + "$", "i") },
                (e, person) => {
                    if (e) {
                        res.status(400).send({ status: "fail", message: e });
                    } else {
                        if (Object.keys(person).length > 0) {
                            res.status(200).send({
                                status: "success",
                                match: true,
                                results: person.length,
                                data: person,
                            });
                        } else {
                            res.status(200).send({
                                status: "success",
                                match: false,
                                message: "No users found",
                                results: person.length,
                                data: [],
                            });
                        }
                    }
                }
            );
        } catch {
            res.status(500).send({
                status: "fail",
                message: "An error has ocurred in the application",
            });
        }
    };

    static newPerson = (req, res) => {
        let person = new Person(req.body);
        person.save((e) => {
            if (e) {
                res.status(500).send({
                    status: "fail",
                    message: `${e.message} - Falha ao cadastrar pessoa.`,
                });
            } else {
                res.status(201).send({
                    status: "success",
                    data: person.toJSON(),
                });
            }
        });
    };
}

export default PeopleController;
