import {once} from 'node:events';
import { Hero } from '../entities/hero.js';
import { DEFAULT_HEADER } from '../util/util.js';

const routes = ({heroService}) => ({
    ["/heroes:get"]: async (req, res) => {
        // throw new Error('Algum erro ao pegar usuário');
        res.write("/heroes:get");
        res.end();
      },
      ["/heroes:post"]: async (req, res) => {
        // throw new Error('Algum erro ao pegar usuário');
        const data = await once(req,'data');
        // console.log('data',data.toString())
        const json = JSON.parse(data);
        // throw new Error('invalid data')
        // 'Spider-man','Arachnid Powers',7,6;
        const hero = new Hero(json);

        res.writeHead(201,DEFAULT_HEADER);
        
        res.write(JSON.stringify({
            ok:'User Created with Sucess',
            id: hero.id
        }));
         
        return res.end();
      },

});

export {
    routes
}