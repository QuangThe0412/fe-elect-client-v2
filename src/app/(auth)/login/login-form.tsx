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
import { paths } from "@/lib/paths"
import { PasswordInput } from '@/components/ui/input-password'
import { ResponsePayloadType } from '@/lib/http'
import useAuthStore, { TypeUsers } from '@/store/auth.store'
import { ToastAction } from "@/components/ui/toast"
import { usePathname } from 'next/navigation'

const LoginForm = () => {
    const pathname = usePathname()
    const { user, setUser, isShowLoginDialog, setIsShowLoginDialog } = useAuthStore((state: TypeUsers) => ({
        user: state.user,
        setUser: state.setUser,
        isShowLoginDialog: state.isShowLoginDialog,
        setIsShowLoginDialog: state.setIsShowLoginDialog
    }))
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const router = useRouter()
    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            username: 'khach31',
            password: 'Aa123123'
        }
    })

    async function onSubmit(values: LoginBodyType) {
        if (loading) return;
        setLoading(true);
        try {
            const { status, payload } = await authApiRequest.login(values) as ResponsePayloadType;
            if (status === 200) {
                toast({ description: payload.mess, duration: 5000 });

                const { accessToken, refreshToken } = payload.data;
                const resultNextServer = await authApiRequest.setToken({ accessToken, refreshToken });
                if (resultNextServer.status === 200) {
                    if (isShowLoginDialog) {
                        setIsShowLoginDialog(false)
                    }
                    if (pathname === paths.login) {
                        router.push(paths.home)
                    }
                    setUser(payload.data.account);
                } else {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: "There was a problem with your request.",
                        action: <ToastAction altText="Try again">Try again</ToastAction>,
                    });
                }
            }
        } catch (error: any) {
            handleErrorApi({ error, setError: form.setError });
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

                    <Button disabled={loading} type="submit" className="w-full text-white">Đăng nhập</Button>
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