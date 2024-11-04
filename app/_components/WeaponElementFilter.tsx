import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../helpers";
import WeaponCard from "./WeaponCard";

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

export default function WeaponElementFilter({
  element,
}: {
  element: ElementType;
}) {
  const [showHiddenElementWeapons, setShowHiddenElementWeapons] =
    useState(true);
  const [selectedWeaponTypes, setSelectedWeaponTypes] = useState<
    Map<string, boolean>
  >(new Map(TYPES.map((type) => [type, true])));
  const {
    data,
    error,
    isLoading,
  }: { data: Weapon[]; error: any; isLoading: boolean } = useSWR(
    `https://mhw-db.com/weapons?q={"elements.type": "${element}"}`,
    fetcher
  );
  return (
    <>
      {!isLoading && data.length > 0 && (
        <div
          id="filterContainer"
          className="flex-col flex-wrap bg-lightbrown border-black border-2 rounded p-2 w-fit"
        >
          <div id="weaponButtons" className="flex justify-center">
            <div
              id="weaponButtons-select-unselect"
              className="flex items-center gap-x-2"
            >
              <button
                className="border-2 border-black rounded p-2 h-1/2 text-black shadow-xl font-montserrat font-bold hover:bg-darkbrown"
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
                className="border-2 border-black rounded p-2 h-1/2 text-black shadow-xl font-montserrat font-bold hover:bg-darkbrown"
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
                  selectedWeaponTypes.get(type) ? "" : "opacity-50"
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
            id="searchOptions"
            className="flex items-center ml-2 mb-4 gap-x-28"
          >
            <div id="hiddenElementToggle" className="flex items-center">
              <input
                type="checkbox"
                checked={showHiddenElementWeapons}
                onChange={() =>
                  setShowHiddenElementWeapons(!showHiddenElementWeapons)
                }
                className="mr-2 accent-black"
              />
              <label className="text-black font-montserrat">
                Show Hidden Element Weapons
              </label>
            </div>
            <div className="justify-items-center items-center ml-2 pl-4 pb-1 border-b-2 w-1/3">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="mr-2"
                style={{ color: "black" }}
              />
              <input
                type="text"
                className="bg-transparent text-gray-400 focus:outline-none"
                placeholder="Search by weapon name..."
              />
            </div>
          </div>
          <div
            id="weaponCards"
            className="grid grid-cols-3 gap-4 max-h-screen overflow-y-auto"
          >
            {data
              .filter((weapon) =>
                showHiddenElementWeapons
                  ? true
                  : !weapon.elements.some((element) => element.hidden)
              )
              .filter((weapon) => selectedWeaponTypes.get(weapon.type))
              .map((weapon) => (
                <WeaponCard key={weapon.id} weapon={weapon} />
              ))}
          </div>
        </div>
      )}
    </>
  );
}
