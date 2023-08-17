import { createPromiseClient } from "@connectrpc/connect";
import { ChoreService } from "../schema/chores_connect";
import { createConnectTransport } from "@connectrpc/connect-web";

const transport = createConnectTransport({
  baseUrl: "http://localhost:8080",
});

export const client = createPromiseClient(ChoreService, transport);
