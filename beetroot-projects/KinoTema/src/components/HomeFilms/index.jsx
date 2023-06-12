import { useEffect, useState } from "react"
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel, Tooltip } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import routes from "../../routing/routes";
import { useGetTopRatedFilmsQuery, useGetTopRatedSerialsQuery } from "../../Store/API/api";


const HomeFilms = () => {
  const [films, setFilms] = useState([])
  const [serials, setSerials] = useState([])
  const { data: dataSerials } = useGetTopRatedSerialsQuery({}); //test RTK
  const { data: dataFilms } = useGetTopRatedFilmsQuery({}); //test RTK

  function filmsList() {
    return films?.map(el => (
      <Tooltip
        key={Math.random()}
        content={<div>
          <span className="font-semibold">
            Overview.&nbsp;
          </span>
          {el.overview}
        </div>
        }
        placement="right"
        className="text-black bg-white rounded-xl z-50	max-w-[11rem] p-4 text-justify	">
        <div className="flex flex-col px-4 md:w-1/4 items-center border dark:border-gray-700 cursor-pointer mb-2" >
          <Link to={`${routes.films}/${el.id}`}>
            <div className="relative" >
              <img src={`https://image.tmdb.org/t/p/original${el.poster_path}`} alt={el.title} className='mb-1 w-48' />
              <span className="absolute bottom-0 right-0  text-black font-semibold rounded-full bg-[#d092b2] w-7 h-7 flex items-center justify-center">{el.vote_average}</span>
            </div>
            <p className="font-semibold dark:text-white text-center" >{el.title},</p>
            <p className="dark:text-white">{el.release_date.split('-').slice(0, 1).join('')}</p>
          </Link>
        </div>
      </Tooltip>
    ))
  }

  const serialsList = () => {
    return serials?.map(el => (
      <Tooltip
        key={Math.random()}
        content={<div>
          <span className="font-semibold">
            Overview.&nbsp;
          </span>
          {el.overview}
        </div>
        }
        placement="right"
        className="text-black bg-white rounded-xl z-50	max-w-[11rem] p-4 text-justify	">
        <div key={Math.random()} className="flex flex-col px-4 md:w-1/4 border dark:border-gray-700 items-center cursor-pointer mb-2" >
          <Link to={`${routes.serials}/${el.id}`}>
            <div className="relative">
              <img src={`https://image.tmdb.org/t/p/original${el.poster_path}`} alt={el.original_name} className='mb-1 w-48' />
              <span className="absolute bottom-0 right-0 text-black font-semibold rounded-full bg-[#d092b2] w-7 h-7 flex items-center justify-center">{el.vote_average}</span>
            </div>
            <p className="font-semibold dark:text-white text-center">{el.original_name},</p>
            <p className="dark:text-white">{el.first_air_date.split('-').slice(0, 1).join('')}</p>
          </Link>
        </div>
      </Tooltip>
    ))
  }

  const dataTabs = [
    {
      label: "Films",
      value: "films",
      desc: filmsList(),
    },
    {
      label: "Serials",
      value: "serials",
      desc: serialsList(),
    },
  ];

  useEffect(() => {
    setFilms(dataFilms?.results); // test RTK
  }, [dataFilms])

  useEffect(() => {
    setSerials(dataSerials?.results); // test RTK
  }, [dataSerials])


  return (
    <>
      <Tabs value="films" id="custom-animation" className="px-4">
        <TabsHeader
          className="rounded-lg bg-[#e1e1e1] p-1 mb-4"
          indicatorProps={{
            className: "bg-blue-500/10 shadow-none text-blue-500",
          }}>
          {dataTabs.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              activeClassName='bg-[#767676] text-white'
              className="font-bold hover:bg-[#767676] hover:text-white rounded-lg">
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
          animate={{
            initial: { x: 250 },
            mount: { x: 0 },
            unmount: { x: 250 },
          }}>
          {(dataTabs.map(({ value, desc }) => (
            <TabPanel key={value} value={value} >
              <div className="flex flex-col md:flex-row md:flex-wrap ">
                {desc}
              </div>
            </TabPanel>
          )))}
        </TabsBody>
      </Tabs>
    </>
  )
}

export default HomeFilms

