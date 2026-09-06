interface SectionHeadingProps {
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={`max-w-2xl mb-12 md:mb-14 ${
        align === "center" ? "mx-auto text-center" : ""
      }`}
    >
      <h2 className="font-[var(--font-display)] font-semibold tracking-tight text-[var(--color-text)] text-2xl sm:text-3xl md:text-[2.1rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[var(--color-text-muted)] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
