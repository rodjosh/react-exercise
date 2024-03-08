import { useState, useEffect } from 'react'
import AnimalApi from '../models/animals'

const AnimalsList = () => {

  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    const newList = [];
    for(let x = 0; x < 10; x++) {
      newList.push(AnimalApi.getAnimal());
    }
    setList(newList);
  }, [])

  return (
    <ul>
      {list.map(item => {
        return <li>{item}</li>;
      })}
    </ul>
  )
}

export default AnimalsList
