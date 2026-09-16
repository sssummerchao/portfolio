"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/content/projects";
import styles from "./ProjectCard.module.css";

type Props = {
  project: Project;
};

const aspectClass: Record<Project["aspect"], string> = {
  "1": styles.aspect1,
  "3/2": styles.aspect32,
  "4/3": styles.aspect43,
  "16/15": styles.aspect1615,
  "16/9": styles.aspect169,
  auto: styles.aspectAuto,
};

export function ProjectCard({ project }: Props) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const isExternal = project.link.kind === "external";
  const mediaClass = `${styles.media} ${aspectClass[project.aspect]}`;
  const imageClass = `${styles.image} ${loaded ? styles.imageLoaded : ""}`;

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const img = imgRef.current;
    if (!(img?.complete && img.naturalWidth > 0)) return;
    // Still ease in when the image is already cached
    const id = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(id);
  }, [project.image]);

  const inner = (
    <div className={styles.item}>
      <div className={mediaClass}>
        {/* eslint-disable-next-line @next/next/no-img-element -- GIFs need native img */}
        <img
          ref={imgRef}
          className={imageClass}
          src={project.image}
          alt=""
          loading="lazy"
          onLoad={handleLoad}
        />
      </div>
      <h3 className={styles.title}>{project.title}</h3>
      <h3 className={styles.tag}>{project.tag}</h3>
      {project.award ? (
        <h3 className={styles.award}>{project.award}</h3>
      ) : null}
    </div>
  );

  if (isExternal) {
    return (
      <a
        className={styles.card}
        href={project.link.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {inner}
      </a>
    );
  }

  return (
    <Link className={styles.card} href={project.link.href}>
      {inner}
    </Link>
  );
}
