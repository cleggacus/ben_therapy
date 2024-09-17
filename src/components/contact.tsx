"use client";

import { FormEventHandler, useState } from "react";
import styles from "./contact.module.css"

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const send: FormEventHandler<HTMLFormElement> = (e) => {
        const apiEndpoint = '/api/email';
        const data = {
            name,
            email,
            subject,
            message
        };

        e.preventDefault();

        fetch(apiEndpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((response) => {
                alert(response.message);
            })
            .catch((err) => {
                alert(err);
            });
    }

    return <form onSubmit={send} className={styles.form}>
        <h1>Contact Me</h1>
        <input value={name} onChange={e => setName(e.currentTarget.value)} placeholder="Name"/>
        <input value={email} onChange={e => setEmail(e.currentTarget.value)} placeholder="Email"/>
        <input value={subject} onChange={e => setSubject(e.currentTarget.value)} placeholder="Subject"/>
        <textarea value={message} onChange={e => setMessage(e.currentTarget.value)} rows={5} placeholder="Message"/>
        <button>Submit</button>
    </form>
}
