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
import { RegisterBody, RegisterBodyType } from '@/schemaValidations/auth.schema'
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
import { ToastAction } from '@/components/ui/toast'
import useAuthStore, { TypeUsers } from '@/store/auth.store'

const RegisterForm = () => {
    const { setUser } = useAuthStore((state: TypeUsers) => ({
        setUser: state.setUser
    }))
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const router = useRouter()
    const form = useForm<RegisterBodyType>({
        resolver: zodResolver(RegisterBody),
        defaultValues: {
            name: '',
            phone: '',
            username: '',
            password: '',
            confirmPassword: ''
        }
    })

    async function onSubmit(values: RegisterBodyType) {
        if (loading) return;
        setLoading(true);
        try {
            const { status, payload } = await authApiRequest.register(values) as ResponsePayloadType;
            if (status == 201) {
                setUser(payload.data.account)
                toast({ description: payload.mess, duration: 5000 });
                const { accessToken, refreshToken } = payload.data;

                const resultNextServer = await authApiRequest.setToken({ accessToken, refreshToken }) as ResponsePayloadType;
                if (resultNextServer.status == 200) {
                    router.push(paths.home)
                    router.refresh()
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
                        name='name'
                        render={({ field }) => (
                            <FormItem className="grid gap-2">
                                <FormLabel className="mr-auto">Họ và tên</FormLabel>
                                <FormControl>
                                    <Input type='text' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='phone'
                        render={({ field }) => (
                            <FormItem className="grid gap-2">
                                <FormLabel className="mr-auto">Điện thoại</FormLabel>
                                <FormControl>
                                    <Input type='text' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                    <FormField
                        control={form.control}
                        name='confirmPassword'
                        render={({ field }) => (
                            <FormItem className="grid gap-2">
                                <FormLabel className="flex justify-between">
                                    <Label>Nhập lại mật khẩu</Label>
                                </FormLabel>
                                <PasswordInput {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={loading} type="submit" className="w-full text-white">Đăng ký</Button>
                </form>
            </Form>
            <div className="mt-4 text-center text-sm">
                Đã có tài khoản?{" "}
                <Link href={paths.login} className="underline">
                    Đăng nhập
                </Link>
            </div>
        </>
    )
}

export default RegisterForm