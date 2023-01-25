import data from '../../db/data.json' assert { type: 'json' };

export class Hero {
    constructor({name,power,strengh,smart}){
        this.id = data.length;
        this.name = name;
        this.power = power;
        this.strengh = strengh;
        this.smart = smart;
    }
}