import animals from './animals-dictionary';

const getAnimal = () => {
  return animals[Math.floor((Math.random()*animals.length))];
};

export default {getAnimal};