import * as path from "https://deno.land/std/path/mod.ts";

class Dbjson {
  private jsonPath: string;

  constructor(relativePathNameJSON: string) {
    this.jsonPath = path.join(Deno.cwd(), `${relativePathNameJSON}`);
  }

  async readJSON() {
    const usersTemplate = {
      users: [],
    };
      
    try {
      const users = await Deno.readTextFile(this.jsonPath);
      if (users.length === 0) {
        await Deno.writeTextFile(
          this.jsonPath,
          JSON.stringify(usersTemplate, null, 4),
        );
        return usersTemplate;
      }
        return JSON.parse(users);
        
    } catch (_err) {
      await Deno.writeTextFile(this.jsonPath, JSON.stringify(usersTemplate, null, 4));
      return usersTemplate;
    }
  }

    async writeJSON(data) {
    const newUser = {
      users: data,
    };
    await Deno.writeTextFile(this.jsonPath, JSON.stringify(newUser, null, 4));
  }
}

export { Dbjson }