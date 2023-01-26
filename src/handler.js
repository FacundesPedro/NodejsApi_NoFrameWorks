import { parse,fileURLToPath } from "node:url";
import { join, dirname } from 'node:path';
import { DEFAULT_HEADER } from "./util/util.js";
import { routes as heroRoutes } from "./routes/heroRoute.js";
import { generateHeroService } from './factories/heroFactory.js'

const dir = dirname( fileURLToPath(import.meta.url) );
// console.log('directorie:', dir)
const fileName = 'data.json';
const filepath = join(dir,'./../db',fileName);

const heroService = generateHeroService( filepath );

const registeredRoutes = {
  ...heroRoutes({ heroService }),

  default: (req, res) => {
    res.writeHead(404, DEFAULT_HEADER);
    res.write("Route Not Found");
    res.end();
  },
};

function errorHandler(res) {
  return (err) => {
    console.log(`Um Erro Aconteceu!`, err); 

    res.writeHead(500, DEFAULT_HEADER);
    res.write(
      JSON.stringify({
        err: "Internal Server Error",
      })
    );
  };
}

function handler(req, res) {
  const { url, method } = req;
  const { pathname } = parse(url);

  const key = `${pathname}:${method.toLowerCase()}`;

  const route = registeredRoutes[key] ?? registeredRoutes["default"];

  //   console.log({ key });

  return Promise.resolve(route(req, res)).catch(errorHandler(res));
}

export { handler };
