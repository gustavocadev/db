import { Dbjson } from "../mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";

type User = {
  name: string;
  age: number;
  id: string;
};

const dbjson = new Dbjson("./examples/db/db.json", "users");

const { users } = await dbjson.readJSON<User>();

users.push({
  name: "tobi",
  age: 16,
  id: crypto.randomUUID(),
});

await dbjson.writeJSON(users);

console.log(users);

