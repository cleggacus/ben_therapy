import { ForwardedRef, forwardRef, ReactNode } from "react"
import styles from "./section.module.css"

export type SectionProps = {
    children?: ReactNode,
    className?: string
}

const Section = forwardRef((props: SectionProps, ref: ForwardedRef<HTMLDivElement>) => {
    return <div className={`${styles.container} ${props.className ?? ""}`}>
        { props.children }
    </div>
});

export default Section;

export function Seperator() {
    return <Section className={styles.seperator}>
        <div></div>
    </Section>
}
