import React, { useState } from "react";
import { Chore, Frequency } from "../schema/chores_pb";

interface ChoreWithNext extends Chore {
  dueNext?: string;
}

type Props = {
  chores: ChoreWithNext[];
  handleUpdate: (chore: Chore) => void;
};

function getFrequencyBadge(frequency: Frequency) {
  switch (frequency) {
    case Frequency.WEEKLY:
      return (
        <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
          <p className="whitespace-nowrap text-sm">Weekly</p>
        </span>
      );
    case Frequency.MONTHLY:
      return (
        <span className="inline-flex items-center justify-center rounded-full bg-teal-100 px-2.5 py-0.5 text-teal-700">
          <p className="whitespace-nowrap text-sm">Monthly</p>
        </span>
      );
    case Frequency.QUARTERLY:
      return (
        <span className="inline-flex items-center justify-center rounded-full bg-blue-100 px-2.5 py-0.5 text-blue-700">
          <p className="whitespace-nowrap text-sm">Quarterly</p>
        </span>
      );
    case Frequency.YEARLY:
      return (
        <span className="inline-flex items-center justify-center rounded-full bg-fuchsia-100 px-2.5 py-0.5 text-fuchsia-700">
          <p className="whitespace-nowrap text-sm">Yearly</p>
        </span>
      );
  }
}

export function getNextDueDate(frequency: Frequency, lastCompleted: string) {
  const lastCompletedDate = new Date(lastCompleted);
  switch (frequency) {
    case Frequency.WEEKLY:
      lastCompletedDate.setDate(lastCompletedDate.getDate() + 7);
      break;
    case Frequency.MONTHLY:
      lastCompletedDate.setMonth(lastCompletedDate.getMonth() + 1);
      break;
    case Frequency.QUARTERLY:
      lastCompletedDate.setMonth(lastCompletedDate.getMonth() + 3);
      break;
    case Frequency.YEARLY:
      lastCompletedDate.setFullYear(lastCompletedDate.getFullYear() + 1);
      break;
  }
  return lastCompletedDate.toLocaleDateString();
}

export function ChoreList({ chores, handleUpdate }: Props) {
  chores.forEach((chore: ChoreWithNext) => {
    chore.dueNext = getNextDueDate(chore.frequency, chore.lastCompleted);
  });
  const sortedChores = chores.sort((a: ChoreWithNext, b: ChoreWithNext) => {
    const aDate = new Date(a.dueNext);
    const bDate = new Date(b.dueNext);
    return aDate.getTime() - bDate.getTime();
  });
  return (
    <div className="text-left overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead>
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Chore
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Last Completed
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Frequency
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Due Next
            </th>
            <th className="px-4 py-2">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {sortedChores.map((chore: ChoreWithNext) => (
            <tr key={chore.id}>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {chore.name}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {chore.lastCompleted}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {getFrequencyBadge(chore.frequency)}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {chore.dueNext}
              </td>
              <td className="whitespace-nowrap px-4 py-2">
                <button
                  onClick={() => handleUpdate(chore)}
                  className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
