import clsx from "clsx";
import Image from "next/image";

export function ProfileImage({ src, className }: { src?: string | null; className?: string }) {
  if (!src || src === "")
    return (
      <div
        className={clsx(
          `bg-muted flex items-center justify-center rounded-full object-cover text-sm font-semibold`,
          className
        )}
      >
        No Image
      </div>
    );

  return (
    <Image
      className={clsx(
        "flex flex-shrink-0 items-center justify-center rounded-full bg-card object-cover",
        { loading: "border border-teal-400 bg-green-700" },
        className
      )}
      src={src}
      alt="User account profile image"
      width={144}
      height={144}
      priority
    />
  );
}
