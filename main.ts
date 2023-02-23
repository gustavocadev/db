import * as path from "https://deno.land/std@0.177.0/path/mod.ts";
import * as fs from "https://deno.land/std@0.177.0/fs/mod.ts";

type ReadJSONtype<T> = {
  [name: string]: Array<T>;
};

export class DbJSON {
  private jsonPath: string;
  private entryName: string;
  private relativePathNameJSON: string;

  // private dataArray: any[]

  constructor(relativePathNameJSON: string, entryName: string) {
    this.jsonPath = path.join(Deno.cwd(), `${relativePathNameJSON}`);
    this.relativePathNameJSON = relativePathNameJSON;
    this.entryName = entryName;
    this.createFile();
  }

  // method to read a json file
  async readJSON<T>(): Promise<ReadJSONtype<T>> {
    const usersTemplate: ReadJSONtype<T> = {
      [this.entryName]: [],
    };

    try {
      const data = (await Deno.readTextFile(this.jsonPath)) ?? "";

      // if the file is created
      if (data.length === 0) {
        await Deno.writeTextFile(
          this.jsonPath,
          JSON.stringify(usersTemplate, null, 4),
        );
        return usersTemplate;
      }
      // rewrite the entry name

      const dataParsed: ReadJSONtype<T> = JSON.parse(data);

      return dataParsed;
    } catch (_err) {
      await Deno.writeTextFile(
        this.jsonPath,
        JSON.stringify(usersTemplate, null, 4),
      );
    }

    return usersTemplate;
  }

  private async createFile() {
    const filesToCreate = this.extractDirFileToCreate(
      this.relativePathNameJSON,
    );

    await fs.ensureDir(path.join(Deno.cwd(), filesToCreate));
  }

  private extractDirFileToCreate(relativePath: string) {
    const arrayOfWord = relativePath.split("/");
    const newArrayOfWord = arrayOfWord.filter((el) => el !== ".");
    newArrayOfWord.splice(-1);
    const fileDir = newArrayOfWord.join("/");

    return fileDir;
  }

  async writeJSON(data: unknown[]): Promise<void> {
    const newUser = {
      [this.entryName]: data,
    };

    await Deno.writeTextFile(this.jsonPath, JSON.stringify(newUser, null, 4));
  }

  async writeALlJSON(data: unknown): Promise<void> {
    try {
      await Deno.writeTextFile(this.jsonPath, JSON.stringify(data, null, 4));
    } catch (_) {
      this.createFile();
      await Deno.writeTextFile(this.jsonPath, JSON.stringify(data, null, 4));
    }
  }
}
