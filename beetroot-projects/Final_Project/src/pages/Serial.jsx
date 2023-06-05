import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { OPTIONS } from './fetchOptions';



const Serial = () => {
  const { serialId } = useParams();
  const [serial, setserial] = useState(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/${serialId}`, OPTIONS)
      .then(res => res.json())
      .then(data => {
        setserial(data)
      })
      .catch(err => console.error(err));
  }, [])

  return (
    <>
      {serial && (
        <div className="container mx-auto">
          <div className='pb-20'>
            <h1 className='text-4xl font-bold text-black-600 dark:text-white sm:text-center md:text-start'>{serial.name} ({serial.original_name})</h1>
            <div className='font-semibold text-black-600 dark:text-white mb-6 sm:text-center md:text-start'>{serial.tagline}</div>
            <div className='flex gap-10 mb-10'>
              <img src={`https://image.tmdb.org/t/p/original${serial.poster_path}`} alt={serial.original_name}
                className='w-80 h-full' />
              <div className=''>
                <table className='w-[39rem]  dark:text-white'>
                  <tbody>
                    <tr className='h-14 flex flex-col lg:flex-row lg:table-row '>
                      <td>
                        <div className='font-bold'>Raiting:</div>
                      </td>
                      <td className=''>
                        <div className='flex gap-4'>
                          <span className='font-semibold'>Average:</span> {serial.vote_average.toFixed(1)}
                          <span className='font-semibold'>Vote count:</span> {serial.vote_count}
                        </div>
                      </td>
                    </tr>
                    <tr className='h-14 flex flex-col lg:flex-row lg:table-row '>
                      <td className="">
                        <div className='font-bold'>Type:</div>
                      </td>
                      <td>TV</td>
                    </tr>
                    <tr className='h-14 flex flex-col lg:flex-row lg:table-row '>
                      <td className="">
                        <div className='font-bold'>Release date:</div>
                      </td>
                      <td>{serial.first_air_date}</td>
                    </tr>
                    <tr className='h-14 flex flex-col lg:flex-row lg:table-row mb-10'>
                      <td>
                        <div className='font-bold'>Series:</div>
                      </td>
                      <td className='flex flex-col lg:flex-row lg:table-row '>
                        <div className='flex lg:gap-4 flex-col'>
                          <span className='font-semibold'>Seasons:</span> {serial.number_of_seasons}
                          <div className='flex gap-1 '>
                            <span className='font-semibold'>Episodes:</span> {serial.number_of_episodes}<span className=' text-sm leading-loose	 lg:leading-relaxed	'>(Last update: {serial.last_air_date})</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className='h-14 flex flex-col lg:flex-row lg:table-row '>
                      <td className="">
                        <div className='font-bold'>Country:</div>
                      </td>
                      <td>{serial.production_countries.map(country => <div key={Math.random()}>
                        <span>{country.name}</span>
                      </div>)}
                      </td>
                    </tr>
                    <tr className='h-14 flex flex-col lg:flex-row lg:table-row mb-5 '>
                      <td className="">
                        <div className='font-bold'>Genre:</div>
                      </td>
                      <td>{serial.genres.map(ganres => <div key={Math.random()}>
                        <span>{ganres.name};</span>
                      </div>)} </td>
                    </tr>
                    {serial.episode_run_time.length > 0 ? (<tr className='h-14 flex flex-col lg:flex-row lg:table-row '>
                      <td className="">
                        <div className='font-bold'>Time:</div>
                      </td>
                      <td>{serial.episode_run_time[0]} min</td>
                    </tr>) : ''}
                    {serial.created_by.length > 0 ? (<tr className='mb-5  h-14 flex flex-col lg:flex-row lg:table-row '>
                      <td className="">
                        <div className='font-bold'>Created by:</div>
                      </td>
                      <td>{serial.created_by.map(created => <div key={Math.random()}>
                        <span>{created.name}; </span>
                      </div>)} </td>
                    </tr>) : ''}
                    {serial.production_companies.length > 0 ? (<tr className='mb-10 h-14 flex flex-col lg:flex-row lg:table-row '>
                      <td className="">
                        <div className='font-bold'>Production companies:</div>
                      </td>
                      <td>
                        {serial.production_companies.map(companies => <div key={Math.random()}>
                          <span>{companies.name}; </span>
                        </div>)}
                      </td>
                    </tr>) : ""}

                  </tbody>
                </table>
              </div>
            </div>
            <p className='text-xl text-black-600 dark:text-white'>
              {serial.overview}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default Serial