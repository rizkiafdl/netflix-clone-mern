import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { GoPlay, GoPlusCircle, GoChevronDown, GoTrash } from "react-icons/go"
import { motion } from "framer-motion"
import { useAtom } from 'jotai'
import { idMovieAtom, isOpenModalAtom, isFetchingAtom, tokenAtom, emailStorageAtom, isFavoriteAtom } from "@/jotai/atoms"
import { getVideoUrl } from '@/utils/getVideoUrl'
import Skeleton from './Skeleton'
import { useNavigate } from 'react-router-dom';
import { apiInstanceExpress } from '@/utils/apiInstance'
import Notification from '../../Elements/Notification'
import { checkFavoriteMovies } from '@/utils/CheckFavoriteMovies'

const MovieCard = ({ data, isHover, setIsHover, moviesType }) => {
    const navigate = useNavigate()
    const [isOpenModal, setIsOpenModal] = useAtom(isOpenModalAtom)
    const [idMovie, setIdMovie] = useAtom(idMovieAtom)
    const [tokenStorage] = useAtom(tokenAtom)
    const [emailStorage] = useAtom(emailStorageAtom)
    const [isFetching] = useAtom(isFetchingAtom)
    const [isFavorite, setIsFavorite] = useAtom(isFavoriteAtom)

    const [videoUrl, setVideoUrl] = useState(null)
    const [isSubmit, setIsSubmit] = useState(false)
    const [notifMessage, setNotifMessage] = useState(null)
    const [moviesTypeState, setMoviesTypeState] = useState(null)


    const handleFavoriteMovies = async () => {
        if (!emailStorage && !tokenStorage) return

        try {
            setIsSubmit(true)
            const addMovie = await apiInstanceExpress.post('my-movies', { email: emailStorage, token: tokenStorage, data })
            console.log(addMovie)
            if (addMovie.status == 201) {
                setNotifMessage(`Film ${data.title} berhasil ditambahkan`);
            }

            setTimeout(() => {
                setIsSubmit(false)
                setNotifMessage(null)
            }, 3000)
        } catch (error) {
            if (error.response && error.response.status === 403) {
                setIsSubmit(true);
                setNotifMessage(`Film ${data.title} Sudah Ditambahkan`);

                setTimeout(() => {
                    setIsSubmit(false)
                    setNotifMessage(null)
                }, 3000)
            } else {
                console.log('Catch Error:', error);
                setIsSubmit(false);
                setNotifMessage('Terjadi kesalahan');
            }
        }
    }
    const handleUnFavoriteFilm = async () => {
        if (emailStorage && tokenStorage) {
            try {
                setIsSubmit(true)
                const removeMovie = await apiInstanceExpress.delete('my-movies', {
                    data: {
                        email: emailStorage,
                        token: tokenStorage,
                        movieID: data.id
                    }
                })
                if (removeMovie.status !== 204) {
                    setNotifMessage(`Film ${data.title} gagal dihilangkan dalam myList`);
                } else {
                    setIsFavorite(false)
                    setNotifMessage(`Film ${data.title} berhasil dihilangkan dari myList`);
                }
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    setNotifMessage(`Film ${data.title} gagal dihilangkan dari myList`)
                    setTimeout(() => {
                        setIsSubmit(false)
                        setNotifMessage(null)
                    }, 3000)
                } else {
                    console.log('Catch Error:', error);
                    setIsSubmit(false);
                    setNotifMessage('Aman Saja');
                }
            }
        }
    }
    if (isFetching) return <Skeleton />


    return (
        <>
            {isSubmit && notifMessage && <Notification message={notifMessage} />}

            {isHover && idMovie == data.id && moviesType === moviesTypeState ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0, easeIn: 'easeOut' }}
                    className='relative shadow-md transition-all w-full'>
                    <div className='hover:scale-105 transition-all'>
                        <ReactPlayer
                            playing={false}
                            url={`https://youtube.com/watch?v=${videoUrl}`}
                            loop={true}
                            muted={true}
                            width={"100%"}
                            height={"180px"}
                            controls={false} />
                    </div>


                    <div className='h-auto p-4 bg-[#141414] flex flex-col gap-1.5 rounded-b-xl'>
                        <section className='mt-1 flex justify-between'>
                            <div className='flex gap-2'>
                                <button
                                    onClick={() => navigate("/watch/" + videoUrl)}
                                ><GoPlay size={32} />
                                </button>
                                <button
                                    className='hover:text-white transition-all'
                                    onClick={() => {
                                        if (isFavorite) {
                                            handleUnFavoriteFilm();
                                        } else {
                                            handleFavoriteMovies();
                                        }
                                    }}
                                >
                                    {isFavorite ? <GoTrash size={32} /> : <GoPlusCircle size={32} />}  </button>
                            </div>

                            <div>
                                <button className='rounded-full p-1 border'
                                    onClick={() => {
                                        setIsOpenModal(true)
                                        console.log("Modal Atom Value", isOpenModalAtom)
                                    }
                                    }
                                ><GoChevronDown size={20} /></button>
                            </div>
                        </section>

                        <section className='text-left'>
                            <h2 className='font-semibold'>{data.title}</h2>
                            <p className='text-green-400'>Popularity : {data.popularity}</p>
                        </section>
                    </div >
                </motion.div >

            ) : <img
                onMouseEnter={() => {
                    setIsHover(true)
                    setIdMovie(data.id)
                    getVideoUrl({ movie_id: data.id }).then(result => setVideoUrl(result))
                    checkFavoriteMovies({ email: emailStorage, token: tokenStorage, data: data }).then(result => setIsFavorite(result))
                    setMoviesTypeState(moviesType)
                }}
                src={`${import.meta.env.VITE_BASE_URL_TMDB_IMAGE}${data.poster_path}`}
                className='w-full max-h-72 cursor-pointer object-cover rounded-md' />}

        </>

    )
}

export default MovieCard