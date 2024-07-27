import Loading from '@/components/Modules/Elements/Loading'
import { emailStorageAtom, tokenAtom } from '@/jotai/atoms'
import Navbar from '@/pages/Browse/Navbar'
import { auth } from '@/utils/firebase'
import React, { useState } from 'react'
import { useAuthState } from "react-firebase-hooks/auth"
import { useAtom } from 'jotai'

const BrowseLayout = ({ children }) => {
    const [user, loading, error] = useAuthState(auth)
    const [emailStorage] = useAtom(emailStorageAtom)
    const [tokenStorage] = useAtom(tokenAtom)

    if (loading) return <Loading />
    if (error) return <p>Error</p>
    if (!user && !emailStorage && !tokenStorage) return location.replace("/")
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}

export default BrowseLayout