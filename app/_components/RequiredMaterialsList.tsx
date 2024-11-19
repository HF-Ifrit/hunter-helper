import useSWR from "swr";
import { fetcher } from "../helpers";

export default function RequiredMaterialsList({ weapon }: { weapon: Weapon }) {
  const materials = weapon.crafting.previous
    ? weapon.crafting.upgradeMaterials
    : weapon.crafting.craftingMaterials;
  const { data: monsters, isLoading }: { data: Monster[]; isLoading: boolean } =
    useSWR("https://mhw-db.com/monsters", fetcher);
  const {
    data: prevWeapon,
    isLoading: prevWeaponLoading,
  }: { data: Weapon; isLoading: boolean } = useSWR(
    () =>
      weapon.crafting.previous
        ? `https://mhw-db.com/weapons/${weapon.crafting.previous}`
        : null,
    fetcher
  );

  if (isLoading || prevWeaponLoading) return <div>Loading Materials...</div>;

  const materialSources = materials.map((material) => {
    const sources = monsters.filter((monster) =>
      monster.rewards.some((reward) => reward.item.name === material.item.name)
    );
    return { material, sources };
  });

  console.log("Rendered required materials list");
  return (
    <>
      <div
        id="craftingContainer"
        className="bg-darkbrown text-background font-montserrat p-2"
      >
        <p>
          <b>{weapon.name}</b> Requires:
        </p>
        <div id="materialList">
          {materialSources.map(
            (source: { material: CraftingCost; sources: Monster[] }) => (
              <div key={source.material.item.id}>
                <p>{`${source.material.quantity}x ${source.material.item.name}`}</p>
                <ul>
                  {source.sources.map((monster) => (
                    <li
                      key={monster.id}
                      className="list-item list-disc list-inside"
                    >
                      {monster.name}
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
        {weapon.crafting.previous && (
          <>
            <p>
              Upgrades from:
              <br />
              {prevWeapon && <b>{prevWeapon.name}</b>}
            </p>
          </>
        )}
      </div>
    </>
  );
}
