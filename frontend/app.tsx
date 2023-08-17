import React, { useState, useEffect, useCallback } from "react";
import { Header } from "./header";
import { ChoreList } from "./chore_list";
import { client } from "./client";
import "./custom.css";
import { Chore } from "../schema/chores_pb";

export function App() {
  const [chores, setChores] = useState([]);
  const [fetched, setFetched] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const response = await client.getChores({});
      setChores(response.chores);
      setFetched(true);
    }
    fetchData();
  }, [fetched]);

  const handleUpdate = useCallback((chore: Chore) => {
    async function updateChore() {
      chore.lastCompleted = new Date().toDateString();
      const response = await client.updateChore(chore);
      setFetched(false);
    }
    updateChore();
  });

  return (
    <>
      <Header
        onAdd={() => {
          setFetched(false);
        }}
      />
      <ChoreList chores={chores} handleUpdate={handleUpdate} />
    </>
  );
}
