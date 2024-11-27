import type { Metadata } from "next";
import "./globals.css";
import { client } from "../api";
import { unstable_cache } from 'next/cache'

export const generateMetadata = unstable_cache(
    async (): Promise<Metadata> => {
        const response =  await client.GET("/meta", {
            params: {
                query: {
                    populate: "icon"
                }
            }
        });

        console.log(response.data)

        if(!response.data || !response.data.data) return {};

        const data = response.data.data;

        return {
            title: data.title,
            description: data.description,
            icons: `${process.env.STRAPI_URL}${data.icon?.url}`,
        }
    }, 
    ["meta"], 
    {
        revalidate: 3600, 
        tags: ["meta"]
    }
);

type Props = Readonly<{
    children: React.ReactNode;
}>

export default function RootLayout(props: Props) {
    return <html lang="en">
        <body>
            { props.children }
        </body>
    </html>
}

