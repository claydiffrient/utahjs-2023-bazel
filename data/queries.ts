import { Chore } from "../schema/chores_pb.js";
import Knex from "knex";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const knex = Knex({
  client: "pg",
  connection: process.env.PG_CONNECTION_STRING,
});

export async function getAllChores() {
  const response = await knex("chores").select();
  return response.map((chore) => {
    const c = new Chore();
    c.id = chore.id;
    c.name = chore.name;
    c.lastCompleted = chore.last_completed.toLocaleDateString();
    c.frequency = chore.frequency;
    return c;
  });
}

export function addChore(chore: Chore) {
  return knex("chores")
    .insert(
      {
        name: chore.name,
        last_completed: chore.lastCompleted,
        frequency: chore.frequency,
      },
      ["id", "name", "last_completed", "frequency"]
    )
    .catch((err) => {
      console.log(err);
    });
}

export function updateChore(chore: Chore) {
  return knex("chores")
    .where({ id: chore.id })
    .update(
      {
        name: chore.name,
        last_completed: chore.lastCompleted,
        frequency: chore.frequency,
      },
      ["id", "name", "last_completed", "frequency"]
    )
    .catch((err) => {
      console.log(err);
    });
}
