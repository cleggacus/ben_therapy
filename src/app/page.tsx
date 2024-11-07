"use client";

import Image from 'next/image'
import { ForwardedRef, forwardRef, useEffect, useRef, useState } from 'react';
import styles from "./page.module.css";
import aboutImage from "../images/about.jpg";
import therapyImage from "../images/therapy.jpg";
import logoImage from "../images/logo.png";
import Cover from '../components/cover';
import FAQItem from '../components/faq';
import content from "../../content";
import ContactForm from '../components/contact';
import Navbar, { NavbarElements } from '../components/navbar';
import Section, { Seperator } from '../components/section';

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

            <Intro/>
            <Seperator />

            <Seg1 ref={aboutMeRef}/>
            <Seperator />

            <Seg2 ref={therapyRef}/>
            <Seperator />

            <Seg4 ref={faqRef}/>
            <Seperator />

            <Seg5 ref={contactRef}/>

            <Footer/>
        </div>
        <Navbar elements={elements}/>
    </>
}


function Intro() {
    return <Section className={styles.intro}>
        <h1>{content.intro.title}</h1>
        {
            content.intro.description.split("\n").map((line, i) =>
                <p key={i}>{line}</p>
            )
        }
    </Section>
}

const Seg1 = forwardRef((_, ref: ForwardedRef<HTMLDivElement>) => {
    return <Section ref={ref} className={styles.seg1}>
        <h1>About Me</h1>

        <div className={styles.content}>
            <Image
                src={aboutImage}
                alt="picture of therapist"
            ></Image>

            <div>
            {
                content.about_me.split("\n").map((line, i) =>
                    <p key={i}>{line}</p>
                )
            }
            </div>
        </div>
    </Section>
})

Seg1.displayName = 'Seg1';

const Seg2 = forwardRef((_, ref: ForwardedRef<HTMLDivElement>) => {
    return <Section ref={ref} className={styles.seg2}>
        <h1>Why Therapy</h1>

        <div className={styles.content}>
            <div>
            {
                content.about_me.split("\n").map((line, i) =>
                    <p key={i}>{line}</p>
                )
            }
            </div>
            
            <Image
                src={therapyImage}
                alt="picture of therapist"
            ></Image>
        </div>
    </Section>
})

Seg2.displayName = 'Seg2';

const Seg4 = forwardRef((_, ref: ForwardedRef<HTMLDivElement>) => {
    return <Section className={styles.seg4} ref={ref}>
        <h1>Frequently Asked Questions</h1>
        {
            content.faq.map((item, i) => 
                <FAQItem
                    key={i}
                    {...item}
                />
            )
        }
    </Section>
})

Seg4.displayName = 'Seg4';

const Seg5 = forwardRef((_, ref: ForwardedRef<HTMLDivElement>) => {
    return <Section className={styles.seg5} ref={ref}>
        <ContactForm />
    </Section>
})

Seg5.displayName = 'Seg5';

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

Footer.displayName = 'Footer';
