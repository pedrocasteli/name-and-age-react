import React, { useState, useEffect } from "react";

import styles from "./Form.module.scss";

const Form = () => {
    const [nameInput, setNameInput] = useState("");
    const [ageInput, setAgeInput] = useState("");

    useEffect(() => {
        const myTimer = setTimeout(() => {
            console.log(`Name: ${nameInput}`);
            console.log(`Age: ${ageInput}`);
        }, 500);

        return () => clearTimeout(myTimer);
    }, [nameInput, ageInput]);

    const changeNameHandler = (event) => {
        setNameInput(event.target.value);
    };

    const changeAgeHandler = (event) => {
        setAgeInput(event.target.value);
    };

    return (
        <form className={styles.form}>
            <section>
                <label htmlFor="name">Nome</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={nameInput}
                    required
                    onChange={changeNameHandler}
                ></input>
            </section>
            <section>
                <label htmlFor="age">Idade</label>
                <input
                    id="age"
                    name="age"
                    type="number"
                    value={ageInput}
                    required
                    onChange={changeAgeHandler}
                ></input>
            </section>
            <button type="submit">Enviar</button>
        </form>
    );
};

export default Form;
