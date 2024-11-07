import Image from "next/image";
import { useState } from "react";
import WeaponElementFilter from "./WeaponElementFilter";

export default function MonsterInfo({ monster }: { monster: Monster }) {
  const [selectedElement, setSelectedElement] = useState<ElementType | "">("");
  return (
    <>
      <div className="flex">
        <Image
          className="mr-8"
          src={`/monsters/${monster.name.toLowerCase()}/icon.png`}
          alt={monster.name}
          width={200}
          height={200}
        />
        <div id="titleDescription" className="flex-row">
          <h1 className="font-montserrat text-6xl">{monster.name}</h1>
          <h2 className="font-montserrat text-2xl">{monster.description}</h2>
        </div>
      </div>
      <div id="elements" className="flex items-center">
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
      <div id="weaknesses" className="flex items-center">
        <p className="font-julius text-2xl">Weakness:</p>
        <ul className="flex">
          {monster.weaknesses
            .sort((a, b) => b.stars - a.stars)
            .map((weakness) => (
              <button
                key={`weakness-btn-${weakness.element}`}
                className={`flex border-2 border-foreground hover:bg-foreground m-2 p-2 rounded ${
                  selectedElement === weakness.element ? "bg-foreground" : ""
                }`}
                onClick={() =>
                  selectedElement === weakness.element
                    ? setSelectedElement("")
                    : setSelectedElement(weakness.element)
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
    </>
  );
}
