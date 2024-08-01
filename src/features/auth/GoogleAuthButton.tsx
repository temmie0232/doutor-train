import React from 'react'

import { Button } from '@/components/ui/button'

import { FaGoogle } from "react-icons/fa"

const GoogleAuthButton = () => {
    return (
        <div className="w-full">
            <Button size="sm" className="w-full">
                <FaGoogle className='mr-2' /> Googleアカウントで始める
            </Button>
        </div>
    )
}

export default GoogleAuthButton