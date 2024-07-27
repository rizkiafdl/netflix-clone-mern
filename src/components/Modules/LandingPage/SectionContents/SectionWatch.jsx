import React from 'react'
import SectionLayout from '@/components/Layouts/SectionLayout'
import EachUtils from '@/utils/EachUtils'

import { useAtom } from 'jotai'
import { languangeAtom } from '@/jotai/atoms'
import { LIST_CONTENT_2_EN, LIST_CONTENT_2_ID } from '@/constants/listContent'
import { WATCH_DEVICE_IMAGE, WATCH_DEVICE_VIDEO } from '@/constants/listAsset'

const SectionWatch = () => {
    const [languange] = useAtom(languangeAtom)
    return (
        <SectionLayout>
            <EachUtils of={languange === "en" ? LIST_CONTENT_2_EN : LIST_CONTENT_2_ID} render={(item, index) => (
                <div key={index}>
                    <h2 className='text-5xl font-black'>{item.title}</h2>
                    <p className='text-2xl mt-4'>{item.desc}</p>
                </div>
            )} />
            <div className='relative max-w-xl mx-auto'>
                <img src={WATCH_DEVICE_IMAGE} className='relative w-full h-auto z-10' />
                <div className='absolute top-10 items-center justify-center'>
                    <video autoPlay loop muted className='w-[50%] h-[50%] object-cover top-10'>
                        <source src={WATCH_DEVICE_VIDEO} type="video/mp4" />
                    </video>
                </div>
            </div>
        </SectionLayout>
    )
}

export default SectionWatch
