"use client";

import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import { SortOption } from "../_components/WeaponElementFilter";
import { fetcher } from "../helpers";

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

export default function WeaponDirectory() {
  const { data: weapons, isLoading }: { data: Weapon[]; isLoading: boolean } =
    useSWR("https://mhw-db.com/weapons", fetcher);
  const [selectedWeaponType, setSelectedWeaponType] = useState("great-sword");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<{
    fieldName: string;
    sort: SortOption;
  }>({ fieldName: "name", sort: SortOption.NONE });

  if (isLoading) return <div>Loading weapon data...</div>;

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

  // const filteredWeaponData: Weapon[] | [] = weapons
  //   .filter((weapon: Weapon) => selectedWeaponType === weapon.type)
  //   // .filter((weapon) =>
  //   //   searchTerm.length ? weapon.name.toLowerCase().includes(searchTerm) : true
  //   // )
  //   .sort(
  //     (a: Weapon, b: Weapon) =>
  //       sortOption.sort *
  //       (typeof a[sortOption.fieldName as keyof Weapon] === "number"
  //         ? (a[sortOption.fieldName as keyof Weapon] as number) -
  //           (b[sortOption.fieldName as keyof Weapon] as number)
  //         : typeof a[sortOption.fieldName as keyof Weapon] === "string"
  //         ? (a[sortOption.fieldName as keyof Weapon] as string).localeCompare(
  //             b[sortOption.fieldName as keyof Weapon] as string
  //           )
  //         : FIELD_SORT_FUNCTIONS[sortOption.fieldName](a, b))
  //   );

  return (
    <div id="weaponDirectoryPageContainer" className="flex flex-col">
      <h1 className="text-6xl font-montserrat text-center">Weapon Directory</h1>
      {weapons.length > 0 && (
        <>
          <div
            id="weaponButtonContainer"
            className="grid grid-cols-7 grid-rows-2"
          >
            {TYPES.map((weaponType) => (
              <button
                key={`weapon-type-icon-${weaponType}`}
                className={`flex flex-col w-48 gap-y-1 justify-center items-center border-black border-2 shadow drop-shadow-lg shadow-black bg-darkbrown m-2 p-2 rounded ${
                  selectedWeaponType === weaponType
                    ? "opacity-100"
                    : "opacity-50 hover:opacity-75"
                }`}
                onClick={() => setSelectedWeaponType(weaponType)}
              >
                <Image
                  key={`weapon-type-icon-${weaponType}`}
                  className=""
                  src={`/weapons/${weaponType.toLowerCase()}-icon.webp`}
                  alt={weaponType}
                  width={100}
                  height={100}
                />
                <div className="w-full flex flex-wrap text-background capitalize text-center justify-center">
                  {weaponType.replaceAll("-", " ")}
                </div>
              </button>
            ))}
          </div>
          <ul>
            {weapons
              .filter((weapon) => weapon.type === selectedWeaponType)
              .map((weapon) => (
                <div key={weapon.id}>{weapon.name}</div>
              ))}
          </ul>
        </>
      )}
    </div>
  );
}
