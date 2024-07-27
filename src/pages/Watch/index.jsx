import { GoChevronLeft } from 'react-icons/go'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import BrowseLayout from '@/components/Layouts/BrowseLayout'
import ReactPlayer from 'react-player'

const Watch = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    return (
        <BrowseLayout>
            <div
                className='absolute top-20 left-6 hover:text-white hover:scale-105 transition-all cursor-pointer 
            '
                onClick={() => navigate("/browse")}>
                <GoChevronLeft size={45} />
            </div>
            <ReactPlayer
                url={"https://youtube.com/watch?v=" + id}
                width={"100%"}
                height={"100vh"}
                playing={true}
                muted={true}
                controls={false}
            />
        </BrowseLayout>
    )
}

export default Watch