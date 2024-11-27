"use client";

import styles from "./Cover.module.css"
import { ForwardedRef, forwardRef, useEffect, useRef } from 'react';
import Link from 'next/link';

type Props = {
    title: string,
    imgSrc: string,
}

const CoverClient = forwardRef(function CoverClient(props: Props, ref: ForwardedRef<HTMLDivElement>) {
    const imageRef = useRef<HTMLImageElement>(null);

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

    return <div id="home" ref={ref} className={styles.container}>
        <img
            ref={imageRef}
            src={props.imgSrc}
            alt="cover image"
        />

        <div className={styles.content}>
            <h1>{props.title}</h1>
            <Link href="/#contact"><button>Free Consultation</button></Link>
        </div>
    </div>
});

export default CoverClient;
