import Image from "next/image";
import SharpnessBar from "./SharpnessBar";

export default function WeaponCard({
  weapon,
  onClick,
}: {
  weapon: Weapon;
  onClick: () => void;
}) {
  return (
    <>
      <div
        id="cardContainer"
        className="border-black border-2 rounded-s bg-foreground p-3"
        onClick={() => onClick()}
      >
        <p className="text-background font-julius mb-2 font-bold">
          {weapon.name}
        </p>
        <div id="statsLine1" className="flex mb-2">
          <div id="weaponDamageDisplay" className="flex mr-2">
            <Image
              src={
                weapon.assets?.icon ||
                `/weapons/${weapon.type.toLowerCase()}-icon.webp`
              }
              alt={weapon.type}
              width={24}
              height={30}
            />
            <p className="text-background font-julius">
              Attack {weapon.attack.display}
            </p>
          </div>
          <div id="affinityDisplay" className="flex">
            <Image
              src="/affinity-icon.svg"
              alt="Affinity"
              width={24}
              height={30}
            />
            <p className="text-background font-julius">
              Affinity {weapon.attributes?.affinity ?? 0}%
            </p>
          </div>
        </div>
        <div id="statsLine2" className="flex items-center">
          <div
            id="elementDamageDisplay"
            className={`flex mr-2 ${
              weapon.elements[0].hidden
                ? "border-2 border-black border-dashed rounded"
                : ""
            }`}
          >
            <Image
              src={`/elements/${weapon.elements[0].type.toLowerCase()}`}
              alt={weapon.elements[0].type}
              width={24}
              height={30}
            />
            <p className="text-background font-julius mr-2">
              {weapon.elements[0].damage}
            </p>
          </div>
          {weapon.durability && (
            <SharpnessBar sharpness={weapon.durability[0]} />
          )}
        </div>
      </div>
    </>
  );
}
