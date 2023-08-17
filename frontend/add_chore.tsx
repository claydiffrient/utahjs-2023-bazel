import React, { useEffect } from "react";
import { Frequency, Chore } from "../schema/chores_pb";
import { client } from "./client";

async function handleAddChore(e: SubmitEvent) {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);

  const chore = new Chore();
  chore.name = formData.get("chore_name") as string;
  chore.frequency = Number(formData.get("frequency_option"));
  const formDate = new Date(formData.get("last_completed") as string);
  chore.lastCompleted = formDate.toDateString();
  const response = await client.addChore(chore);
}

type Props = {
  afterAddChore: () => void;
};

export function AddChore({ afterAddChore }: Props) {
  return (
    <div className="px-6 py-5">
      <form
        className="mx-auto mb-0  max-w-md space-y-4"
        onSubmit={(e) => {
          handleAddChore(e);
          afterAddChore();
        }}
      >
        <label
          htmlFor="chore_name"
          className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
            type="text"
            id="chore_name"
            name="chore_name"
            className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
            placeholder="Chore Name"
          />

          <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
            Chore Name
          </span>
        </label>
        <label
          htmlFor="last_completed"
          className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
            type="date"
            id="last_completed"
            name="last_completed"
            className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
            placeholder="Last Completed"
            max={new Date().toISOString().split("T")[0]}
          />

          <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
            Last Completed
          </span>
        </label>
        <fieldset className="flex flex-wrap gap-3">
          <legend className="sr-only">Frequency</legend>
          {Object.values(Frequency)
            .filter((v) => !isNaN(Number(v)))
            .map((v) => {
              return (
                <div key={v}>
                  <input
                    type="radio"
                    name="frequency_option"
                    value={v}
                    id={v}
                    className="peer hidden"
                  />

                  <label
                    htmlFor={v}
                    className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white"
                  >
                    <p className="text-sm font-medium">{Frequency[v]}</p>
                  </label>
                </div>
              );
            })}
        </fieldset>
        <button
          type="submit"
          className="block w-full rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
        >
          Add Chore
        </button>
      </form>
    </div>
  );
}
