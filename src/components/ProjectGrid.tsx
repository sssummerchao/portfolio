import { projects } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";
import styles from "./ProjectGrid.module.css";

const COLUMNS = ["left", "middle", "right"] as const;

export function ProjectGrid() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.grid}>
        <div className={styles.columns}>
          {COLUMNS.map((column) => (
            <div key={column} className={styles.column}>
              {projects
                .filter((project) => project.column === column)
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
