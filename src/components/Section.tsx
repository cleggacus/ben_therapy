import { ForwardedRef, forwardRef, ReactNode } from "react"
import styles from "./Section.module.css"

export type SectionProps = {
  id?: string,
  children?: ReactNode,
  className?: string
}

const Section = forwardRef((props: SectionProps, ref: ForwardedRef<HTMLDivElement>) => {
  return <div id={props.id} ref={ref} className={`${styles.container} ${props.className ?? ""}`}>
    {props.children}
  </div>
});

Section.displayName = "Section";

export default Section;

export function Seperator() {
  return <Section className={styles.seperator}>
    <div></div>
  </Section>
}
