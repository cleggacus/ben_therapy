"use client";

import Image from 'next/image'
import { ForwardedRef, forwardRef, useEffect, useRef, useState } from 'react';
import styles from "./page.module.css";
import portraitImage from "../images/portrait.jpg";
import aboutImage from "../images/about.jpg";
import therapyImage from "../images/therapy.jpg";
import logoImage from "../images/logo.png";
import Cover from '../components/cover';
import FAQItem from '../components/faq';
import content from "../../content";
import ContactForm from '../components/contact';
import Navbar, { NavbarElements } from '../components/navbar';

export default function Home() {
    const homeRef = useRef<HTMLDivElement>(null);
    const aboutMeRef = useRef<HTMLDivElement>(null);
    const therapyRef = useRef<HTMLDivElement>(null);
    const faqRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);

    const [elements, setElements] = useState<NavbarElements>({
        home: undefined,
        about_me: undefined,
        therapy: undefined,
        faq: undefined,
        contact: undefined,
    });

    useEffect(() => {
        setElements({
            home: homeRef.current ?? undefined,
            about_me: aboutMeRef.current ?? undefined,
            therapy: therapyRef.current ?? undefined,
            faq: faqRef.current ?? undefined,
            contact: contactRef.current ?? undefined,
        })
    }, [homeRef, aboutMeRef, therapyRef, faqRef, contactRef])

    return <>
        <div className={styles.page}>
            <Cover ref={homeRef}/>
            <Seg1/>
            <Seg2 ref={aboutMeRef}/>
            <Seg3 ref={therapyRef}/>
            <Seg4 ref={faqRef}/>
            <Seg5 ref={contactRef}/>
            <Footer></Footer>
        </div>
        <Navbar elements={elements}/>
    </>
}

const Footer = () => {
    return <div className={styles.footer}>
        <div>
            <code>
                {"Tel:   07506 767178\n"}
                {"Email: thing@thing.thing"}
            </code>
        </div>

        <div>
            <h2>Benjamin Clegg Therapy</h2>
        </div>

        <div>
            <div className={styles.logo}>
            <a href="https://ncps.com/counsellors/NCS24-00946">
                <Image
                    src={logoImage}
                    alt="Accreditation Logo"
                ></Image>
            </a>
            </div>
        </div>
    </div>
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

Seg1.displayName = "Seg1";
Seg2.displayName = "Seg2";
Seg3.displayName = "Seg3";
Seg4.displayName = "Seg4";
Seg5.displayName = "Seg5";
