"use client";

import { PortableText } from "next-sanity";
import urlBuilder from '@sanity/image-url'
import { client } from "../sanity/client";
import Link from 'next/link';

export default function BlockRendererClient({
  content,
}: {
  // eslint-disable-next-line
  content: any;
}) {
  if (!content) return <></>;

  const myPortableTextComponents = {
    types: {
      // eslint-disable-next-line
      image: ({ value, isInline }: any) => {
        return <img
          src={urlBuilder(client).image(value).width(isInline ? 100 : 800).fit('max').auto('format').url()}
        />
      },
    },
    marks: {
      // eslint-disable-next-line
      internalLink: ({ children, value: { anchor } }: any) => {
        return <Link
          scroll={false}
          href={`/${anchor}`}
        >{children}</Link>
      }
    }
  }
  return <div>
    <PortableText
      value={content}
      components={myPortableTextComponents}
    />
  </div>
}
