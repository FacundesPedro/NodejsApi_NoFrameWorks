// import data from '../../db/data.json' assert { type: 'json' };
import { randomUUID } from 'node:crypto';

export class Hero {
    constructor({name,power,strengh,smart}){
        this.id = randomUUID();
        this.name = name;
        this.power = power;
        this.strengh = strengh;
        this.smart = smart;
    }
}