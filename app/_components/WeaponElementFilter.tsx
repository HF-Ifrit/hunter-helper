import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../helpers";
import RequiredMaterialsList from "./RequiredMaterialsList";
import SortButton from "./SortButton";
import WeaponCard from "./WeaponCard";
import { debounce } from "./utils";

const TYPES = [
  "great-sword",
  "dual-blades",
  "lance",
  "charge-blade",
  "heavy-bowgun",
  "long-sword",
  "sword-and-shield",
  "hunting-horn",
  "gunlance",
  "insect-glaive",
  "light-bowgun",
  "bow",
  "hammer",
  "switch-axe",
];
const SORT_FIELDS = ["name", "attack", "element", "affinity", "rarity"];
const FIELD_SORT_FUNCTIONS: {
  [key: string]: (a: Weapon, b: Weapon) => number;
} = {
  attack: (a: Weapon, b: Weapon) => a.attack.display - b.attack.display,
  affinity: (a: Weapon, b: Weapon) => {
    const aAffinity = a.attributes?.affinity ?? 0;
    const bAffinity = b.attributes?.affinity ?? 0;
    return aAffinity - bAffinity;
  },
  element: (a: Weapon, b: Weapon) => {
    const aElement = a.elements[0]?.damage;
    const bElement = b.elements[0]?.damage;
    return aElement - bElement;
  },
};

export enum SortOption {
  ASC = 1,
  DESC = -1,
  NONE = 0,
}

export default function WeaponElementFilter({
  element,
}: {
  element: ElementType;
}) {
  const [showHiddenElementWeapons, setShowHiddenElementWeapons] =
    useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<{
    fieldName: string;
    sort: SortOption;
  }>({ fieldName: "name", sort: SortOption.NONE });
  const [selectedWeaponTypes, setSelectedWeaponTypes] = useState<
    Map<string, boolean>
  >(new Map(TYPES.map((type) => [type, true])));
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);

  const {
    data: weaponData,
    isLoading,
  }: { data: Weapon[]; isLoading: boolean } = useSWR(
    `https://mhw-db.com/weapons?q={"elements.type": "${element}"}`,
    fetcher
  );

  if (isLoading) return <div>Loading weapon data...</div>;

  const filteredWeaponData: Weapon[] | [] = weaponData
    .filter((weapon) =>
      showHiddenElementWeapons
        ? true
        : !weapon.elements.some((element) => element.hidden)
    )
    .filter((weapon) => selectedWeaponTypes.get(weapon.type))
    .filter((weapon) =>
      searchTerm.length ? weapon.name.toLowerCase().includes(searchTerm) : true
    )
    .sort(
      (a, b) =>
        sortOption.sort *
        (typeof a[sortOption.fieldName as keyof Weapon] === "number"
          ? (a[sortOption.fieldName as keyof Weapon] as number) -
            (b[sortOption.fieldName as keyof Weapon] as number)
          : typeof a[sortOption.fieldName as keyof Weapon] === "string"
          ? (a[sortOption.fieldName as keyof Weapon] as string).localeCompare(
              b[sortOption.fieldName as keyof Weapon] as string
            )
          : FIELD_SORT_FUNCTIONS[sortOption.fieldName](a, b))
    );

  const updateSortOption = (fieldName: string) => {
    if (sortOption.fieldName === fieldName) {
      setSortOption({
        fieldName,
        sort:
          sortOption.sort === SortOption.ASC
            ? SortOption.DESC
            : sortOption.sort === SortOption.DESC
            ? SortOption.NONE
            : SortOption.ASC,
      });
    } else {
      setSortOption({ fieldName, sort: SortOption.ASC });
    }
  };

  return (
    <>
      {!isLoading && weaponData.length > 0 && (
        <div id="overallContainer" className="flex">
          <div
            id="weaponFilterContainer"
            className="flex flex-col flex-wrap bg-lightbrown border-black border-2 rounded p-2 w-fit"
          >
            <div id="weaponButtons" className="flex justify-center">
              <div
                id="weaponButtons-select-unselect"
                className="flex items-center gap-x-2"
              >
                <button
                  className="border-2 border-black rounded p-2 h-1/2 text-black shadow-xl font-montserrat font-bold hover:bg-foreground"
                  onClick={() => {
                    const newMap = new Map(selectedWeaponTypes);
                    newMap.forEach((value, key) => {
                      newMap.set(key, true);
                    });
                    setSelectedWeaponTypes(newMap);
                  }}
                >
                  Select All
                </button>
                <button
                  className="border-2 border-black rounded p-2 h-1/2 text-black shadow-xl font-montserrat font-bold hover:bg-foreground"
                  onClick={() => {
                    const newMap = new Map(selectedWeaponTypes);
                    newMap.forEach((value, key) => {
                      newMap.set(key, false);
                    });
                    setSelectedWeaponTypes(newMap);
                  }}
                >
                  Unselect All
                </button>
              </div>
              {TYPES.map((type) => (
                <button
                  key={`weapon-type-${type}`}
                  className={`flex border-black border-2 shadow drop-shadow-lg shadow-black bg-darkbrown m-2 p-2 rounded ${
                    selectedWeaponTypes.get(type)
                      ? ""
                      : "opacity-50 hover:opacity-75"
                  }`}
                  onClick={() => {
                    const newMap = new Map(selectedWeaponTypes);
                    newMap.set(type, !newMap.get(type));
                    setSelectedWeaponTypes(newMap);
                  }}
                >
                  <Image
                    key={`weapon-type-${type}`}
                    src={`/weapons/${type.toLowerCase()}-icon.webp`}
                    alt={type}
                    width={40}
                    height={40}
                  />
                </button>
              ))}
            </div>
            <div
              id="filterControls"
              className="flex items-center ml-2 mb-4 gap-x-28"
            >
              <div
                id="hiddenElementToggle"
                className="flex items-center px-1 border border-transparent hover:border hover:border-black hover:rounded hover:bg-foreground"
              >
                <input
                  id="hiddenElementToggle-checkbox"
                  type="checkbox"
                  checked={showHiddenElementWeapons}
                  onChange={() =>
                    setShowHiddenElementWeapons(!showHiddenElementWeapons)
                  }
                  className="mr-2 accent-black"
                />
                <label
                  htmlFor="hiddenElementToggle-checkbox"
                  className="text-black font-montserrat font-bold cursor-pointer"
                >
                  Show Hidden Element Weapons
                </label>
              </div>
              <div
                id="searchBar"
                className="justify-items-center items-center ml-2 pl-4 pb-1 border-b-2 w-1/3"
              >
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="mr-2"
                  style={{ color: "black" }}
                />
                <input
                  type="text"
                  className="bg-transparent text-gray-400 focus:outline-none"
                  placeholder="Search by weapon name..."
                  onChange={(e) => {
                    debounce(setSearchTerm, 1000)(e.target.value);
                  }}
                />
              </div>
              <div
                id="sortButtons"
                className="flex flex-wrap gap-x-2 gap-y-1 items-center"
              >
                {SORT_FIELDS.map((fieldName) => (
                  <SortButton
                    key={`sort-button-${fieldName}`}
                    fieldName={fieldName}
                    sortOption={sortOption}
                    updateSortOption={updateSortOption}
                  />
                ))}
              </div>
            </div>
            <div
              id="weaponCards"
              className="grid grid-cols-3 gap-4 max-h-screen overflow-y-auto"
            >
              {filteredWeaponData &&
                filteredWeaponData.map((weapon) => (
                  <WeaponCard
                    key={weapon.id}
                    weapon={weapon}
                    onClick={() => setSelectedWeapon(weapon)}
                  />
                ))}
            </div>
          </div>
          {selectedWeapon && <RequiredMaterialsList weapon={selectedWeapon} />}
        </div>
      )}
    </>
  );
}
