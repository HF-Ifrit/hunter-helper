"use client";
import { useState } from "react";
import Image from "next/image";
import NavBar from "./_components/NavBar";
import useSWR from "swr";
import Select from "react-select";
import MonsterInfo from "./_components/MonsterInfo";

const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

export default function Home() {
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);
  let options: Array<{ label: string; value: string }> = [
    { label: "Loading...", value: "" },
  ];
  const {
    data,
    error,
    isLoading,
  }: { data: Monster[]; error: any; isLoading: boolean } = useSWR(
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
          className="w-3/5 text-center"
          placeholder="Select a monster..."
          options={options}
          styles={{
            control: (base, state) => ({
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
        <div className="row-start-3 w-full">
          <hr className="bg-red-700 w-full my-10" />
          <MonsterInfo monster={selectedMonster} />
        </div>
      )}
    </>
  );
}
