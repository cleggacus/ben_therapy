"use client";

import Image from 'next/image'
import { ForwardedRef, forwardRef, useEffect, useRef, useState } from 'react';
import styles from "./page.module.css";
import portraitImage from "../images/portrait.jpg";
import aboutImage from "../images/about.jpg";
import therapyImage from "../images/therapy.jpg";
import Cover from '../components/cover';
import FAQItem from '../components/faq';
import content from "../../content";
import ContactForm from '../components/contact';
import Navbar, { NavbarElements } from '../components/navbar';

export default function Home() {
    const refs = Array.from({ length: 5 }, () => useRef<HTMLDivElement>(null));

    const [elements, setElements] = useState<NavbarElements>({
        home: undefined,
        about_me: undefined,
        therapy: undefined,
        faq: undefined,
        contact: undefined,
    });

    useEffect(() => {
        setElements({
            home:       refs[0].current ?? undefined,
            about_me:   refs[1].current ?? undefined,
            therapy:    refs[2].current ?? undefined,
            faq:        refs[3].current ?? undefined,
            contact:    refs[4].current ?? undefined,
        })
    }, refs)

    return <>
        <div className={styles.page}>
            <Cover ref={refs[0]}/>
            <Seg1/>
            <Seg2 ref={refs[1]}/>
            <Seg3 ref={refs[2]}/>
            <Seg4 ref={refs[3]}/>
            <Seg5 ref={refs[4]}/>
        </div>
        <Navbar elements={elements}/>
    </>
}


const Seg1 = forwardRef((_, ref: ForwardedRef<HTMLDivElement>) => {
    return <div className={styles.seg1} ref={ref}>
        <div className={styles.left}>
            <Image
                src={portraitImage}
                alt="picture of therapist"
            ></Image>
        </div>

        <div className={styles.right}>
            <div className={styles.inner}>
                <h1>{content.book_session.title}</h1>
                <p>{content.book_session.description.replace(/\n/g, "<br>")}</p>
                <button>Book a session</button>
            </div>
        </div>
    </div>
})

const Seg2 = forwardRef((_, ref: ForwardedRef<HTMLDivElement>) => {
    return <div className={styles.seg2} ref={ref}>
        <div className={styles.inner}>
            <div className={styles.left}>
                <h1>About Me</h1>
                {
                    content.about_me.split("\n\n").map((line, i) =>
                        <p key={i}>{line.replace(/\n/g, "<br>")}</p>
                    )
                }
            </div>

            <div className={styles.right}>
                <Image
                    src={aboutImage}
                    alt="picture of therapist"
                ></Image>
            </div>
        </div>
    </div>
})

const Seg3 = forwardRef((_, ref: ForwardedRef<HTMLDivElement>) => {
    return <div className={styles.seg3} ref={ref}>
        <div className={styles.inner}>
            <div className={styles.left}>
                <Image
                    src={therapyImage}
                    alt="picture of therapist"
                ></Image>
            </div>

            <div className={styles.right}>
                <h1>Why therapy</h1>
                {
                    content.why_therapy.split("\n\n").map((line, i) =>
                        <p key={i}>{line.replace(/\n/g, "<br>")}</p>
                    )
                }
            </div>
        </div>
    </div>
})

const Seg4 = forwardRef((_, ref: ForwardedRef<HTMLDivElement>) => {
    return <div className={styles.seg4} ref={ref}>
        <div className={styles.inner}>
            <h1>Frequently Asked Questions</h1>
            {
                content.faq.map((item, i) => 
                    <FAQItem
                        key={i}
                        {...item}
                    />
                )
            }
        </div>
    </div>
})


const Seg5 = forwardRef((_, ref: ForwardedRef<HTMLDivElement>) => {
    return <div className={styles.seg5} ref={ref}>
        <div className={styles.inner}>
            <ContactForm />
        </div>
    </div>
})
