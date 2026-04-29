import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let _instance: NeonHttpDatabase<typeof schema> | undefined;

function getInstance(): NeonHttpDatabase<typeof schema> {
  if (_instance) return _instance;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  _instance = drizzle(neon(url), { schema });
  return _instance;
}

export const db = new Proxy({} as NeonHttpDatabase<typeof schema>, {
  get(_target, prop) {
    return Reflect.get(getInstance(), prop);
  },
});
