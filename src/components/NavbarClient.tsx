"use client";

import styles from "./Navbar.module.css"
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import Link from "next/link";
import { useSmoothScrollTo } from "../hooks/useSmoothScrollTo";

type Props = {
    sections: string[]
}

export default function NavbarClient(props: Props) {
    const [open, setOpen] = useState(false);

    useSmoothScrollTo();

    return <div className={`${styles.container}`}>
        <FiMenu className={styles.icon} onClick={() => setOpen(open => !open)}/>

        <ul className={open ? styles.open : ""}>
            {
                props.sections.map((section, i) =>
                    <li key={i}>
                        <Link 
                            href={`#${section.split(' ').join('_').toLowerCase()}`}
                            scroll={false}
                        >{section.toUpperCase()}</Link>
                    </li>
                )
            }
        </ul>
    </div>
}
