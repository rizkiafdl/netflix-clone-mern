import React from 'react'
import SectionLayout from '@/components/Layouts/SectionLayout'
import EachUtils from '@/utils/EachUtils'

import { useAtom } from 'jotai'
import { LIST_CONTENT_4_EN, LIST_CONTENT_4_ID } from '@/constants/listContent'
import { DOWNLOAD_PHONE_IMAGE, DOWNLOAD_COVER_IMAGE } from '@/constants/listAsset'
import { languangeAtom } from '@/jotai/atoms'


const SectionDownload = () => {
    const [languange] = useAtom(languangeAtom)
    return (
        <SectionLayout>
            <div className='relative max-w-xl mx-auto'>
                <img className='relative' src={DOWNLOAD_PHONE_IMAGE} />
                <div className='absolute buttom-8 left-1/2 -translate-x-1/2 bg-black border border-white flex items-center rounded-xl py-2 px-4 w-[50%] gap-4'>
                    <img src={DOWNLOAD_COVER_IMAGE} className='max-h-20' />
                    <div>
                        <p className='font-bold text-left'>Stranger Things</p>
                        <p className='text-blue-400 font-semibold'>Download</p>
                    </div>
                </div>
            </div>
            <EachUtils
                of={languange === "en" ? LIST_CONTENT_4_EN : LIST_CONTENT_4_ID}
                render={(item, index) => (
                    <div key={index} >
                        <h2 className='text-5xl font-black'>{item.title}</h2>
                        <p className='text-2xl mt-4'>{item.desc}</p>
                    </div>
                )}
            />


        </SectionLayout >
    )
}

export default SectionDownload