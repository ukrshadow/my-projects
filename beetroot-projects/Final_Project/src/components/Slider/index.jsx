import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import routes from '../../routing/routes';
import { OPTIONS } from '../../pages/fetchOptions';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation } from "swiper";

const SliderHeader = () => {
  const [listFilms, setListFilms] = useState([]);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&primary_release_year=2023', OPTIONS)
      .then(response => response.json())
      .then(data => {
        setListFilms(data.results);
      })
      .catch(err => console.error(err));
  }, [])

  return (
    <div className='mt-10'>
      <Swiper
        slidesPerView={6}
        spaceBetween={30}
        freeMode={true}
        navigation={false}
        autoplay={true}
        modules={[FreeMode, Navigation, Autoplay]}>
        {listFilms.map(films =>
          <SwiperSlide key={films.id}>
            <Link to={`${routes.films}/${films.id}`}><div className='cursor-pointer'>
              <img src={`https://image.tmdb.org/t/p/original${films.poster_path}`} alt={films.title} className='mb-5' />
              <p className='font-semibold	text-black dark:text-white'>{films.title}</p>
              <p className='text-black dark:text-[#939292]'> Relise: {films.release_date.split('-').slice(0, 2).join('-')}</p>
            </div>
            </Link>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  )
}

export default SliderHeader
