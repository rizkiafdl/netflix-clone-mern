import React from 'react'
import EachUtils from '@/utils/EachUtils'


import { useAtom } from 'jotai'
import { LIST_FOOTER_EN, LIST_FOOTER_ID } from '@/constants/listFooter'
import { languangeAtom } from '@/jotai/atoms'
import OptionLanguange from '../OptionLanguange'

const Footer = () => {
    const [languange] = useAtom(languangeAtom)
    return (

        <footer className='w-full text-white bg-black border-t-8 border-stone-900 p-8'>
            <div>
                Question? Call <a href="">123-2314-213 </a>
            </div>
            <ul className='grid sm:grid-cols-4 gap-4 py-8'>
                <EachUtils
                    of={languange == "en" ? LIST_FOOTER_EN : LIST_FOOTER_ID}
                    render={(item, index) => (
                        <li key={index}>
                            <a href={item.url} className='underline'>{item.title}</a>
                        </li>
                    )} />
            </ul>

            <div>
                <OptionLanguange />
            </div>
            <p className='mt-4'>Netflix Indonesia</p>
        </footer >


    )
}

export default Footer