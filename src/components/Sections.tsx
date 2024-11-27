import { ForwardedRef, forwardRef } from "react";
import styles from "./Sections.module.css"
import Section, { Seperator } from "./section";
import { unstable_cache } from "next/cache";
import { client } from "@/src/api";
import { type BlocksContent } from "@strapi/blocks-react-renderer";
import BlockRendererClient from "./BlocksRendererClient";

const getData = unstable_cache(
    async() => {
        const response =  await client.GET("/sections", {
            params: {
                query: {
                    populate: "*"
                }
            }
        });

        const data = response.data?.data ?? [];

        return data.map(element => {
            return {
                content: element.content as BlocksContent,
                title: element.title ?? ""
            }
        });
    },
    ["sections"],
    {
        revalidate: 60, 
        tags: ["sections"]
    }
)

export default forwardRef(async function AboutMe(_, ref: ForwardedRef<HTMLDivElement>) {
    const sections = await getData();

    return sections.map((data, i) => 
        <>
            <Section ref={ref} key={i} className={styles.container} id={data.title.split(' ').join('_').toLowerCase()}>
                <BlockRendererClient content={data.content} />
            </Section>

            {
                (i < sections.length - 1) && <Seperator/>
            }
        </>
    )
})
