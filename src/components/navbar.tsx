"use client";

import styles from "./navbar.module.css"
import { FiMenu } from "react-icons/fi";
import { useState } from "react";

export type NavbarElements = {
    home?: Element,
    about_me?: Element,
    fees?: Element,
    contact?: Element,
}

type Props = {
    elements: NavbarElements
}

export default function Navbar(props: Props) {
    const [open, setOpen] = useState(false);

    const scrollTo = (element?: Element) => {
        if(!element) return;

        const y = element.getBoundingClientRect().top + window.scrollY - 105;
        window.scrollTo({top: y, behavior: 'smooth'});
        setOpen(false);
    }

    return <div className={`${styles.container}`}>
        <FiMenu className={styles.icon} onClick={() => setOpen(open => !open)}/>

        <ul className={open ? styles.open : ""}>
            <li onClick={() => scrollTo(props.elements.home)}>HOME</li>
            <li onClick={() => scrollTo(props.elements.about_me)}>ABOUT ME</li>
            <li onClick={() => scrollTo(props.elements.fees)}>FEES</li>
            <li onClick={() => scrollTo(props.elements.contact)}>CONTACT</li>
        </ul>
    </div>
}
