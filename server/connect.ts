import { ConnectRouter } from "@connectrpc/connect";
import { ChoreService } from "../schema/chores_connect.js";
import * as queries from "../data/queries.js";
import { Chore, ChoreResponse } from "../schema/chores_pb.js";

export const routes = (router: ConnectRouter) => {
  router.service(ChoreService, {
    async getChores() {
      const result = await queries.getAllChores();
      const response = new ChoreResponse();
      response.chores = result;

      return response;
    },
    async addChore(request: Chore) {
      const result = await queries.addChore(request);
      const response = new ChoreResponse();
      if (result && result[0]) {
        const chore = new Chore();
        chore.name = result[0].name;
        chore.id = result[0].id;
        chore.frequency = result[0].frequency;
        chore.lastCompleted = result[0].last_completed.toDateString();
        response.chores.push(chore);
      }
      return response;
    },
    async updateChore(request: Chore) {
      const result = await queries.updateChore(request);
      const response = new ChoreResponse();
      if (result && result[0]) {
        const chore = new Chore();
        chore.name = result[0].name;
        chore.id = result[0].id;
        chore.frequency = result[0].frequency;
        chore.lastCompleted = result[0].last_completed.toDateString();
        response.chores.push(chore);
      }
      return response;
    },
  });
};
