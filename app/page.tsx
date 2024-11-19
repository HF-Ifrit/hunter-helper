"use client";
import { useState } from "react";
import Select from "react-select";
import useSWR from "swr";
import MonsterInfo from "./_components/MonsterInfo";
import { fetcher } from "./helpers";

interface MonsterOption {
  label: string;
  value: string;
}

export default function Home() {
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);
  let options: Array<MonsterOption> = [{ label: "Loading...", value: "" }];
  const { data, isLoading }: { data: Monster[]; isLoading: boolean } = useSWR(
    "https://mhw-db.com/monsters",
    fetcher
  );

  if (!isLoading && data) {
    options = data
      .map((monster) => ({
        label: monster.name,
        value: monster.name,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }

  console.log("Rendered home page");
  return (
    <>
      <div
        id="centeredPageContainer"
        className="flex-col w-full pt-4 items-center justify-center justify-items-center min-h-20 sm:items-start"
      >
        <Select
          id="monsterSelector"
          className="w-1/5 text-center my-auto"
          placeholder="Select your hunt target..."
          options={options}
          styles={{
            control: (base) => ({
              ...base,
              borderRadius: "9999px",
            }),
          }}
          isLoading={isLoading}
          onChange={(e) =>
            setSelectedMonster(
              e != null
                ? (data.find((monster) => monster.name === e.value) as Monster)
                : null
            )
          }
        />
      </div>
      {selectedMonster && (
        <div className="flex flex-col gap-y-4 w-full pb-4">
          <hr className="border-orange-900 w-full" />
          <MonsterInfo monster={selectedMonster} />
        </div>
      )}
    </>
  );
}
