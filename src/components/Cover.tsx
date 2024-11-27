import { ForwardedRef, forwardRef } from "react"
import CoverClient from "./CoverClient";

import { client } from "../api";
import { unstable_cache } from 'next/cache'

const getData = unstable_cache(
    async() => {
        const response =  await client.GET("/cover", {
            params: {
                query: {
                    populate: "image"
                }
            }
        });

        const data = response.data?.data;

        return {
            title: data?.title ?? "",
            imgSrc: `${process.env.STRAPI_URL}${data?.image?.url}`,
        }
    },
    ["cover"],
    {
        revalidate: 60, 
        tags: ["cover"]
    }
)

const Cover = forwardRef(async function Cover(_, ref: ForwardedRef<HTMLDivElement>) {
    const data = await getData();

    return <CoverClient
        ref={ref}
        { ...data }
    />
});

export default Cover;
