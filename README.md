dbjson
--
db gonna help you to interact with your .json as database, but with a simple form to do it

```typescript

import { Router, RouterMiddleware } from 'https://deno.land/x/oak/mod.ts'
import { Dbjson } from "https://deno.land/x/dbjson@v1.1/mod.ts";

type User = {
    name: string
    age: number
    id: string
}

const dbjson = new Dbjson('./db/db.json', 'users')

const { users } = await dbjson.readJSON<User>()

users.push({
    name: "tobi",
    age: 16,
    id: crypto.randomUUID()
})

await dbjson.writeJSON(users)

console.log(users)
```
