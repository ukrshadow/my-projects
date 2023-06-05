import { useEffect, useState } from 'react'
import { OPTIONS } from "../../pages/fetchOptions";
import { Link } from 'react-router-dom';
import routes from '../../routing/routes';
import { useTestTopRatedSerialsQuery } from '../../Store/API/api';

function HomeTV() {
    const [tvId, setTvId] = useState([])
    const [tvList, setTvList] = useState([])
    const [lol, setLol] = useState([]) 
    const data = useTestTopRatedSerialsQuery([...lol])
    console.log('cb',data);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/tv/airing_today?&with_origin_country=US&language=en-US', OPTIONS)
            .then(response => response.json())
            .then(data => {
                const tvId1 = data.results.map(el => el.id)
                setTvId(tvId1)
                console.log('tvId1',tvId1); 
                
            }) 
            .catch(err => console.error(err));
    }, [])

       useEffect(() => {
        console.log('tvId',tvId);
        const tvList = () => Promise.all(tvId.map(id =>{
            return {id: id}
        }
    ))
        tvList().then(res => setLol(res))

    }, [tvId])

    /* useEffect(() => {
        const tvList = () => Promise.all(tvId.map(el => fetch(`https://api.themoviedb.org/3/tv/${el}?language=en-US`, OPTIONS)
            .then(response => response.json())
            .then(data => {
                return {
                    id: data.id,
                    title: data.original_name,
                    last_air_date: data.last_air_date,
                    last_episode_to_air: data.last_episode_to_air.episode_number,
                    season_number: data.last_episode_to_air.season_number,
                    episode_run_time: data.episode_run_time[0],
                }
            })
            .catch(err => console.error(err))))
        tvList().then(res => setTvList(res))
    }, [tvId]) */

    return (
        <div className='flex flex-col border-l-2 border-black dark:border-white px-3'>
           {/*  <p className='font-bold mb-2 text-2xl text-black dark:text-[#ededed]'>New Series</p>
            <ul className='flex flex-col '>
                {tvList.map(el => (
                    <li key={Math.random()} className='flex flex-col border-b border-[#cdc7c7] dark:text-[#ededed] cursor-pointer hover:text-[#d092b2] dark:hover:text-[#d092b2]' >
                        <Link to={`${routes.serials}/${el.id}`}> <div className='flex justify-between'>
                            <div className='flex'>
                                <p className='font-semibold'>Title:</p> {el.title},
                                <p className='font-semibold'>Season:</p> {el.season_number}
                            </div>
                            <div className='flex'>
                                <p className='font-semibold'>Episode:&nbsp;</p> {el.last_episode_to_air}
                            </div>
                        </div>
                        </Link>
                    </li>
                ))}
            </ul> */}
        </div>
    )
}

export default HomeTV