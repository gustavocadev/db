Dbjson
--
Bbjson gonna help you to interact with your json files that way you can use it as a database, but with a simple form to do it

```typescript
// we import the module
import { Dbjson } from "https://deno.land/x/dbjson@v1.1/mod.ts";

// we define the type
type User = {
    name: string
    age: number
    id: string
}

const dbjson = new Dbjson('./db/db.json', 'users') // we need to choose the relative path of our db.json and the entry name of our json

const { users } = await dbjson.readJSON<User>()

users.push({
    name: "tobi",
    age: 16,
    id: crypto.randomUUID()
})

await dbjson.writeJSON(users) // this gonna write it in the place and with name we choose it in the instance we did in "new Dbjson" 

console.log(users) //{ users: [{ name: "tobi", age: 16, id: '6cb9248a-232f-4011-8a05-b315157fdfe5' }] }
```
