import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { OPTIONS } from '../../pages/fetchOptions'

export const api = createApi({
    reducerPath:'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.themoviedb.org/3/'
    }),
    endpoints: (build) => ({
        getTopRatedFilms: build.query ({
            query:() => ({
                url:`movie/top_rated?language=en-US`,       /* `top_rated?language=en-US` */
                method: 'GET',
                headers: OPTIONS.headers
                /* body:{} */
            })
        }),
        getTopRatedSerials: build.query({
            query:() =>({
                url:'/tv/top_rated?language=en-US',
                method: 'GET',
                headers: OPTIONS.headers
            })
        }),
        testTopRatedSerials: build.query({
            query:(data) =>({
                url: `/tv/${data ? data.map(el=>el.id) : console.log(3232)}?language=en-US`,
                method: 'GET',
                headers: OPTIONS.headers 
            })
        }),
    })


})
export const {useGetTopRatedFilmsQuery, useGetTopRatedSerialsQuery, useTestTopRatedSerialsQuery} = api