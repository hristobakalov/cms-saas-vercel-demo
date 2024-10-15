import { CmsComponent } from "@remkoj/optimizely-cms-react";
import {
  DividerElementDataFragmentDoc,
  type DividerElementDataFragment,
} from "@/gql/graphql";

/**
 * Divider
 *
 */
export const DividerElementElement: CmsComponent<
  DividerElementDataFragment
> = ({ data, children }) => {
  const componentName = "Divider";
  const componentInfo = "";
  return (
    <div className="relative w-full my-16">
      {/* Adjust spacing with my-8 */}
      <div className="absolute inset-0 flex justify-center" aria-hidden="true">
        <span className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#7b9ad7] to-transparent opacity-70"></span>
      </div>
    </div>
  );
};
DividerElementElement.displayName = "Divider (Element/DividerElement)";
DividerElementElement.getDataFragment = () => [
  "DividerElementData",
  DividerElementDataFragmentDoc,
];

export default DividerElementElement;
