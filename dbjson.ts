import * as path from "https://deno.land/std/path/mod.ts";

type ReadJSONtype<T> = {
  [name: string]: Array<T>
}


class Dbjson {
  private jsonPath: string;
  private entryName: string;

  // private dataArray: any[]

  constructor(relativePathNameJSON: string, entryName: string) {
    this.jsonPath = path.join(Deno.cwd(), `${relativePathNameJSON}`);
    this.entryName = entryName
    // this.dataArray = []
    // this.init()
  }

  // async init() {
  //   let data = await this.readJSON()

  //   data = {
  //       [this.entryName]: []
  //     }
    
  //   console.log('data =>', data)

  //   await this.writeALlJSON(data)
  // }

  

  async readJSON<T>(): Promise<ReadJSONtype<T>> {

    const usersTemplate: ReadJSONtype<T> = {
      [this.entryName]: [],
    };

      
    try {
      const data = await Deno.readTextFile(this.jsonPath) ?? "" ;
      
      // if the file is created
      if (data.length === 0) {
        await Deno.writeTextFile(
          this.jsonPath,
          JSON.stringify(usersTemplate, null, 4),
        );
        return usersTemplate;
      } 
      // rewrite the entry name

      const dataParsed: ReadJSONtype<T> = JSON.parse(data)


      // dataParsed = {
      //   [this.entryName]: [...this.dataArray]
      // }


      // dataParsed[this.entryName] = [...this.dataArray]


      // dataParsed = {
      //   [this.entryName]: [...dataParsed[this.entryName]]
      // }
      // Object.keys(data)[0] = this.entryName
      // console.log(Object.keys(data)[0])
      // console.log(this.dataArray)
      return dataParsed;

    } catch (_err) {
      
      await Deno.writeTextFile(this.jsonPath, JSON.stringify(usersTemplate, null, 4));
      return usersTemplate;

    }

  }

  async writeJSON(data: unknown[]): Promise<void> {
    
    // this.dataArray.push(data.slice(-1))     
    
    const newUser = {
      [this.entryName]: data,
    };

    await Deno.writeTextFile(this.jsonPath, JSON.stringify(newUser, null, 4));
  }


  async writeALlJSON(data: unknown): Promise<void> {
    await Deno.writeTextFile(this.jsonPath, JSON.stringify(data, null, 4));
  }
}

export { Dbjson }