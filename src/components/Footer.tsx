import { unstable_cache } from "next/cache";
import styles from "./Footer.module.css"
import { client } from "../api";
import logoImage from "../images/logo.png";
import Image from "next/image";
import Section from "./section";

const getData = unstable_cache(
    async() => {
        const response =  await client.GET("/contact");

        const data = response.data?.data;

        return {
            phone: data?.phone ?? "",
            email: data?.email ?? "",
        }
    },
    ["contact"],
    {
        revalidate: 60, 
        tags: ["contact"]
    }
);

export default async function Footer() {
    const data = await getData();

    return <Section className={styles.container}>
        <div>
            <code>
                {`Tel:   ${data.phone}\n`}
                {`Email: ${data.email}`}
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
