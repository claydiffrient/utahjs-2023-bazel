import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { AddChore } from "./add_chore";

type Props = {
  onAdd: () => void;
};

export function Header({ onAdd }: Props) {
  const [isModalOpen, setModalOpen] = useState(false);

  function handleAdd() {
    setModalOpen(false);
  }

  return (
    <header className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Household Chore Tracker
            </h1>

            <p className="mt-1.5 text-sm text-gray-500">
              Keep track of what's been done!
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
            <button
              className="inline-flex items-center block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
              type="button"
              onClick={() => setModalOpen(true)}
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <span className="ml-2">Add Chore</span>
            </button>
          </div>
        </div>
      </div>
      <Dialog open={isModalOpen} onClose={() => setModalOpen(false)}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg border border-gray-100 text-center shadow-xl">
            <Dialog.Title className="text-xl font-bold">Add Chore</Dialog.Title>
            <AddChore afterAddChore={handleAdd.bind(this)} />
          </Dialog.Panel>
        </div>
      </Dialog>
    </header>
  );
}
