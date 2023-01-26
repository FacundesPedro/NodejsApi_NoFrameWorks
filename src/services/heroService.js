

class HeroService {
    constructor({
        heroRepository
    }){
        this.heroRepository = heroRepository;
    }

    find(){
        return this.heroRepository.find();
    }

    create(hero) {
        return this.heroRepository.create(hero);
    }
}

export {
    HeroService
}