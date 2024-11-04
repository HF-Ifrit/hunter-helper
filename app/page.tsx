"use client";
import { useState } from "react";
import Select from "react-select";
import useSWR from "swr";
import MonsterInfo from "./_components/MonsterInfo";
import NavBar from "./_components/NavBar";
import { fetcher } from "./helpers";

export default function Home() {
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);
  let options: Array<{ label: string; value: string }> = [
    { label: "Loading...", value: "" },
  ];
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
  return (
    <>
      <NavBar />
      <main className="flex w-full items-center justify-center min-h-20 sm:items-start">
        <Select
          className="w-3/5 text-center my-auto"
          placeholder="Select a monster..."
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
      </main>
      {selectedMonster && (
        <div className="row-start-3 w-full px-4 pb-4">
          <hr className="border-orange-900 w-full my-10" />
          <MonsterInfo monster={selectedMonster} />
        </div>
      )}
    </>
  );
}
