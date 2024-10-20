import Image from 'next/image'
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
        </>
    )
}