import { emailStorageAtom, tokenAtom } from '@/jotai/atoms'
import { apiInstanceExpress } from '@/utils/apiInstance'
import { auth } from '@/utils/firebase'
import { signOut } from 'firebase/auth'
import { useAtom } from 'jotai'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { signInWithEmailAndPassword, getIdToken, getAuth } from 'firebase/auth'

const AccountMenu = () => {
    const navigate = useNavigate()
    const [tokenStorage, setIstoken] = useAtom(tokenAtom)
    const [emailStorage, setEmailStorage] = useAtom(emailStorageAtom)

    const handleSignOut = async (e) => {
        e.preventDefault()

        const data = { email: emailStorage, token: tokenStorage }
        const dbSigonOut = await apiInstanceExpress.delete("/my-token", { data })
        console.log(dbSigonOut.status)
        if (dbSigonOut.status === 204) {
            signOut(auth).then(() => {
                navigate("/")
                setEmailStorage(null)
                setIstoken(null)
            })
            toast("Sign Out Succes")
        }
        if (dbSigonOut.status === 500) return toast("Sign Out Failed")
    }

    return (
        <div className='flex items-center dropdown dropdown-hover dropdown-end'>
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
            <div className="avatar" tabIndex={0}>
                <div className="w-10 rounded">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
            </div>
            <div
                className='dropdown-content absolute top-10 z-30 bg-black text-stone-200 p-2 flex flex-col gap-4 border border-stone-300/80 rounded-xl'>
                <p className='text-sm italic '>{emailStorage}</p>
                <button
                    className='hover:text-white transition-all'
                    tabIndex={0}
                    onClick={handleSignOut}
                >Sign Out</button>
            </div>

        </div>
    )
}

export default AccountMenu