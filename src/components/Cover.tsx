import { ForwardedRef, forwardRef } from "react"
import CoverClient from "./CoverClient";
import { SanityDocument } from "next-sanity";
import { client } from "../sanity/client";

const COVER_QUERY = `*[_type == "cover"][0]{ title, image }`

const options = { next: { revalidate: 60 } };

const Cover = forwardRef(async function Cover(_, ref: ForwardedRef<HTMLDivElement>) {
  const data = await client.fetch<SanityDocument>(COVER_QUERY, {}, options);

  return <CoverClient
    ref={ref}
    title={data.title}
    image={data.image}
  />
});

export default Cover;
