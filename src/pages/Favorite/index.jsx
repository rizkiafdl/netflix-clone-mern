import EachUtils from '@/utils/EachUtils'
import React, { useEffect, useState } from 'react'
import MovieCard from '@/components/Modules/BrowsePage/MovieCard'
import { useAtom } from 'jotai'
import { idMovieAtom, isOpenModalAtom } from '@/jotai/atoms'
import BrowseLayout from '@/components/Layouts/BrowseLayout'
import { apiInstanceExpress } from '@/utils/apiInstance'
import { tokenAtom, emailStorageAtom } from "@/jotai/atoms"
import Modal from '@/components/Modules/BrowsePage/Modal'

const Favorite = () => {
    const [isHover, setIsHover] = useState(false)
    const [, setIdMovie] = useAtom(idMovieAtom)
    const [tokenStorage] = useAtom(tokenAtom)
    const [emailStorage] = useAtom(emailStorageAtom)
    const [movies, setMovies] = useState([]);
    const [, setIsSubmit] = useState(false)


    const handleMovies = async () => {
        if (emailStorage && tokenStorage) {
            try {
                const response = await apiInstanceExpress.get(`/my-movies/${emailStorage}/${tokenStorage}`);
                setMovies(response.data.data.favoriteMovies);
                setIsSubmit(false);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setIsSubmit(false);
            }
        }
    };

    useEffect(() => {
        handleMovies();
    }, [emailStorage, tokenStorage, movies]);
    // Optional: If you want to re-fetch movies when a new movie is added

    return (
        <BrowseLayout>
            <Modal />
            <div className='mt-20 px-8'>
                <h3 className='text-white font-bold text-2xl'>My Favorite Movies</h3>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 px-8 py-8'>
                <EachUtils
                    of={movies}
                    render={(item, index) => (
                        <div
                            className=' h-72'
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
        </BrowseLayout>
    )
}

export default Favorite