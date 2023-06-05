import { useEffect, useState } from "react"
import Cards from "../components/Cards";
import Filter from "../components/Filter";
import { OPTIONS } from "./fetchOptions";
import { FilterProvider } from "./Films";

const Serials = () => {

  const [listSerials, setListSerials] = useState([]);
  const [genres, setGenres] = useState('');
  const [sortRelease, setSortRelease] = useState('');
  const [year, setYear] = useState('');
  const FilterYear = year.toString().split(' ').slice(3, 4).join(' ')

  if (genres == '' && sortRelease == '') {
    setGenres('')
    setSortRelease('popularity.desc')
  }
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&with_origin_country=US&include_video=popularity.descfalse&f&first_air_date_year=${FilterYear}&language=en-US&page=1&sort_by=${sortRelease}&with_genres=${genres}`, OPTIONS)
      .then(response => response.json())
      .then(data => {
        setListSerials(data.results);
      })
      .catch(err => console.error(err));
  }, [genres, sortRelease, FilterYear])

  return (
    <FilterProvider value={{ genres, setGenres, sortRelease, setSortRelease, year, setYear  }}>
      <div className="pb-20">
        <h1 className="text-4xl mb-6 font-bold text-black-600 dark:text-white text-center	">Serials</h1>
        <div className="flex w-auto flex-col lg:flex-row">
          <div className="dark:text-white text-centerw-full sm: px-4 sm: mb-4 lg:w-1/6" >
            <p className="font-bold mb-2 text-2xl">Filter</p>
            <Filter />
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:gap-4 2xl:w-4/6 sm: justify-center">
            {listSerials.map(result => <Cards key={result.id} data={result} />)}
          </div>
        </div>
      </div>
    </FilterProvider>
  )
}

export default Serials