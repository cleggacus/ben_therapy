"use client";

import { FormEventHandler, useEffect, useState } from "react";
import styles from "./ContactForm.module.css"
import Section from "./section";

type SendState = "awaiting" | "sending" | "sent" | "failed"

export default function ContactForm() {
    const [sendState, setSendState] = useState<SendState>("awaiting")
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const send: FormEventHandler<HTMLFormElement> = (e) => {
        setSendState("sending");
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
            .then(() => setSendState("sent"))
            .catch(() => setSendState("failed"))
    }

    useEffect(() => {
        if(sendState == "sent") {

        }
    }, [sendState])

    return <Section id="contact">
        {
            sendState == "awaiting" ?
                <form onSubmit={send} className={styles.form}>
                    <h1>Contact Me</h1>
                    <input value={name} onChange={e => setName(e.currentTarget.value)} placeholder="Name"/>
                    <input value={email} onChange={e => setEmail(e.currentTarget.value)} placeholder="Email"/>
                    <input value={subject} onChange={e => setSubject(e.currentTarget.value)} placeholder="Subject"/>
                    <textarea value={message} onChange={e => setMessage(e.currentTarget.value)} rows={5} placeholder="Message"/>
                    <button>Submit</button>
                </form> :
            sendState == "sending" ?
                <h1>Sending . . .</h1> :
            sendState == "sent" ?
                <div className={styles.form}>
                    <h1>Email Sent :)</h1>
                    <button onClick={() => setSendState("awaiting")}>Send Another</button>
                </div> :
            sendState == "failed" ?
                <div className={styles.form}>
                    <h1>Failed To Send :(</h1>
                    <button onClick={() => setSendState("awaiting")}>Try Again</button>
                </div> :
                <></>
        }
    </Section>
}
