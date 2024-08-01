import React from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from '@/components/ui/separator'

const LoginForm: React.FC = () => {
    return (
        <div>
            {/*カード全体*/}
            <Card className="w-full">
                {/*タイトル*/}
                <CardHeader className='text-center'>
                    <CardTitle>ログイン</CardTitle>
                    {/*アンダーライン*/}
                    <div className="flex justify-center mt-2">
                        <div className="w-12 h-1 bg-black rounded-lg"></div>
                    </div>
                </CardHeader>

                {/*内容*/}
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">メールアドレス</Label>
                                <Input id="email" name="email" type="email" placeholder="example@gmail.com" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">パスワード</Label>
                                <Input id="password" name="password" type="password" placeholder="パスワードを入力" />
                            </div>
                        </div>
                    </form>
                </CardContent>

                {/*フッター*/}
                <CardFooter className="flex justify-center flex-col ">
                    <Button type="submit" className="w-4/5 text-sm">ログイン</Button>
                    <Separator className="my-4" />
                    <Button variant="outline" size="sm" className="w-4/5 text-sm text-gray-600 hover:text-gray-900">
                        アカウントなしでログイン
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default LoginForm