import {
  faSort,
  faSortDown,
  faSortUp,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SortOption } from "./WeaponElementFilter";

const iconMap = new Map<SortOption, IconDefinition>([
  [1, faSortUp],
  [-1, faSortDown],
  [0, faSort],
]);

export default function SortButton({
  fieldName,
  sortOption,
  updateSortOption,
}: {
  fieldName: string;
  sortOption: { fieldName: string; sort: SortOption };
  updateSortOption: (fieldName: string) => void;
}) {
  return (
    <div className="rounded-full border-2 border-black shadow-lg p-2 hover:bg-foreground">
      <FontAwesomeIcon
        icon={
          sortOption.fieldName === fieldName
            ? (iconMap.get(sortOption.sort) as IconDefinition)
            : faSort
        }
        className="mr-2"
        style={{ color: "black" }}
      />
      <button
        className="text-black font-bold capitalize"
        onClick={() => updateSortOption(fieldName)}
      >
        {fieldName}
      </button>
    </div>
  );
}
