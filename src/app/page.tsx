import styles from "./page.module.css";
import Cover from '../components/Cover';
import Navbar from '../components/Navbar';
import Sections from "../components/Sections";
import { Seperator } from "../components/Section";
import ContactInfo from "../components/ContactInfo";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

export default function Home() {
  return <>
    <div className={styles.page}>
      <Cover />
      <Sections />
      <Seperator />
      <ContactForm />
      <Seperator />
      <ContactInfo />
      <Seperator />
      <Footer />
    </div>
    <Navbar />
  </>
}
