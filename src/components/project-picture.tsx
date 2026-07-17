import type { ImgHTMLAttributes } from "react";
import type { Project } from "@/lib/portfolio-content";

type ProjectPictureProps = {
  project: Project;
  className?: string;
  pictureClassName?: string;
  sizes?: string;
  loading?: ImgHTMLAttributes<HTMLImageElement>["loading"];
  decoding?: ImgHTMLAttributes<HTMLImageElement>["decoding"];
  fetchPriority?: "high" | "low" | "auto";
};

export default function ProjectPicture({
  project,
  className,
  pictureClassName,
  sizes,
  loading = "lazy",
  decoding = "async",
  fetchPriority,
}: ProjectPictureProps) {
  return (
    <picture className={pictureClassName}>
      {project.imageAvif ? <source srcSet={project.imageAvif} type="image/avif" /> : null}
      <img
        src={project.image}
        alt={project.imageAlt}
        width={project.imageWidth}
        height={project.imageHeight}
        loading={loading}
        decoding={decoding}
        sizes={sizes}
        fetchPriority={fetchPriority}
        className={className}
      />
    </picture>
  );
}
