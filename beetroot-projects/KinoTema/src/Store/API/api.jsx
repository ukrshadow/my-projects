import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { OPTIONS } from '../../pages/fetchOptions'

export const api = createApi({

    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.themoviedb.org/3/',
        prepareHeaders: (headers) => {
            headers.set('authorization', OPTIONS.headers.Authorization)
            return headers
        },

    }),
    endpoints: (build) => ({
        getTopRatedFilms: build.query({
            query: () => ({
                url: `movie/top_rated?language=en-US`,       
                method: 'GET',
                headers: OPTIONS.headers
          
            })
        }),
        getTopRatedSerials: build.query({
            query: () => ({
                url: '/tv/top_rated?language=en-US',
                method: 'GET',
                headers: OPTIONS.headers
            })
        }),
        getAirSerialsIds: build.query({
            query: () => ({
                url: '/tv/airing_today?&with_origin_country=US&language=en-US',
                method: 'GET',
                headers: OPTIONS.headers
            })
        }),
        getNewSeries: build.query({
            queryFn: async (data, _, extraOptions, fetch) => {
                if (data) {
                        const promises = await data.map((id) => {
                            return fetch(`/tv/${id}?language=en-US`);
                        });
                        return Promise.all(promises).then((results) => {
                            return { data: results };
                        });
                } else {
                    return { error: 'No match TV series' }
                }
            },
        }),
    })


})
export const { useGetTopRatedFilmsQuery, useGetTopRatedSerialsQuery, useGetAirSerialsIdsQuery, useGetNewSeriesQuery } = api