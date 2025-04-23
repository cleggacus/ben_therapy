import { client } from "../sanity/client";
import NavbarClient from "./NavbarClient";
import { SanityDocument } from "next-sanity";

const SECTIONS_QUERY = `*[_type == "section"]|order(orderRank){ title, slug }`;

const options = { next: { revalidate: 60 } };

export default async function Navbar() {
  const sections = await client.fetch<SanityDocument[]>(SECTIONS_QUERY, {}, options);

  return <NavbarClient sections={[
    { title: "Home", slug: "home" },
    ...sections.map((data: SanityDocument) => ({
      title: data.title,
      slug: data.slug.current,
    })),
    { title: "Contact", slug: "contact" }
  ]} />
}
