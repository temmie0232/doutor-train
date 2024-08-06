import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import GoogleAuthButton from './GoogleAuthButton'

const AuthNavigation: React.FC = () => {
    return (
        <div className="w-full">
            <Tabs defaultValue="ログイン" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-3">
                    <TabsTrigger value="ログイン">ログイン</TabsTrigger>
                    <TabsTrigger value="新規登録">新規登録</TabsTrigger>
                </TabsList>
                <TabsContent value="ログイン">
                    <LoginForm />
                </TabsContent>
                <TabsContent value="新規登録">
                    <SignUpForm />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default AuthNavigation