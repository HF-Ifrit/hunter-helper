import { faSort, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SortOption } from "./WeaponElementFilter";

export default function SortButton({
  field,
  sortOption = SortOption.NONE,
}: {
  field: string;
  sortOption?: SortOption;
}) {
  return (
    <div>
      <FontAwesomeIcon
        icon={
          sortOption === SortOption.ASC
            ? faSort
            : sortOption === SortOption.DESC
            ? faSortDown
            : faSort
        }
        className="mr-2"
        style={{ color: "black" }}
      />
      <button className="text-black">{field}</button>
    </div>
  );
}
