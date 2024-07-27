import { JUMBOTRON_IMAGE } from '@/constants/listAsset'
import { emailLandingAtom } from '@/jotai/atoms'
import React, { useState } from 'react'
import { GoChevronLeft } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import { auth } from "@/utils/firebase"
import { createUserWithEmailAndPassword, signOut } from "firebase/auth"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { apiInstanceExpress } from '@/utils/apiInstance'


const Register = () => {
    const navigate = useNavigate()
    const [emailLanding, setEmailLanding] = useAtom(emailLandingAtom)
    const [password, setPassword] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const register = await createUserWithEmailAndPassword(auth, emailLanding, password)
            console.log({ register })
            if (register) {
                await signOut(auth)
                //login user ke api
                const addUser = await apiInstanceExpress.post('/sign-up', { email: emailLanding, password })

                if (addUser.status === 201) {
                    toast("Register Success!")
                    setTimeout(() => {
                        setIsLoading(false)
                        navigate("/login")
                    }, 2000)
                }
            }
        } catch (error) {
            setIsLoading(false)
            toast(error.message)
        }
    }

    return (
        <DefaultLayout>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition="Bounce"
            />
            <img
                className='w-full h-[100vh] object-cover opacity-70'
                src={JUMBOTRON_IMAGE} />
            <div className='absolute top-1/2  left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-black/80 px-8 py-16 rounded-xl max-w-xl w-full'>
                <form className='flex flex-col gap-4'>
                    <div className='text-white font-semibold text-xl mb-2 flex items-center gap-2'>
                        <GoChevronLeft
                            onClick={() => navigate("/")}
                            size={30}
                            className='text-slate-200 hover:text-white cursor-pointer' />
                        <h3>Sign Up</h3>
                    </div>
                    <div className='relative'>
                        <input
                            placeholder="Email"
                            type='email'
                            value={emailLanding ? emailLanding : ''}
                            onChange={(e) => setEmailLanding(e.target.value)}
                            className='w-full p-4 bg-black/50 rounded-md border border-white/50 peer placeholder-transparent' />
                        <label
                            className="absolute left-0 top-0 pl-4 peer-placeholder-shown:top-4 peer-focus:-top-[2px] transition-all -z-10 text-lg">Email</label>
                    </div>
                    <div className='relative'>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            type='password'
                            className='w-full p-4 bg-black/50 rounded-md border border-white/50 peer placeholder-transparent' />
                        <label
                            className="absolute left-0 top-0 pl-4 peer-placeholder-shown:top-4 peer-focus:-top-[2px] transition-all -z-10 text-lg">Password</label>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <button
                            disabled={isLoading}
                            onClick={handleRegister}
                            className='bg-red-500 py-3 w-full rounded-md text-white font-bold disabled:bg-red-400 disabled:cursor-wait'>Sign Up</button>
                        <p>Already Have An Account?
                            <span
                                onClick={() => navigate("/login")}
                                className='text-blue-500 underline cursor-pointer ml-2'>
                                Sign In Here!
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </DefaultLayout>
    )
}

export default Register
