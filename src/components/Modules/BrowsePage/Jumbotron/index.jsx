import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { GoPlay, GoMute, GoUnmute } from "react-icons/go"
import { getMoviesByType } from '@/utils/getMoviesByType'
import { useAtom } from 'jotai'
import { idMovieAtom, isOpenModalAtom } from '@/jotai/atoms'
import { getVideoUrl } from '@/utils/getVideoUrl'
import { useNavigate } from 'react-router-dom'

const Jumbotron = () => {
    const navigate = useNavigate()
    const [isMuted, setIsMuted] = useState(true)
    const [IsopenModal, setIsOpenModal] = useAtom(isOpenModalAtom)

    const [, setidMovieAtom] = useAtom(idMovieAtom)
    const [topMovies, setTopMovies] = useState([])
    const [idMovie, setIdMovie] = useState(null)
    const [videoUrl, setVideoUrl] = useState(null)

    useEffect(() => {
        getMoviesByType({ moviesType: "top_rated" }).then(result => {
            setTopMovies(result[0])
            setIdMovie(result[0].id)
        }).finally(() => getVideoUrl({ movie_id: idMovie }).then(result => setVideoUrl(result)))
    }, [idMovie])

    return (
        <div className='relative left-0 top-0 h-[500px] w-full'>
            <ReactPlayer
                url={"https://www.youtube.com/watch?v=" + videoUrl}
                width={"100%"} height={"700px"}
                playing={true}
                muted={isMuted}
                controls={false}
                style={{ opacity: "70%" }}
            />
            <div className='absolute top-1/2 -translate-y-1/2 p-8 max-w-xl text-white'>
                <div className='flex flex-col gap-4 '>
                    <h1 className='text-3xl sm:text-5xl font-black'>{topMovies.title}</h1>
                    <p className='hidden md:block'>{topMovies.overview}</p>
                </div>
                <div className='flex gap-4 mt-4'>
                    <button
                        onClick={() => {
                            navigate("/watch/" + videoUrl)
                            setIsMuted(false)
                        }}
                        className='bg-gray-200 py-2 px-8 rounded-md text-xl font-bold text-black flex items-center gap-1'>
                        <GoPlay />Play</button>
                    <button
                        onClick={() => {
                            setIsOpenModal(true)
                            setidMovieAtom(idMovie)
                        }}
                        className='bg-gray-600/80 py-2 px-8 rounded-md text-xl font-bold text-white flex items-center gap-1'>More Detail</button>
                </div>
            </div>
            <div className='absolute  bottom-1/2 -translate-y-1/2 right-6 text-white'>
                <div className='border rounded-full p-2 cursor-pointer'
                    onClick={() => setIsMuted(!isMuted)}>
                    {isMuted ? <GoMute size={24} /> : <GoUnmute size={24} />}
                </div>
            </div>
        </div>
    )
}

export default Jumbotron