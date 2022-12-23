import React from 'react'
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
export default function Modal({ setIsOpen, woman }) {
  return (
    <>
    <div className={styles.darkBG} onClick={() => setIsOpen(false)}>
 
    <div className={styles.centered}>
        <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
          <RiCloseLine style={{ marginBottom: "-3px" }} />
        </button>
        <div className={styles.modalContent}>
            <div>
            <img src={woman.image_path} width="150px" height="175px"/>
            </div>
            <div>
            <h5>{woman.name}</h5>
          <p>{woman.details}</p>
          </div>

      </div>
    </div>
    </div>
  </>

  )
}
