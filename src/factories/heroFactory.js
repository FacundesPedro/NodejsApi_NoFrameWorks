import { HeroRepository } from "../repositories/heroRepository.js";
import { HeroService } from "../services/heroService.js";

function generateHeroService(filePath) {
  const heroRepository = new HeroRepository({
    filePath: filePath,
  });
  const heroService = new HeroService({
    heroRepository: heroRepository,
  });

  return heroService;
}

export {
    generateHeroService
}
