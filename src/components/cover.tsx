"use client";

import Image from 'next/image'
import coverImage from "../images/cover.jpg";
import styles from "./cover.module.css"
import content from "../../content";
import { ForwardedRef, forwardRef, useEffect, useRef } from 'react';

type Props = {
    contact?: Element
}

const Cover = forwardRef((props: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const imageRef = useRef<HTMLImageElement>(null);

    const scrollTo = (element?: Element) => {
        if(!element) return;

        const y = element.getBoundingClientRect().top + window.scrollY - 105;
        window.scrollTo({top: y, behavior: 'smooth'});
    }

    const setTop = (top: number) => {
        if(!imageRef.current) return;
        imageRef.current.style.marginTop = `${top * 0.5}px`;
    }

    useEffect(() => {
        setTop(window.scrollY);

        const handleScroll = () =>  {
            setTop(window.scrollY);
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return <div ref={ref} className={styles.container}>
        <Image
            ref={imageRef}
            src={coverImage}
            alt="cover image"
        />

        <div className={styles.content}>
            <h1>{content.cover.title}</h1>
            <button onClick={() => scrollTo(props.contact)}>Free Consultation</button>
        </div>
    </div>
});

Cover.displayName = "Cover";

export default Cover;


