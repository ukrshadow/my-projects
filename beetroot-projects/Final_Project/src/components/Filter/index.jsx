import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FilterContext } from "../../pages/Films";
import { OPTIONS } from "../../pages/fetchOptions";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Filter = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [listMovieGenres, setListMovieGenres] = useState([]);
  const [yearPicker, setYearPicker] = useState(new Date());
  const { setGenres } = useContext(FilterContext);
  const { setSortRelease } = useContext(FilterContext);
  const { setYear } = useContext(FilterContext);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', OPTIONS)
      .then(response => response.json())
      .then(data => {
        setListMovieGenres(data.genres);
      })
      .catch(err => console.error(err));
  }, [])

  const handleSubmitForm = (data) => {
    setGenres(data.genresSelect)
    setSortRelease(data.sortRelease)
    setYear(yearPicker)
  }

  const handleValueChange = (date) => {
    setYearPicker(date);
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col	">
      <label className="font-semibold mb-2">Genres</label>
      <select className='dark:bg-[#262626] mb-1 peer  w-5/6 rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-1 transition-all  focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-1 disabled:border-0 disabled:bg-blue-gray-50' {...register("genresSelect")} >
        {listMovieGenres.map(genres => {
          return <option value={genres.id} data-value={genres.id} key={genres.id} className='' >{genres.name}</option>
        })}
      </select>
      <label className="font-semibold mb-2">Sort by </label>
      <select className='dark:bg-[#262626] mb-3 peer w-5/6 rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-1 transition-all  focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-1 disabled:border-0 disabled:bg-blue-gray-50' {...register("sortRelease")} >
        <option value='popularity.desc'>Popularity &#8595;</option>
        <option value='popularity.asc'>Popularity &#8593;</option>
        <option value='primary_release_date.desc'>Release Year &#8595;</option>
        <option value='primary_release_date.asc'>Release Year &#8593;</option>
        <option value='revenue.desc'>Revenue &#8595;</option>
        <option value='revenue.asc'>Revenue &#8593;</option>
        <option value='vote_average.desc'>Vote Average &#8595;</option>
        <option value='vote_average.asc'>Vote Average &#8593;</option>
      </select>
      <label className="font-semibold mb-2">Year </label>
      <ReactDatePicker
        selected={yearPicker}
        onChange={(date) => handleValueChange(date)}
        showYearPicker
        dateFormat="yyyy"
        className="dark:bg-[#262626] mb-3 peer w-5/6 rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-1 transition-all  focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-1 disabled:border-0 disabled:bg-blue-gray-50 "
      />
      <button className="middle none center mr-3 rounded-lg border border-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:opacity-75 focus:ring focus:ring-pink-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Sort</button>
    </form>
  )
}

export default Filter

