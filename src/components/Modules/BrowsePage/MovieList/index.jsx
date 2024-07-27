import React, { useEffect, useState } from 'react'
import { useAtom } from 'jotai'

import { idMovieAtom, isFetchingAtom } from "@/jotai/atoms"
import { getMoviesByType } from '@/utils/getMoviesByType'
import EachUtils from '@/utils/EachUtils'
import MovieCard from '@/components/Modules/BrowsePage/MovieCard'
import CarouselLayouts from '@/components/Layouts/CarouselLayout'

const MovieList = ({ title, moviesType }) => {
    const [, setIdMovie] = useAtom(idMovieAtom)
    const [, SetIsFetching] = useAtom(isFetchingAtom)

    const [isHover, setIsHover] = useState(false)
    const [movieList, setMovieList] = useState([])

    useEffect(() => {
        if (moviesType) {
            getMoviesByType({ moviesType }).then((result) => {
                SetIsFetching(true)
                setMovieList(result)
            }).finally(() => {
                setTimeout(() => SetIsFetching(false))
            }, 500)
        }
    }, [moviesType])

    return (
        <section className='px-8 py-4 relative'>
            <h3 className='text-3xl font-semibold my-2 text-white'>  {title}
            </h3>
            <CarouselLayouts>
                <EachUtils
                    of={movieList}
                    render={(item, index) => (
                        <div className='carousel-item  w-1/2 md:w-1/4 lg:w-1/6 px-1 '
                            key={index}
                            onMouseLeave={() => {
                                setIsHover(false)
                                setIdMovie(null)
                            }}
                        >
                            <MovieCard
                                data={item}
                                isHover={isHover}
                                setIsHover={setIsHover}
                                moviesType={moviesType}
                            />
                        </div>
                    )} />
            </CarouselLayouts>
        </section>
    )
}

export default MovieList