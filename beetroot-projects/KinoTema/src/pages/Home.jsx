import HomeFilms from "../components/HomeFilms"
import HomeTV from "../components/HomeTV"
import Slider from "../components/Slider"

function Home() {
  return (
    <>
      <div className="mb-2">
        <h2 className='text-4xl mb-10 font-bold	text-black dark:text-white'> Upcoming</h2>
        <Slider />
      </div>
      <div className="flex flex-col items-center justify-center md:flex-row md:items-start">
        <div className="w-1/2  md:w-4/6">
          <HomeFilms />
        </div>
        <div className="w-1/2 pb-20 md:w-2/6 md:pb-0">
          <HomeTV />
        </div>
      </div>
    </>
  )
}

export default Home