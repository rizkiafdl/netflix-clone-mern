import React from 'react'
import EachUtils from '@/utils/EachUtils'
import DefaultButton from '../DefaultButton'

import { useAtom } from 'jotai'
import { emailLandingAtom, languangeAtom } from '@/jotai/atoms'
import { LIST_CTA_EN, LIST_CTA_ID } from '@/constants/listCTA'
import { useNavigate } from 'react-router-dom'

const InputMembership = () => {
    const [languange] = useAtom(languangeAtom)
    const navigate = useNavigate()
    const [, setEmailLanding] = useAtom(emailLandingAtom)

    const handleInputChange = (e) => {
        const inpuValue = e.target.value
        if (inpuValue.length > 4) {
            setEmailLanding(inpuValue);
        }

    };
    const handleSubmit = () => { // Pass the input value to setEmailLanding
        navigate('/register');
    };

    return (
        <form className='relative items-center text-center my-4 '>
            <EachUtils
                of={languange == "en" ? LIST_CTA_EN : LIST_CTA_ID} render={(item, index) => (
                    <div key={index}>
                        <h3 className='text-white text-xl'>{item.title}</h3>
                        <div className='relative flex justify-center items-center gap-2 py-4 '>
                            <input
                                placeholder={item.labelInput}
                                onChange={handleInputChange}
                                className='w-full p-4 bg-black/50 rounded-md border border-white/50 peer placeholder-transparent' />
                            <label
                                className="absolute left-1/2 transform -translate-x-1/2 pl-10 top-0 peer-placeholder-shown:top-8 peer-focus:top-[16px] transition-all text-lg md:left-72 md:pl-10 md:translate-x-0">{item.labelInput}</label>
                            <DefaultButton onClick={handleSubmit} text={item.buttonSubmit} isArrowIcon={true} styles='flex text-xl items-center gap-2 py-4 w-1/2 flex justify-center'></DefaultButton>
                        </div>
                    </div>
                )}
            />

        </form>
    )
}
export default InputMembership