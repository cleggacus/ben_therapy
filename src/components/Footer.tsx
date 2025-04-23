import styles from "./Footer.module.css"
import logoImage from "../images/logo.png";
import Image from "next/image";
import Section from "./Section";
import { client } from "../sanity/client";
import { SanityDocument } from "next-sanity";

const CONTACT_QUERY = `*[_type == "contact"][0]{ phone, email }`;

const options = { next: { revalidate: 60 } };

export default async function Footer() {
  const data = await client.fetch<SanityDocument>(CONTACT_QUERY, {}, options);

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
