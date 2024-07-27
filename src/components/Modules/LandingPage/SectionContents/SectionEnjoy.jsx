import React from 'react'
import EachUtils from '@/utils/EachUtils'
import SectionLayout from '@/components/Layouts/SectionLayout'

import { useAtom } from 'jotai'
import { languangeAtom } from '@/jotai/atoms'
import { LIST_CONTENT_1_EN, LIST_CONTENT_1_ID } from '@/constants/listContent'
import { ENJOY_TV_IMAGE, ENJOY_TV_VIDEO } from '@/constants/listAsset'

const SectionEnjoy = () => {
    const [languange] = useAtom(languangeAtom)
    return (

        <SectionLayout>
            <EachUtils of={languange == "en" ? LIST_CONTENT_1_EN : LIST_CONTENT_1_ID}
                render={(items, index) => (
                    <div key={index} className='px-8'>
                        <h2 className='font-black text-5xl'>{items.title}</h2>
                        <p className='text-2xl mt-4'>{items.desc}</p>
                    </div>
                )} />
            <div className='relatie max-w-xl mx-auto'>
                <img src={ENJOY_TV_IMAGE} alt="Enjoy TV" className="relative z-10" />
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 w-[37%] ml-60'>
                    <video autoPlay muted loop>
                        <source src={ENJOY_TV_VIDEO} type='video/mp4' />
                    </video>
                </div>
            </div>
        </SectionLayout>
    )
}

export default SectionEnjoy
