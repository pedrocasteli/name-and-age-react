import React, { useState, useEffect } from "react";

import warningIcon from "../assets/warning.svg";
import checkIcon from "../assets/check.svg";
import crossIcon from "../assets/cross.svg";
import spinnerIcon from "../assets/spinner.svg";

import "./Form.scss";

// Todos esses states estão uma confusão. Preciso ajeitar eles melhor e/ou usar useReducer()

const Form = () => {
    const [nameInput, setNameInput] = useState("");
    const [ageInput, setAgeInput] = useState("");
    const [nameExists, setNameExists] = useState(false);
    const [nameIsEmpty, setNameIsEmpty] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);
    const [user, setUser] = useState({ data: [{ age: "" }] });
    const [userExists, setUserExists] = useState(false);

    useEffect(() => {
        if (nameInput === "") {
            setNameIsEmpty(true);
            setIsLoading(false);
        } else {
            setIsLoading(true);
            const myTimer = setTimeout(() => {
                fetch(`http://localhost:3002/people/${nameInput}`)
                    .then((result) => {
                        return result.json();
                    })
                    .then((data) => {
                        setIsLoading(false);
                        if (data.match) {
                            setUser(data);
                            setNameExists(true);
                            setNameIsEmpty(false);
                        } else {
                            setNameExists(false);
                            setNameIsEmpty(false);
                        }
                    });
            }, 500);

            return () => clearTimeout(myTimer);
        }
    }, [nameInput]);

    useEffect(() => {
        if (user.data[0].age === parseInt(ageInput)) {
            setUserExists(true);
        } else {
            setUserExists(false);
        }
    }, [ageInput]);

    const changeNameHandler = (event) => {
        setNameInput(event.target.value);
    };

    const changeAgeHandler = (event) => {
        setAgeInput(event.target.value);
    };

    return (
        <form className="form">
            <section className="form__section">
                <label htmlFor="name">Nome</label>
                <div className="form__search">
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={nameInput}
                        onChange={changeNameHandler}
                        className="form__input"
                        required
                    ></input>
                    {!nameIsEmpty &&
                        nameExists &&
                        !isLoading &&
                        !userExists && (
                            <img
                                src={warningIcon}
                                alt={"Warning icon"}
                                height={20}
                                width={20}
                                className="form__image"
                            />
                        )}
                    {!nameIsEmpty &&
                        !nameExists &&
                        !isLoading &&
                        !userExists && (
                            <img
                                src={checkIcon}
                                alt={"Check icon"}
                                height={20}
                                width={20}
                                className="form__image"
                            />
                        )}
                    {isLoading && !userExists && (
                        <img
                            src={spinnerIcon}
                            alt={"Spinner icon"}
                            height={32}
                            width={32}
                            className="form__image form__image--spinner"
                        />
                    )}
                    {userExists && (
                        <img
                            src={crossIcon}
                            alt={"Cross icon"}
                            height={20}
                            width={20}
                            className="form__image"
                        />
                    )}
                </div>
            </section>
            <section className="form__section">
                <label htmlFor="age">Idade</label>
                <div className="form__search">
                    <input
                        id="age"
                        name="age"
                        type="number"
                        value={ageInput}
                        onChange={changeAgeHandler}
                        min="1"
                        max="110"
                        className="form__input"
                        required
                        disabled={nameIsEmpty || isLoading}
                    ></input>
                    {userExists && (
                        <img
                            src={crossIcon}
                            alt={"Cross icon"}
                            height={20}
                            width={20}
                            className="form__image"
                        />
                    )}
                    {!nameIsEmpty &&
                        !nameExists &&
                        !isLoading &&
                        !userExists && (
                            <img
                                src={checkIcon}
                                alt={"Check icon"}
                                height={20}
                                width={20}
                                className="form__image"
                            />
                        )}
                </div>
            </section>
            <button
                type="submit"
                className="form__button"
                disabled={!formIsValid}
            >
                Enviar
            </button>
        </form>
    );
};

export default Form;
