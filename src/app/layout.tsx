import type { Metadata } from "next";
import "./globals.css";
import content from "../../content";

type Props = Readonly<{
    children: React.ReactNode;
}>

export const metadata: Metadata = {
    title: content.title,
    description: content.description,
};

export default function RootLayout(props: Props) {
    return <html lang="en">
        <body>
            { props.children }
        </body>
    </html>
}

