import Image from "next/image";
export default function MonsterInfo({ monster }: { monster: Monster }) {
  return (
    <>
      <Image
        src={`/monsters/${monster.name.toLowerCase()}/icon.png`}
        alt={monster.name}
        width={200}
        height={200}
      />
      <p>{monster.name}</p>
      <p>{monster.description}</p>
      <div className="flex items-center">
        <p>Element:</p>
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
      <div className="flex items-center">
        <p>Weakness:</p>
        <ul className="flex">
          {monster.weaknesses
            .sort((a, b) => b.stars - a.stars)
            .map((weakness) => (
              <button key={`weakness-btn-${weakness.element}`} className="flex border-2 border-foreground hover:bg-foreground m-2 p-2 rounded">
                <Image
                  key={`weakness-${weakness.element}`}
                  src={`/elements/${weakness.element.toLowerCase()}`}
                  alt={weakness.element}
                  width={40}
                  height={40}
                />
                {Array.from({ length: weakness.stars }, (_, i) => (
                  <Image key={`star-${i}`} src="/star.svg" alt="star" width={20} height={20} className="my-auto"/>
                ))}
              </button>
            ))}
        </ul>
      </div>
    </>
  );
}
