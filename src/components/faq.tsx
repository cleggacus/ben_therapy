"use client";

import { useState } from "react";
import styles from "./faq.module.css"

export type FAQProps = {
    question: string,
    answer: string,
}

export default function FAQItem(props: FAQProps) {
    const [open, setOpen] = useState(false);

    return <div onClick={() => setOpen(open => !open)} className={`${styles.item} ${open ? styles.open : ""}`}>
        <h3>{`${open ? '-' : '+'} ${props.question}`}</h3>

        <div className={styles.answer}>
            <div className={styles.inner}>
                {
                    props.answer.split("\n\n").map((line, i) =>
                        <p key={i}>{line.replace(/\n/g, "<br>")}</p>
                    )
                }
            </div>
        </div>
    </div>
}
