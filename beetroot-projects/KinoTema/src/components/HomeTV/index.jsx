import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import routes from '../../routing/routes';
import { useGetAirSerialsIdsQuery, useGetNewSeriesQuery } from '../../Store/API/api';

function HomeTV() {
    const [tvId, setTvId] = useState()
    const { data } = useGetNewSeriesQuery(tvId)
    const { data: serialsIds } = useGetAirSerialsIdsQuery('')

    useEffect(() => {
        const tvIds = serialsIds?.results.map(el => el.id)
        setTvId(tvIds)
    }, [serialsIds?.results])

    return (
        <div className='flex flex-col border-l-2 border-black dark:border-white px-3'>
            <p className='font-bold mb-2 text-2xl text-black dark:text-[#ededed]'>New Series</p>
            <ul className='flex flex-col '>
                {data?.map(el => (
                    <li key={Math.random()} className='flex flex-col border-b border-[#cdc7c7] dark:text-[#ededed] cursor-pointer hover:text-[#d092b2] dark:hover:text-[#d092b2]' >
                        <Link to={`${routes.serials}/${el.data?.id}`}>
                            <div className='flex justify-between'>
                                <div className='flex'>
                                    <p className='font-semibold'>Title:</p> {el.data?.original_name},
                                    <p className='font-semibold'>Season:</p> {el.data.last_episode_to_air?.season_number}
                                </div>
                                <div className='flex'>
                                    <p className='font-semibold'>Episode:</p> {el.data.last_episode_to_air?.episode_number}
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default HomeTV
