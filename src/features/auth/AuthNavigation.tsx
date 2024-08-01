import React from 'react'

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import LoginForm from './LoginForm'
import SignInForm from './SignInForm'

const AuthNavigation: React.FC = () => {
    return (
        <Tabs defaultValue="ログイン" className="w-full">
            {/*タブの要素*/}
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ログイン">ログイン</TabsTrigger>
                <TabsTrigger value="新規登録">新規登録</TabsTrigger>
            </TabsList>

            {/*タブがログインのときに表示される内容*/}
            <TabsContent value="ログイン">
                <LoginForm />
            </TabsContent>

            {/*タブが新規登録のときに表示される内容*/}
            <TabsContent value="新規登録">
                <SignInForm />
            </TabsContent>
        </Tabs>
    )
}

export default AuthNavigation