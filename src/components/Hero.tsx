import styles from "./Hero.module.css";

const LINKS = [
  {
    label: "Resume",
    href: "https://drive.google.com/file/d/1nKTq6kQ2s8M2pfSVd6D4xU0qudHct9Ta/view?usp=sharing",
    external: true,
  },
  {
    label: "Email",
    href: "mailto:ch.summer612@gmail.com?subject=Hey%2C%20let%27s%20chat!",
    external: false,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/summer-chao-920547158",
    external: true,
  },
] as const;

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.grid}>
        <div className={styles.nameBlock}>
          <p className={styles.title}>
            Summer Chao
            <br />
          </p>
        </div>
        <div>
          <p className={styles.bio}>
            I’m an interaction designer and prototyper exploring how technology
            can create more meaningful connections between people, environments,
            and intelligent systems. I use rapid prototyping and experimentation
            to turn emerging technologies and ambiguous ideas into tangible,
            human-centered experiences.
            <br />
          </p>
        </div>
        <div className={styles.links}>
          {LINKS.map((link) => (
            <div key={link.label} className={styles.linkWrap}>
              <a
                className={styles.link}
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <div className={styles.linkText}>{link.label}</div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
