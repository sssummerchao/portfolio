import Link from "next/link";
import styles from "./CaseStudyHtml.module.css";

type Props = {
  title: string;
  html: string;
};

export function CaseStudyHtml({ title, html }: Props) {
  return (
    <div className={`case-study-page ${styles.page}`}>
      <Link href="/" className={styles.home} aria-label="Back to home">
        ← Home
      </Link>
      <div
        className={`body case-study-html ${styles.content}`}
        // Trusted static fragment generated from our Webflow snapshot
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <span className={styles.srOnly}>{title}</span>
    </div>
  );
}
