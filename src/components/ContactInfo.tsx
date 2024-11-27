import { client } from "../api";
import { unstable_cache } from 'next/cache'
import Section from "./section";
import BlockRendererClient from "./BlocksRendererClient";
import { ForwardedRef, forwardRef } from "react";
import styles from "./ContactInfo.module.css"
import { type BlocksContent } from "@strapi/blocks-react-renderer";

const getData = unstable_cache(
    async() => {
        const response =  await client.GET("/contact");

        const data = response.data?.data;

        return {
            map: data?.map ?? "",
            content: data?.description as BlocksContent
        }
    },
    ["contact"],
    {
        revalidate: 60, 
        tags: ["contact"]
    }
);

const ContactInfo = forwardRef(async function ContactInfo(_, ref: ForwardedRef<HTMLDivElement>) {
    const data = await getData();

    return <Section className={styles.container} ref={ref}>
        <iframe 
            src={data.map}
            width="600" 
            height="450" 
            className={styles.map}
            allowFullScreen={true}
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade" 
        />

        <div>
            <BlockRendererClient content={data.content}/>
        </div>
    </Section>
})

export default ContactInfo;

