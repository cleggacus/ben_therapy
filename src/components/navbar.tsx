import styles from "./navbar.module.css"
import content from "../../content";

export type NavbarElements = {
    home?: Element,
    about_me?: Element,
    therapy?: Element,
    faq?: Element,
    contact?: Element,
}

type Props = {
    elements: NavbarElements
}

export default function Navbar(props: Props) {
    const scrollTo = (element?: Element) => {
        if(!element) return;

        const y = element.getBoundingClientRect().top + window.scrollY - 105;
        window.scrollTo({top: y, behavior: 'smooth'});
    }

    return <div className={`${styles.container}`}>
        <div className={styles.left}>
            <h1>{content.navbar.title}</h1>
        </div>

        <ul>
            <li onClick={() => scrollTo(props.elements.home)}>Home</li>
            <li onClick={() => scrollTo(props.elements.about_me)}>About Me</li>
            <li onClick={() => scrollTo(props.elements.therapy)}>Therapy</li>
            <li onClick={() => scrollTo(props.elements.faq)}>FAQ</li>
            <li onClick={() => scrollTo(props.elements.contact)}>Contact</li>
        </ul>
    </div>
}
