import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { OPTIONS } from './fetchOptions';

const Film = () => {
  const { filmId } = useParams();
  const [film, setfilm] = useState(null);
  const [filmTrailer, setfilmTrailer] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${filmId}`, OPTIONS)
      .then(res => res.json())
      .then(data => {
        setfilm(data)
      })
      .catch(err => console.error(err));
  }, [filmId])

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${filmId}/videos?language=en-US`, OPTIONS)
      .then(res => res.json())
      .then(data => {
        setfilmTrailer(data.results)
      })
      .catch(err => console.error(err));
  }, [filmId])

  return (
    <>
      {film && (
        <div className="container mx-auto">
          <div className='pb-20'>
            <h1 className='text-4xl mb-6 font-bold text-black-600 dark:text-white sm:text-center md:text-start'>{film.original_title}</h1>
            <div className='flex gap-10 mb-10 flex-col items-center md:flex-row'>
              <img src={`https://image.tmdb.org/t/p/original${film.poster_path}`} alt={film.original_title}
                className='w-80' />
              <div className=''>
                <table className='w-[39rem] dark:text-white'>
                  <tbody>
                    <tr className='h-14 flex flex-col lg:flex-row lg:table-row '> 
                      <td>
                        <div className='font-bold'>Raiting:</div>
                      </td>
                      <td className=''>
                        <div className='flex gap-4'>
                          <span className='font-semibold'>Average:</span> {film.vote_average.toFixed(1)}
                          <span className='font-semibold'>Vote count:</span> {film.vote_count}
                        </div>
                      </td>
                    </tr>
                    <tr className='h-14 flex flex-col lg:flex-row lg:table-row'>
                      <td className="">
                        <div className='font-bold'>Type:</div>
                      </td>
                      <td>Movie</td>
                    </tr>
                    <tr className='h-14 flex flex-col lg:flex-row lg:table-row'>
                      <td className="">
                        <div className='font-bold'>Release date:</div>
                      </td>
                      <td>{film.release_date}</td>
                    </tr>
                    <tr className='h-14 flex flex-col mb-5 lg:flex-row lg:table-row'>
                      <td className="">
                        <div className='font-bold'>Country:</div>
                      </td>
                      <td>{film.production_countries.map(country => <div key={Math.random()}>
                        <span>{country.name}</span>
                      </div>)}
                      </td>
                    </tr>
                    <tr className='h-14 flex flex-col mb-10 lg:flex-row lg:table-row'>
                      <td className="">
                        <div className='font-bold'>Genre:</div>
                      </td>
                      <td>{film.genres.map(ganres => <div key={Math.random()}>
                        <span>{ganres.name};</span>
                      </div>)} </td>
                    </tr>
                    <tr className='h-14 flex flex-col lg:flex-row lg:table-row'>
                      <td className="">
                        <div className='font-bold'>Time:</div>
                      </td>
                      <td>{film.runtime} min</td>
                    </tr>
                    {film.production_companies.length > 0 ? (<tr className='h-14 flex flex-col lg:flex-row lg:table-row mb-10'>
                      <td className="">
                        <div className='font-bold'>Production companies:</div>
                      </td>
                      <td>
                        {film.production_companies.map(companies => <div key={Math.random()}>
                          <span>{companies.name}; </span>
                        </div>)}
                      </td>
                    </tr>) : ''}
                  </tbody>
                </table>
              </div>
            </div>
            <p className='text-xl text-black-600 dark:text-white'>
              {film.overview}
            </p>
          </div>
          <div className='flex justify-center pb-20 md:justify-start'>
            {filmTrailer.map(el => el.name === "Official Trailer" || el.name === "official trailer" ? (<div key={Math.random()} >
              <span className='text-2xl font-semibold dark:text-white mb-5 block'>{el.name}</span>
              <iframe src={`https://www.youtube.com/embed/${el.key}`} type="" className='w-96 h-96 md:w-[40rem] md:h-[30rem] lg:w-[60rem] lg:h-[40rem]'/>
            </div>) : '')}
          </div>
        </div>
      )}
    </>
  )
}

export default Film


