## Dbjson

Bbjson gonna help you to interact with your json files that way you can use it
as a database, but with a simple form to do it

```typescript
// we import the module
import { DbJSON } from 'https://deno.land/x/dbjson@LATEST_VERSION/mod.ts'

// we define the type
type User = {
	name: string
	age: number
	id: string
}

// we need to choose the relative path of our db.json and the entry name of our json
const db = new DbJSON('./db/db.json', 'users')

const { users } = await db.readJSON<User>()

users.push({
	name: 'tobi',
	age: 16,
	id: crypto.randomUUID(),
})

// this gonna write it in the place and with name we choose it in the instance we did in "new Dbjson"
await db.writeJSON(users)

console.log(users) // [{ name: "tobi", age: 16, id: '6cb9248a-232f-4011-8a05-b315157fdfe5' }]
```
