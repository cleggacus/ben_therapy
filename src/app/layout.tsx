import { SanityDocument } from "next-sanity";
import "./globals.css";
import { client } from "../sanity/client";
import urlBuilder from '@sanity/image-url'

const META_QUERY = `*[_type == "meta"][0]{ title, description, icon }`;

const options = { next: { revalidate: 60 } };

export async function generateMetadata() {
  const meta = await client.fetch<SanityDocument>(META_QUERY, {}, options);
  const icon = urlBuilder(client).image(meta.icon).url();

  return {
    title: meta.title,
    description: meta.description,
    icons: {
      icon,
    },
  }
}

type Props = Readonly<{
  children: React.ReactNode;
}>

export default function RootLayout(props: Props) {
  return <html lang="en">
    <body>
      {props.children}
    </body>
  </html>
}
