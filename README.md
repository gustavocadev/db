dbjson
--
db gonna help you to interact with your .json as database, but with a simple form to do it

```typescript
import { Router, RouterMiddleware } from 'https://deno.land/x/oak/mod.ts'
import { Dbjson } from 'https://deno.land/x/dbjson/mod.ts'

const router = new Router()
const dbjson = new Dbjson('./db/users.json') // we need to choose the relative path of our db.json

const { users } = await dbjson.readJSON()

router.get('/users', (ctx) => {
   
    ctx.response.body = {
        users
    }
})
```
