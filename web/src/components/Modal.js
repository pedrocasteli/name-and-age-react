import React from "react";
import ReactDOM from "react-dom";

import okGIF from "../assets/ok.gif";
import styles from "./Modal.module.scss";

const Modal = (props) => {
    return props.open
        ? ReactDOM.createPortal(
              <div className={styles.backdrop} onClick={props.onClose}>
                  <div className={styles.modal}>
                      <h1>Dados enviados!</h1>
                      <img
                          src={okGIF}
                          alt="GIF of a man giving the camera 'thumbs up'."
                          width={282}
                          height={286}
                      ></img>
                      <button onClick={props.onClose}>Voltar</button>
                  </div>
              </div>,
              document.getElementById("portal")
          )
        : null;
};

export default Modal;
