import { ForwardedRef, forwardRef } from "react";
import styles from "./Sections.module.css"
import Section, { Seperator } from "./Section";
import BlockRendererClient from "./BlocksRendererClient";
import { client } from "../sanity/client";
import { SanityDocument } from "next-sanity";

const SECTIONS_QUERY = `*[_type == "section"]|order(orderRank){ title, slug, body }`;

const options = { next: { revalidate: 60 } };

export default forwardRef(async function Sections(_, ref: ForwardedRef<HTMLDivElement>) {
  const sections = await client.fetch<SanityDocument[]>(SECTIONS_QUERY, {}, options);

  return sections.map((data, i) =>
    <>
      <Section ref={ref} key={i} className={styles.container} id={data.slug.current}>
        <BlockRendererClient content={data.body} />
      </Section>

      {
        (i < sections.length - 1) && <Seperator />
      }
    </>
  )
})
