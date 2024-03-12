import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';

import AnimalApi from '../models/animals'
import './animals-list.css'

interface Animal {
  name: string;
  id: string;
}

const AnimalsList = () => {
  const [list, setList] = useState<Animal[]>([]);
  const [search, setSearch] = useState<string>();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const newList: Animal[] = [];
    for(let x = 0; x < 10; x++) {
      newList.push({
        name: AnimalApi.getAnimal(),
        id: uuidv4()
      });
    }
    setList(newList);
  }, [])

  const insertAnimal = useCallback(() => {
    const newAnimal = {
      name: AnimalApi.getAnimal(),
      id: uuidv4()
    };
    
    if (!newAnimal) {
      alert("Cannot get new animal from API")
      return
    }

    setList((prev) => [...prev, newAnimal])
  }, [setList])

  const filteredList = useMemo(() => {
    return list.filter((animal) => {
      if (!search?.length) return true
      return animal && animal.name.includes(search)
    })
  }, [list, search])

  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredList.slice(start, start + itemsPerPage);
  }, [filteredList, currentPage, itemsPerPage]);

  const searchAction = useCallback(() => {
    if (!inputRef?.current) {
      alert("Failed to get input ref")
      return
    }

    const newSearch = inputRef.current.value
    setSearch(newSearch)
  }, [inputRef, setSearch])

  const clearAction = useCallback(() => {
    if (!inputRef?.current) {
      alert("Failed to get input ref")
      return
    }

    setSearch(undefined)
    inputRef.current.value = ""
  }, [inputRef, setSearch])

  const removeItem = useCallback((id: string) => {
    setList((prev) => prev.filter((animal) => animal.id !== id))
  }, [list])

  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  return (
    <ul className='app_container'>
      <div className='search_container'>
        <div className='input_and_button'>
          <input ref={inputRef} type='text' name="search" placeholder='Search for an animal in the list'/>
          <button onClick={searchAction}>Search</button>
        </div>
        <button className='clear_button' onClick={clearAction}>Clear</button>
      </div>

      <div className='list_container'>
        {paginatedList.map((item) => {
          return <li key={item.id}>
            <span>{item.name}</span>
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>;
        })}
      </div>

      <button className='insert_button' onClick={insertAnimal}>Insert</button>

      <div className="pagination_controls">
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage}</span>
        <button onClick={nextPage} disabled={currentPage * itemsPerPage >= filteredList.length}>Next</button>
      </div>

      
    </ul>
  )
}

export default AnimalsList
