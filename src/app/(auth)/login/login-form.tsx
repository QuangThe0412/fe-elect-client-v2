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
import accountApiRequest from '@/apiRequests/account'

const LoginForm = () => {
    const { user, setUser } = useAuthStore((state: TypeUsers) => ({
        user: state.user,
        setUser: state.setUser
    }))

    console.log({ user })

    const [loading, setLoading] = useState(false)
    //   const { setUser } = useAppContext()
    const { toast } = useToast()
    const router = useRouter()
    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            username: '',
            password: ''
        }
    })

    async function onSubmit(values: LoginBodyType) {
        if (loading) return
        setLoading(true)
        try {
            const result = await authApiRequest.login(values);
            const payload = result.payload as ResponsePayloadType;
            console.log({ payload })
            if (result.status == 200) {
                toast({
                    description: payload.mess
                })
                const accessToken = payload.data.token;
                const refreshToken = payload.data.refreshToken;
                const accountRes = await accountApiRequest.profile();

                // setUser(result.payload.data.account)
                router.push('/')
                router.refresh()
            }
        } catch (error: any) {
            handleErrorApi({
                error,
                setError: form.setError
            })
        } finally {
            setLoading(false)
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
                    <div>
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
                    </div>
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