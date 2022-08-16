import React from "react";

import styles from "./Card.module.scss";

const Card = (props) => {
    return <main className={styles.card}>{props.children}</main>;
};

export default Card;
