import React from 'react'
import EachUtils from '@/utils/EachUtils'

import { useAtom } from 'jotai'
import { languangeAtom } from '@/jotai/atoms'
import { JUMBOTRON_IMAGE } from "@/constants/listAsset"
import { LIST_JUMBOTRON_EN, LIST_JUMBOTRON_ID } from '@/constants/listJumbotron'
import InputMembership from '../InputMembership'

const Jumbotron = () => {
    const [languange] = useAtom(languangeAtom)

    return (
        <div>
            <img src={JUMBOTRON_IMAGE}
                className='absolute top-0 left-0 object-cover h-[700px]w - full opacity - 80' />
            <div className='w-1/2 mx-auto flex flex-col items-center justify-center h-full'>
                < EachUtils of={languange == "en" ? LIST_JUMBOTRON_EN : LIST_JUMBOTRON_ID
                }
                    render={(item, index) => (
                        <div key={index} className='relative flex flex-col justify-center items-center mt-56 gap-4 text-center px-4'>
                            <h1 className='font-black text-white text-4xl'>{item.title}</h1>
                            <p className='text-white text-xl'> {item.desc}</p>
                        </div>

                    )}
                />
                < InputMembership />
            </div>

        </div >
    )
}

export default Jumbotron