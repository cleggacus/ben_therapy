import Section from "./Section";
import BlockRendererClient from "./BlocksRendererClient";
import { ForwardedRef, forwardRef } from "react";
import styles from "./ContactInfo.module.css"
import { SanityDocument } from "next-sanity";
import { client } from "../sanity/client";

const CONTACT_QUERY = `*[_type == "contact"][0]{ locationSrc, locationDetails }`;

const options = { next: { revalidate: 60 } };

const ContactInfo = forwardRef(async function ContactInfo(_, ref: ForwardedRef<HTMLDivElement>) {
  const data = await client.fetch<SanityDocument>(CONTACT_QUERY, {}, options);

  return <Section className={styles.container} ref={ref}>
    <iframe
      src={data.locationSrc}
      width="600"
      height="450"
      className={styles.map}
      allowFullScreen={true}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />

    <div>
      <BlockRendererClient content={data.locationDetails} />
    </div>
  </Section>
})

export default ContactInfo;
