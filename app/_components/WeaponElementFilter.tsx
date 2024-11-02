import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
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
            {TYPES.map((type) => (
              <button
                key={`weapon-type-${type}`}
                className="flex border-black border-2 shadow drop-shadow-lg shadow-black bg-darkbrown opacity m-2 p-2 rounded"
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
              <input type="checkbox" className="mr-2 accent-black" />
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
          <div id="weaponCards" className="grid grid-cols-3 gap-4">
            {data.map((weapon) => (
              <WeaponCard key={weapon.id} weapon={weapon} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
