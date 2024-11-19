import Image from "next/image";
import { useState } from "react";
import WeaponElementFilter from "./WeaponElementFilter";

const ICEBORNE_MONSTERS = [
  "banbaro",
  "beotodus",
  "nargacuga",
  "velkhana",
  "tigrex",
  "shrieking legiana",
  "barioth",
  "glavenus",
  "brachydios",
  "fulgur anjanath",
  "ebony odogaron",
  "acidic glavenus",
  "ruiner nergigante",
  "viper tobi-kadachi",
  "coral pukei-pukei",
  "nightshade paolumu",
  "namielle",
  "yian garuga",
  "shara ishvalda",
  "savage deviljho",
  "blackveil vaal hazak",
  "seething bazelgeuse",
  "scarred yian garuga",
  "gold rathian",
  "silver rathalos",
  "brute tigrex",
  "zinogre",
  "rajang",
  "stygian zinogre",
  "safi'jiiva",
  "raging brachydios",
  "furious rajang",
  "alatreon",
  "frostfang barioth",
  "fatalis",
];

const IMAGE_URL =
  "https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/mhw";

export default function MonsterInfo({ monster }: { monster: Monster }) {
  const [selectedElement, setSelectedElement] = useState<ElementType | "">("");
  return (
    <div id="infoContainer" className="flex flex-col gap-y-2">
      <div id="overview" className="flex">
        <img
          className="mr-8"
          src={
            ICEBORNE_MONSTERS.includes(monster.name.toLowerCase())
              ? IMAGE_URL +
                `i-${monster.name.toLowerCase().replaceAll(" ", "_")}_icon.png`
              : IMAGE_URL +
                `-${monster.name.toLowerCase().replaceAll(" ", "_")}_icon.png`
          }
          alt={monster.name}
          width={200}
          height={200}
        />
        <div id="titleDescription" className="flex flex-col w-2/3">
          <h1 className="font-montserrat text-6xl">{monster.name}</h1>
          <h2 className="font-montserrat text-2xl">{monster.description}</h2>
          <h2 className="font-montserrat text-2xl capitalize mt-auto">
            {monster.species}
          </h2>
        </div>
      </div>
      <div id="elementsAndAilments" className="flex flex-col gap-y-2">
        <div id="elments" className="items-center">
          <p className="font-julius text-2xl">Element:</p>
          <ul className="flex">
            {monster.elements.map((element) => (
              <Image
                key={`img-${element}`}
                src={`/elements/${element.toLowerCase()}`}
                alt={element}
                width={40}
                height={40}
              />
            ))}
          </ul>
        </div>
        <div id="ailments">
          <p className="font-julius text-2xl">Inflicts:</p>
          <ul className="flex py-5 gap-x-2">
            {monster.ailments.map((ailment) => (
              <div
                key={`ailment-${ailment.name}`}
                className="group relative w-max cursor-help"
              >
                <Image
                  key={`img-${ailment.name}`}
                  src={`/blights/${ailment.name
                    .toLowerCase()
                    .replaceAll(" ", "")}`}
                  alt={ailment.name}
                  width={40}
                  height={40}
                />
                <span className="bg-darkbrown p-1 text-background pointer-events-none absolute -top-7 left-0 w-max opacity-0 transition-opacity group-hover:opacity-100">
                  {ailment.name}
                </span>
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div id="weaknesses" className="flex items-center">
        <p className="font-julius text-2xl">Weakness:</p>
        <ul id="weaknesses-list" className="flex">
          {monster.weaknesses
            .sort((a, b) => b.stars - a.stars)
            .map((weakness) => (
              <button
                key={
                  `weakness-btn-${weakness.element}` +
                  `${weakness.condition ? "-cond" : ""}`
                }
                className={`flex border-2 border-foreground ${
                  weakness.element === "stun"
                    ? "hover:cursor-default"
                    : "hover:bg-foreground"
                } m-2 p-2 rounded ${
                  selectedElement === weakness.element ? "bg-foreground" : ""
                }`}
                onClick={() =>
                  selectedElement === weakness.element
                    ? setSelectedElement("")
                    : weakness.element !== "stun"
                    ? setSelectedElement(weakness.element)
                    : ""
                }
              >
                <Image
                  key={`weakness-${weakness.element}`}
                  src={`/elements/${weakness.element.toLowerCase()}`}
                  alt={weakness.element}
                  width={40}
                  height={40}
                />
                {Array.from({ length: weakness.stars }, (_, i) => (
                  <Image
                    key={`star-${i}`}
                    src="/star.svg"
                    alt="star"
                    width={20}
                    height={20}
                    className="my-auto"
                  />
                ))}
              </button>
            ))}
        </ul>
      </div>
      {selectedElement && <WeaponElementFilter element={selectedElement} />}
    </div>
  );
}
