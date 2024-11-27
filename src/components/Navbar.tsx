import { unstable_cache } from "next/cache";
import { client } from "../api";
import NavbarClient from "./NavbarClient";

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

        return [
            "home",
            ...data.map(element => 
                element.title ?? ""
            ),
            "contact"
        ];
    },
    ["sections"],
    {
        revalidate: 60, 
        tags: ["sections"]
    }
)

export default async function Navbar() {
    const sections = await getData();

    return <NavbarClient sections={sections}/>
}
