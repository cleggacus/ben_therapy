"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import styles from "./ContactForm.module.css";
import Section from "./Section";
import { ContactSchema, contactSchema } from "../lib/schemas/contact";

type SendState = "awaiting" | "sending" | "sent" | "failed";

export default function ContactForm() {
  const [sendState, setSendState] = useState<SendState>("awaiting");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactSchema) => {
    setSendState("sending");
    try {
      const res = await fetch("/api/email", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSendState("sent");
    } catch {
      setSendState("failed");
    }

    reset();
  };

  return (
    <Section id="contact">
      <div className={styles.form}>
        {(sendState === "awaiting" || sendState === "sending") &&
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Contact Me</h1>

            <div className={`${styles.input} ${errors.name ? styles.error : ""}`}>
              <input disabled={sendState !== "awaiting"} {...register("name")} placeholder="Name*" />
              {errors.name && <p className={styles.message}>{errors.name.message}</p>}
            </div>

            <div className={`${styles.input} ${errors.email ? styles.error : ""}`}>
              <input disabled={sendState !== "awaiting"} {...register("email")} placeholder="Email*" />
              {errors.email && <p className={styles.message}>{errors.email.message}</p>}
            </div>

            <div className={`${styles.input} ${errors.subject ? styles.error : ""}`}>
              <input disabled={sendState !== "awaiting"} {...register("subject")} placeholder="Subject*" />
              {errors.subject && <p className={styles.message}>{errors.subject.message}</p>}
            </div>

            <div className={`${styles.input} ${errors.message ? styles.error : ""}`}>
              <textarea disabled={sendState !== "awaiting"} {...register("message")} rows={5} placeholder="Message*" />
              {errors.message && <p className={styles.message}>{errors.message.message}</p>}
            </div>

            <button disabled={sendState !== "awaiting"} type="submit">{
              sendState === "awaiting" ?
                "Send" :
                "Sending . . ."
            }</button>
          </form>
        }

        {sendState === "sent" && (
          <div className={`${styles.status} ${styles.success}`}>
            <h1 className={styles.message}>{"Email sent :)"}</h1>
          </div>
        )}

        {sendState === "failed" && (
          <div className={`${styles.error} ${styles.status}`}>
            <h1 className={styles.message}>{"Something went wrong :("}</h1>
            <button onClick={() => setSendState("awaiting")}>Try again</button>
          </div>
        )}


      </div>

    </Section>
  );
}

