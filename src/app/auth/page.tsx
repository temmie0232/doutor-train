import React from 'react'
import AuthNavigation from '@/features/auth/AuthNavigation'
import GoogleAuthButton from '@/features/auth/GoogleAuthButton'

const AuthPage = () => {
    return (
        <div className="flex items-center justify-center flex-col h-screen max-h-screen">
            <div className="flex flex-col items-center justify-center w-4/5 max-w-xs">
                <AuthNavigation />
                <div className="flex items-center w-full my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="px-3 text-gray-500 text-sm">または</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <GoogleAuthButton />
            </div>
            <div className="mt-4 text-sm text-gray-500">
                バージョン 1.0.0
            </div>
        </div>
    )
}

export default AuthPage