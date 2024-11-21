"use client";

import Image from 'next/image'
import { ForwardedRef, forwardRef, useEffect, useRef, useState } from 'react';
import styles from "./page.module.css";
import portrait from "../images/portrait.jpg";
import logoImage from "../images/logo.png";
import Cover from '../components/cover';
import content from "../../content";
import ContactForm from '../components/contact';
import Navbar, { NavbarElements } from '../components/navbar';
import Section, { Seperator } from '../components/section';

export default function Home() {
    const homeRef = useRef<HTMLDivElement>(null);
    const aboutMeRef = useRef<HTMLDivElement>(null);
    const feesRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);

    const [elements, setElements] = useState<NavbarElements>({
        home: undefined,
        about_me: undefined,
        contact: undefined,
        fees: undefined,
    });

    useEffect(() => {
        setElements({
            home: homeRef.current ?? undefined,
            about_me: aboutMeRef.current ?? undefined,
            contact: contactRef.current ?? undefined,
            fees: feesRef.current ?? undefined,
        })
    }, [homeRef, aboutMeRef, feesRef, contactRef])

    return <>
        <div className={styles.page}>
            <Cover ref={homeRef} contact={elements.contact}/>

            <Seg1 ref={aboutMeRef} contact={elements.contact}/>
            <Seperator />

            <Seg2 contact={elements.contact}/>
            <Seperator />

            <Seg4 ref={feesRef} contact={elements.contact}/>
            <Seperator />

            <Seg5 ref={contactRef}/>
            <Seperator />

            <Seg6/>
            <Seperator />

            <Footer/>
        </div>
        <Navbar elements={elements}/>
    </>
}


const Seg1 = forwardRef((props: { contact?: Element }, ref: ForwardedRef<HTMLDivElement>) => {
    return <Section ref={ref} className={styles.seg1}>
        <h1>{`Welcome To Benjimin Clegg Therapy`}</h1>

        <div className={styles.content}>
            <Image
                src={portrait}
                alt="picture of therapist"
            ></Image>

            <div>
                <Text contact={props.contact}>{content.about_me}</Text>
            </div>
        </div>
    </Section>
})

Seg1.displayName = 'Seg1';

const Seg2 = forwardRef((props: { contact?: Element }, ref: ForwardedRef<HTMLDivElement>) => {
    return <Section ref={ref} className={styles.seg1}>
        <h1>{`What I Can Help With`}</h1>

        <div className={styles.content}>
            <p>I support people with, although not limited to:</p>

            <ul>
                {
                    content.areas.map((area, i) => {
                        return <li key={i}>{area}</li>
                    })
                }
            </ul>

            <Text contact={props.contact}>For more information or an issue not listed here please feel free to get in touch.</Text>
        </div>
    </Section>
})

Seg2.displayName = 'Seg2';

const Seg4 = forwardRef((props: { contact?: Element }, ref: ForwardedRef<HTMLDivElement>) => {
    return <Section ref={ref} className={styles.seg2}>
        <h1>Fees and Sessions</h1>

        <div className={styles.content}>
            <div>
                <Text contact={props.contact}>{content.fees}</Text>
            </div>
        </div>
    </Section>
})

Seg4.displayName = 'Seg4';

const Seg5 = forwardRef((_, ref: ForwardedRef<HTMLDivElement>) => {
    return <Section className={styles.seg5} ref={ref}>
        <ContactForm />
    </Section>
})

Seg5.displayName = 'Seg5';

const Seg6 = forwardRef((_, ref: ForwardedRef<HTMLDivElement>) => {
    return <Section className={styles.seg6} ref={ref}>
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d399.9186374850789!2d-0.21977838309016012!3d51.53399078553271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761038eedc2aed%3A0x9f5c0cc1b7e0ce16!2s15%20Station%20Terrace%2C%20London%20NW10%205RX!5e0!3m2!1sen!2suk!4v1732205519194!5m2!1sen!2suk" 
            width="600" 
            height="450" 
            className={styles.map}
            allowFullScreen={true}
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade" 
        />

        <div>
            <p>{`Phone:   ${content.phone}`}</p>
            <p>{`Email: ${content.email}`}</p>
            <p>{`My practice is in north west London, less than a one minute walk from kensal rise station.`}</p>
            <p>{`I also offer online sessions and telephone counselling.`}</p>
        </div>
    </Section>
})

Seg6.displayName = 'Seg6';

const Footer = () => {
    return <Section className={styles.footer}>
        <div>
            <code>
                {`Tel:   ${content.phone}\n`}
                {`Email: ${content.email}`}
            </code>
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
    </Section>
}

Footer.displayName = 'Footer';

const Text = forwardRef((props: { contact?: Element, children: string }, ref: ForwardedRef<HTMLParagraphElement>) => {
    const scrollTo = () => {
        if(!props.contact) return;
        const y = props.contact.getBoundingClientRect().top + window.scrollY - 105;
        window.scrollTo({top: y, behavior: 'smooth'});
    }

    return props.children.split("\n").map((line, i) => {
        const text = splitTextByWords(line, Object.keys(content.links));

        return <p key={i} ref={ref}>
            {
            text.map((text, i) => {
                const key = text.toLowerCase()

                if(key in content.links) {
                    const link = content.links[key as keyof typeof content.links];

                    if(link == "#contact") {
                        return <a key={i} onClick={scrollTo}>{text}</a>
                    } 

                    return <a key={i} href={link}>{text}</a>
                }

                return text
            })
            }
        </p>
    })
})


function splitTextByWords(text: string, words: string[]) {
    const pattern = new RegExp(`(${words.join('|')})`, 'gi');
    return text.split(pattern).filter(part => part !== '');
}

Text.displayName = 'Text';
