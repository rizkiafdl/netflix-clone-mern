import React, { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import { idMovieAtom, isFetchingAtom, searchMoviesAtom } from '@/jotai/atoms'
import { searchMovies } from '@/utils/searchMovies'
import EachUtils from '@/utils/EachUtils'
import MovieCard from '@mods/BrowsePage/MovieCard'

const SearchMovies = () => {
    const [isHover, setIsHover] = useState(false)
    const [movieList, setMovieList] = useState([])

    const [, setIdMovie] = useAtom(idMovieAtom)
    const [searchQuery] = useAtom(searchMoviesAtom)
    const [, SetIsFetching] = useAtom(isFetchingAtom)

    useEffect(() => {
        searchMovies({ query: searchQuery }).then(result => {
            SetIsFetching(true)
            setMovieList(result)
        }).finally(() => {
            setTimeout(() => {
                SetIsFetching(false)
            }, 500)
        })
    }, [searchQuery])

    return (
        <div className='grid grid-cols-4 p-8 mt-10'>
            <EachUtils
                of={movieList}
                render={(item, index) => (
                    <div className='carousel-item h-72 w-1/4 mt-4'
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
                        />
                    </div>
                )} />
        </div>
    )
}

export default SearchMovies

