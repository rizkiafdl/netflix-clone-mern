import { idMovieAtom, isOpenModalAtom } from '@/jotai/atoms'
import EachUtils from '@/utils/EachUtils'
import React, { useEffect, useState } from 'react'
import { GoPlay } from 'react-icons/go'
import { getMoviesRecommendation } from '@/utils/getMoviesRecommendation'
import { useAtom } from 'jotai'
import { getVideoUrl } from '@/utils/getVideoUrl'
import { useNavigate } from 'react-router-dom'

const Recomendation = () => {
    const [idMovie] = useAtom(idMovieAtom)
    const [recom, setRecom] = useState([])
    const [videoUrl, setVideoUrl] = useState(null)
    const [IsOpenModal, SetOpenModal] = useAtom(isOpenModalAtom)
    const navigate = useNavigate()

    useEffect(() => {
        if (idMovie) {
            getMoviesRecommendation({ movie_id: idMovie })
                .then(result => {
                    if (result !== null && result !== undefined) {
                        setRecom(result);
                    } else {
                        console.log("No recommendation found.");
                    }
                })
                .catch(error => {
                    console.error("An error occurred:", error);
                });
        }
    }, [])

    return (
        <div className='px-4 py-2'>
            <h2 className='text-2xl font-bold mt-4'>
                Movies Recomendation
            </h2>
            <div className='grid grid-cols-3 gap-2 mt-4'>
                <EachUtils
                    of={recom} render={(item, index) => (
                        <div
                            key={index}
                            className='w-full h-auto cursor-pointer rounded-md bg-[#141414]'
                            onMouseEnter={
                                () => getVideoUrl({ movie_id: item.id }).then(results => setVideoUrl(results)
                                )
                            }
                        >
                            <div className='relative'>
                                <img src={import.meta.env.VITE_BASE_URL_TMDB_IMAGE + item.poster_path} className='w-full h-48 rounded-t-md' />

                                <button className='absolute top-10 left-1/2 -translate-x-1/2'
                                    onClick={() => {
                                        navigate("/watch/" + videoUrl)
                                        SetOpenModal(false)
                                    }}
                                >
                                    <GoPlay size={44} />
                                </button>
                            </div>
                            <div className='p-4 max-h-max'>
                                <div className='flex gap-2 text-white'>
                                    <p>{item.release_date}</p>
                                    <p className={item.vote_average < 7 ? 'text-red-400' : 'text-green-400'}>
                                        {item.vote_average}
                                    </p>
                                </div>
                                <p className='text-wrap pt-2 max-h-32 overflow-y-scroll'>{item.overview}</p>
                            </div>
                        </div>
                    )} />
            </div>
        </div>
    )
}

export default Recomendation