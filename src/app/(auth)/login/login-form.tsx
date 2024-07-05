'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoginBody, LoginBodyType } from '@/schemaValidations/auth.schema'
import { useToast } from '@/components/ui/use-toast'
import authApiRequest from '@/apiRequests/auth'
import { useRouter } from 'next/navigation'
import { handleErrorApi } from '@/lib/utils'
import { useState } from 'react'
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { paths } from "@/constants/paths"
import { PasswordInput } from '@/components/ui/input-password'
import { ResponsePayloadType } from '@/lib/http'
import useAuthStore, { TypeUsers } from '@/store/auth.store'
import { ToastAction } from "@/components/ui/toast"

const LoginForm = () => {
    const { user, setUser } = useAuthStore((state: TypeUsers) => ({
        user: state.user,
        setUser: state.setUser
    }))
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const router = useRouter()
    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            username: 'khach11',
            password: 'Aa123123'
        }
    })

    async function onSubmit(values: LoginBodyType) {
        if (loading) return;
        setLoading(true);
        try {
            const result = await authApiRequest.login(values);
            const payload = result.payload as ResponsePayloadType;
            if (result.status == 200) {
                setUser(payload.data.account)
                toast({
                    description: payload.mess,
                    duration: 5000,
                })
                const accessToken = payload.data.accessToken;
                const refreshToken = payload.data.refreshToken;

                const body = {
                    accessToken,
                    refreshToken
                }
                router.push(paths.home)
                router.refresh()
                const resultNextServer = await authApiRequest.setToken(body);
                if (resultNextServer.status == 200) {
                } else {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: "There was a problem with your request.",
                        action: <ToastAction altText="Try again">Try again</ToastAction>,
                    })
                }
            }
        } catch (error: any) {
            handleErrorApi({
                error,
                setError: form.setError
            })
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='grid gap-4'
                    noValidate
                >
                    <FormField
                        control={form.control}
                        name='username'
                        render={({ field }) => (
                            <FormItem className="grid gap-2">
                                <FormLabel className="mr-auto">Tài khoản</FormLabel>
                                <FormControl>
                                    <Input type='text' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem className="grid gap-2">
                                <FormLabel className="flex justify-between">
                                    <Label>Mật khẩu</Label>
                                </FormLabel>
                                <PasswordInput {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">Đăng nhập</Button>
                </form>
            </Form>
            <div className="mt-4 text-center text-sm">
                <Link href={paths.home} className="inline-block text-sm underline">
                    Quên mật khẩu!
                </Link>
            </div>
            <div className="mt-4 text-center text-sm">
                Chưa có tài khoản?{" "}

                <Link href={paths.register} className="underline">
                    Đăng ký ngay
                </Link>
            </div>
        </>
    )
}

export default LoginForm