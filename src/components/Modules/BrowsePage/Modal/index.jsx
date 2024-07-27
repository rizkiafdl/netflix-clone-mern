import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'

import { DETAIL_VIDEO } from '@/constants/dummyVideo'
import { MdClose } from 'react-icons/md'
import { GoPlay, GoPlusCircle } from 'react-icons/go'
import Recomendation from '@mods/BrowsePage/Modal/Recomendation'
import { getMovieDetail } from '@/utils/getMovieDetail'
import { getVideoUrl } from '@/utils/getVideoUrl'

import { isOpenModalAtom } from '@/jotai/atoms'
import { idMovieAtom } from '@/jotai/atoms'
import ReactPlayer from 'react-player'
import { useNavigate } from 'react-router-dom'

const Modal = () => {
    const [isOpenModal, setIsOpenModal] = useAtom(isOpenModalAtom)
    const [idMovie, setIdMovie] = useAtom(idMovieAtom)
    const [movieDetail, setMovieDetail] = useState([])
    const [videoUrl, setVideoUrl] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (idMovie) {
            getMovieDetail({ movie_id: idMovie }).then(result => setMovieDetail(result))
            getVideoUrl({ movie_id: idMovie }).then(result => setVideoUrl(result))
        }

    }, [idMovie])

    const genreMapping = (genres) => {
        if (genres) {
            let result = ""
            genres.map((genre, index) => {
                if (index === genres.length - 1) {
                    result += genre.name
                } else {
                    result += genre.name + ", "
                }
            })
            return result
        }
    }

    return (
        <dialog className={`modal ${isOpenModal ? 'modal-open shadow-md' : ''}`}>
            <div className='modal-box w-full max-w-screen-md p-0'>
                <div className='relative'>
                    <div className='h-[450px]'>
                        <ReactPlayer
                            width={"100%"}
                            height={"100%"}
                            playing={"true"}
                            muted={"true"}
                            loop={"true"}
                            url={`https://youtube.com/watch?v=${videoUrl}`}
                        />
                    </div>
                    <button
                        onClick={() => setIsOpenModal(false)}
                        className='absolute top-2
                    right-2 rounded-full border p-1'>
                        <MdClose size={24} />
                    </button>
                    <div className='absolute top-80'>
                        <div className='relative buttom left-10'>
                            <h2 className='text-4xl font-black text-white'>{movieDetail?.title}</h2>
                        </div>
                        <div className='absolute left-10 '>
                            <div className='flex gap-2'>
                                <button className='bg-slate-50 w-32 text-black flex items-center justify-center gap-1 p-1.5 rounded-md'
                                    onClick={() => {
                                        navigate("/watch/" + videoUrl)
                                        setIsOpenModal(false)
                                        setVideoUrl(null)
                                        setMovieDetail([])
                                        setIdMovie(null)
                                    }
                                    }><GoPlay size={32} /> Play</button>
                                <button className='text-slate-200 hover:text-white'><GoPlusCircle size={32} /></button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-12 px-4 py-4 '>
                    <div>
                        <div className='flex gap-2'>
                            <p>
                                {movieDetail?.release_date}
                            </p>
                            <p className='text-green-400/90'>
                                {movieDetail?.runtime} Minutes
                            </p>
                        </div>
                        <p className='mt-4 text-white'>{movieDetail?.overview}</p>
                    </div>
                    <div className='flex flex-col gap-4 text-white'>
                        <p>Genre: {genreMapping(movieDetail?.genres)}</p>
                        <p>Popularity : {movieDetail?.popularity}</p>
                    </div>
                </div>
                <Recomendation />
            </div>
        </dialog>
    )
}

export default Modal