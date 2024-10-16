import "server-only";
import { type ImageElementDataFragment } from "@/gql/graphql";
//import Image from 'next/image'
import { extractSettings } from "@remkoj/optimizely-cms-react/components";

// To be moved to library
import Image from "@/components/shared/cms_image";
import {
  type IconImageElementComponent,
  ImageElementLayoutProps,
  IconImageElementProps,
} from "./displayTemplates";

export const IconImageElement: IconImageElementComponent<
  ImageElementDataFragment
> = ({ data: { altText, imageLink }, layoutProps, ...props }) => {
  const { roundedCorners = "none", size = "small" } =
    extractSettings(layoutProps);
  const cssClasses: Array<string> = ["not-prose relative"];

  switch (roundedCorners) {
    case "small":
      cssClasses.push("rounded");
      break;
    case "medium":
      cssClasses.push("rounded-md");
      break;
    case "full":
      cssClasses.push("rounded-full");
      break;
    default:
      // No rounded classes
      break;
  }

  switch (size) {
    case "small":
      cssClasses.push("w-8 h-8");
      break;
    case "medium":
      cssClasses.push("w-12 h-12");
      break;
    case "large":
      cssClasses.push("w-38 h-20 justify-start flex");
      break;
    default:
      cssClasses.push("w-8 h-8");
      break;
  }

  return (
    <div className={cssClasses.join(" ")} {...props}>
      <Image
        alt={altText ?? ""}
        src={imageLink}
        fill
        className="object-contain"
      />
    </div>
  );
};

export function isIconImageLayout(
  layoutProps: ImageElementLayoutProps | undefined | null
): layoutProps is IconImageElementProps {
  return layoutProps?.template == "IconImageElement";
}

export default IconImageElement;
