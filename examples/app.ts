import { DbJSON } from "../mod.ts";

type User = {
  name: string;
  age: number;
  id: string;
};

const db = new DbJSON("./examples/db/db.json", "users");

const { users } = await db.readJSON<User>();

users.push({
  name: "tobi",
  age: 16,
  id: crypto.randomUUID(),
});

await db.writeJSON(users);

console.log(users);
