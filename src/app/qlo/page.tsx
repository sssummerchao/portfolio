import Link from "next/link";
import type { Metadata } from "next";
import styles from "./qlo.module.css";

export const metadata: Metadata = {
  title: "Qlo",
};

const IMG = "/images/case-studies/qlo";

const challenges = [
  {
    emoji: `${IMG}/6771c2d370bb4454238c3137_Exploding-Head-Emoji.png`,
    title: "Overwhelming choices",
    text: "When the items don’t align with their style or needs",
  },
  {
    emoji: `${IMG}/6771c02ec92ae534e8a75b82_Emoji-Dress.png`,
    title: "Inconsistent sizing",
    text: "Sizes vary between different and same brands",
  },
  {
    emoji: `${IMG}/6771c2d300543d5d2c842a17_Hourglass-Flowing-Sand-Emoji.png`,
    title: "Fitting room hold up",
    text: "Long lines of wait",
  },
  {
    emoji: `${IMG}/6771c2d3bb8eac98d78f350f_Nail-Care-Emoji.png`,
    title: "Lack of personalization",
    text: "Suggestions not based on personal preference",
  },
];

export default function QloPage() {
  return (
    <div className={styles.page}>
      <Link href="/" className={styles.home}>
        ← Home
      </Link>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.intro}>
            <h1 className={styles.title}>Qlo</h1>
            <p className={styles.meta}>4 weeks / 2025</p>
            <p className={styles.paragraph}>
              Qlo provides a more personalized shopping experiences through
              conversational AI, photorealistic try on, and AR-enabled smart
              mirrors. I led the design and prototype of the smart mirror.
            </p>
            <div className={styles.metaGrid}>
              <div>
                <p className={styles.smallTitle}>Role</p>
                <p className={styles.paragraph}>
                  Experience Design
                  <br />
                  Prototyping
                  <br />
                  Video Editing
                </p>
              </div>
              <div>
                <p className={styles.smallTitle}>Team</p>
                <p className={styles.paragraph}>
                  Deeya Parikh
                  <br />
                  Eldar Gilmanov
                  <br />
                  Sanjali Jain
                </p>
              </div>
              <div>
                <p className={styles.smallTitle}>Tools</p>
                <p className={styles.paragraph}>
                  Figma
                  <br />
                  After Effect
                  <br />
                  Photoshop
                </p>
              </div>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.heroImg}
            src={`${IMG}/qlo-cover.jpg`}
            alt=""
          />
          <div className={styles.divider} />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Problem</p>
          <h2 className={styles.title}>
            Shoppers struggle both online and in-store
          </h2>
          <p className={styles.paragraphWide}>
            Based on field research and customer interviews, we found out that
            shoppers have 4 key challenges across both online and in-store
            experiences:
          </p>
          <div className={styles.challengeGrid}>
            {challenges.map((item) => (
              <div key={item.title} className={styles.challengeCard}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={styles.emoji} src={item.emoji} alt="" />
                <p className={styles.challengeTitle}>{item.title}</p>
                <p className={styles.challengeText}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.title}>
            Qlo is here for all your shopping needs!
          </h2>
          <p className={styles.eyebrow}>personal shopping assistant</p>
          <p className={styles.paragraphWide}>
            QLO enhances online and in-store shopping by integrating SpreeAI’s
            technology to provide personalized outfit recommendations, AI-driven
            size predictions, virtual try-ons, and contextual guidance.
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.contentImg}
            src={`${IMG}/677600787844b403614097bf_QLO-Splash-Crop.gif`}
            alt=""
          />

          <div className={styles.feature}>
            <h3 className={styles.featureTitle}>
              1. Context aware recommendations
            </h3>
            <p className={styles.paragraphWide}>
              Qlo asks for contextual information to better understand user needs
              in order to provide more personalized recommendations to shoppers.
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.contentImg}
              src={`${IMG}/677399fc6bb433510874e6c9_CUi1-Crop-GIF.gif`}
              alt=""
            />
          </div>

          <div className={styles.feature}>
            <h3 className={styles.featureTitle}>2. Photorealistic try-on</h3>
            <p className={styles.paragraphWide}>
              Through SpreeAI’s photorealistic try-on, Qlo will predicts how the
              garment will fit using a heat map which provides a more
              personalized and confident shopping experience.
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.contentImg}
              src={`${IMG}/67739b290c3ae5ed953abc04_CUI2-Crop-GIF.gif`}
              alt=""
            />
          </div>
        </div>
      </section>

      <section className={styles.section} id="mirror">
        <div className={styles.container}>
          <h2 className={styles.title}>Qlo for in-store shopping</h2>
          <p className={styles.paragraphWide}>
            Customers value hands-on interaction with clothes. Conversation AI
            provides a more accessible service without disrupting the natural
            shopping experience.
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.contentImg}
            src={`${IMG}/6775a8d27074f70771e10d98_mirror-break-down.jpg`}
            alt=""
          />

          <div className={styles.feature}>
            <h3 className={styles.featureTitle}>1. Onboarding</h3>
            <p className={styles.paragraphWide}>
              Clear instructions on the mirror to guide users to place their item
              on the RFID sensor.
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.contentImg}
              src={`${IMG}/67759874a8f9e53f7e8a20ab_Mirror-Demo-GIF-from-ezgif.com.gif`}
              alt=""
            />
          </div>

          <div className={styles.feature}>
            <h3 className={styles.featureTitle}>2. Outfit recommendations</h3>
            <p className={styles.paragraphWide}>
              Different outfit options based on the scanned items. Shoppers can
              also see product details for each outfit.
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.contentImg}
              src={`${IMG}/6775dea0a262e00a404a0504_mirror-outfit.gif`}
              alt=""
            />
          </div>

          <div className={styles.feature}>
            <h3 className={styles.featureTitle}>3. SpreeAI log in support</h3>
            <p className={styles.paragraphWide}>
              Provide outfit recommendation to every shoppers, but only for
              SpreeAI users can log in to their account to activate virtual try
              on.
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.contentImg}
              src={`${IMG}/6775e136a262e00a404b5ee4_Mirror-spree-log-in.gif`}
              alt=""
            />
          </div>

          <div className={styles.feature}>
            <h3 className={styles.featureTitle}>4. Virtual try on</h3>
            <p className={styles.paragraphWide}>
              Utilize SpreeAI&apos;s size prediction heat map to better explain
              the fitting.
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.contentImg}
              src={`${IMG}/6775de9dc90d83a886623713_mirror-heat-map.gif`}
              alt=""
            />
          </div>
        </div>
      </section>

      <section className={styles.footer}>
        <div className={styles.footerIcon}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.logo}
            src="/images/logo.png"
            width={80}
            height={80}
            alt=""
          />
        </div>
      </section>
    </div>
  );
}
