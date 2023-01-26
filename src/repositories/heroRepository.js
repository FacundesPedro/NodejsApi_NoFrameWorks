import { readFile,writeFile } from 'node:fs/promises'

class HeroRepository {
    constructor({
        filePath
    }){
        this.filePath = filePath;
    }

    async #getCurrentFileContent(){
        return JSON.parse(await readFile( this.filePath ));
    }

    find(){
        return this.#getCurrentFileContent();
    }

    async create(hero) {
        const currentContent = await this.#getCurrentFileContent();

        currentContent.push(hero);
        
        await writeFile(
            this.filePath,
            JSON.stringify(currentContent),
        )

        return currentContent.length + 1; // id from hero?
    }
}


// const repository = new HeroRepository({filePath: '../../db/data.json'})

// console.log(await repository.create({
//     id:2,
//     name:'Flash',
//     power:'Speed-Force',
//     strengh:'8',
//     smart:'7'
// }));

export {
    HeroRepository
}