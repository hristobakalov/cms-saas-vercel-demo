import { type ComponentProps } from "react";
import Button from "@/components/shared/button";
import Link from "next/link";
import { type LinkDataFragment } from "@/gql/graphql";

export type BaseCTAProps = {
  href?: LinkDataFragment | null;
  text?: string | null;
  buttonType?: ComponentProps<typeof Button>["buttonType"] | "link";
  buttonColor?: ComponentProps<typeof Button>["buttonColor"];
} & Omit<JSX.IntrinsicElements["div"], "href" | "text">;

export function BaseCTA({
  href,
  text = "Call-to-action",
  buttonType = "primary",
  buttonColor = "default",
  className,
  ...additionalProps
}: BaseCTAProps) {
  const hrefUrl = href
    ? new URL(href.default ?? "/", href.base ?? "https://example.com")
    : undefined;

  if (!hrefUrl)
    return (
      <div className="cta w-full" {...additionalProps}>
        <span className={className}>{text}</span>
      </div>
    );

  return (
    <div className="cta w-full" {...additionalProps}>
      {buttonType == "link" ? (
        <Link href={hrefUrl} className={className}>
          {text ? (
            <>{text}</> // Render the text if it exists
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 150 150" // Keep the viewBox according to your custom path
              fill="none"
              className="w-12 h-12" // Increased size to make the arrow bigger
            >
              <path
                d="M150,75C150,33.58,116.35,0,74.83,0,35.53,0,3.32,30.12,0,68.48h81.17c-10.9-9.57-17.82-23.54-17.82-39.13h13.07c0,21.58,17.59,39.13,39.22,39.13v13.04c-21.63,0-39.22,17.55-39.22,39.13h-13.07c0-15.57,6.87-29.56,17.74-39.13H0c3.32,38.36,35.53,68.48,74.83,68.48,41.51,0,75.17-33.58,75.17-75Z"
                fill="#ffffff" // This makes the arrow white
              />
            </svg>
          )}
        </Link>
      ) : (
        <Link href={hrefUrl}>
          {text ? (
            <>{text}</> // Render the text if it exists
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 150 150" // Keep the viewBox according to your custom path
              fill="none"
              className="w-12 h-12" // Increased size to make the arrow bigger
            >
              <path
                d="M150,75C150,33.58,116.35,0,74.83,0,35.53,0,3.32,30.12,0,68.48h81.17c-10.9-9.57-17.82-23.54-17.82-39.13h13.07c0,21.58,17.59,39.13,39.22,39.13v13.04c-21.63,0-39.22,17.55-39.22,39.13h-13.07c0-15.57,6.87-29.56,17.74-39.13H0c3.32,38.36,35.53,68.48,74.83,68.48,41.51,0,75.17-33.58,75.17-75Z"
                fill="#ffffff" // This makes the arrow white
              />
            </svg>
          )}
        </Link>
      )}
    </div>
  );
}

export default BaseCTA;
