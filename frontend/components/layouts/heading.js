import styles from "../../styles/Home.module.css";
import Link from "next/link";

function Heading({ title, breadcrumb }) {
  return (
    <div className={styles.heading}>
      <h1>{title}</h1>
      <p className={styles.breadcrum}>
        <Link href="/">
          <a>{breadcrumb}</a>
        </Link>
      </p>
    </div>
  );
}

export default Heading;
