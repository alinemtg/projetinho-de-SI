
class Population {
  constructor(m, num) {
    this.mutationRate = m; // Mutation rate
    this.population = []; // array to hold the current population
    this.matingPool = [];
    this.generations = 0; // Number of generations
    
    for (let i = 0; i < num; i++) {
      this.population[i] = new Dango(new DNA(), i)
    }
  }


  // ='='='='='='='='='='='='='='='='='= CHANGING FITNESS ='='='='='='='='='='='='='='='='='=

  // ='='='='='='='='= HOUR INFLUENCE ='='='='='='='='=

  setHourInfluence(){
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].getHourInfluence()

    // console.log("o fitness dele ficou assim ó")
    // console.log(i)
    // console.log(this.population[i].getFitness())
    }
  }

  // ='='='='='='='='= USER INFLUENCE ='='='='='='='='=
  rollover(mx, my) {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].rollover(mx, my);
    }
  }


  // ='='='='='='='='='='='='='='='='='= THE OTHER STEPS OF THE GENETIC ALGORITHM ='='='='='='='='='='='='='='='='='=

  // Generate a mating pool
  selection() {

    // Clear the ArrayList
    this.matingPool = [];

    // Calculate total fitness of whole population
    let maxFitness = this.getMaxFitness();

    // Calculate fitness for each member of the population (scaled to value between 0 and 1)
    // Based on fitness, each member will get added to the mating pool a certain number of times
    // A higher fitness = more entries to mating pool = more likely to be picked as a parent
    // A lower fitness = fewer entries to mating pool = less likely to be picked as a parent
    for (let i = 0; i < this.population.length; i++) {
      let fitnessNormal = map(this.population[i].getFitness(), 0, maxFitness, 0, 1);
      let n = floor(fitnessNormal * 100); // Arbitrary multiplier

      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.population[i]);
      }
    }
  }

  // Making the next generation
  reproduction() {
    // Refill the population with children from the mating pool
    for (let i = 0; i < this.population.length; i++) {
      // Sping the wheel of fortune to pick two parents
      let m = floor(random(this.matingPool.length));
      let d = floor(random(this.matingPool.length));
      // Pick two parents
      let mom = this.matingPool[m];
      let dad = this.matingPool[d];
      // Get their genes
      let momgenes = mom.getDNA();
      let dadgenes = dad.getDNA();
      // Mate their genes
      let child = momgenes.crossover(dadgenes);
      // Mutate their genes
      child.mutate(this.mutationRate);
      // Fill the new population with the new child
      this.population[i] = new Dango(child, i);
    }
    this.generations++;
  }


  // ='='='='='='='='='='='='='='='='='= DISPLAYING DANGOS OF THIS POPULATION ='='='='='='='='='='='='='='='='='=
  
  display() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].display()
    }
  }


  // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =


  // ='='='='='='='='='='='='='='='='='= ADJUSTING COORDINATES (we want a full dango on screen) ='='='='='='='='='='='='='='='='='=

  adjustCoordinates(){   
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].adjustCoordinates()
    }
  }

  // ='='='='='='='='='='='='='='='='='= 'GET' METHODS ='='='='='='='='='='='='='='='='='=

  getGenerations() {
    return this.generations;
  }

  // Find highest fitness for the population
  getMaxFitness() {
    let record = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].getFitness() > record) {
        record = this.population[i].getFitness();
      }
    }
    return record;
  }


  // just for checkouts (it'll die soon...)
  printBrightness(){
    for (let i = 0; i < this.population.length; i++) {
      console.log("o brilho dele era assim ó")
      console.log(i)
      console.log(this.population[i].dna.genes[3])
    }
  }

}