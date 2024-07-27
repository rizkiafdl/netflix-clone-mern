import React from 'react'
import SectionLayout from '@/components/Layouts/SectionLayout'
import EachUtils from '@/utils/EachUtils'

import { useAtom } from 'jotai'
import { languangeAtom } from '@/jotai/atoms'
import { PROFILE_KIDS_IMAGE } from '@/constants/listAsset'
import { LIST_CONTENT_3_EN, LIST_CONTENT_3_ID } from '@/constants/listContent'

const SectionProfile = () => {
    const [languange] = useAtom(languangeAtom)
    return (
        <SectionLayout>
            <div>
                <img src={PROFILE_KIDS_IMAGE} />
            </div>
            <EachUtils
                of={languange === "en" ? LIST_CONTENT_3_EN : LIST_CONTENT_3_ID}
                render={(item, index) => (
                    <div key={index} >
                        <h2 className='text-5xl font-black'>{item.title}</h2>
                        <p className='text-xl mt-4'>{item.desc}</p>
                    </div>
                )} />
        </SectionLayout>
    )
}

export default SectionProfile