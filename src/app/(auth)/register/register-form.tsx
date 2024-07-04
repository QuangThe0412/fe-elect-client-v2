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
import { setCookie, decodeJWT, handleErrorApi, getDateRemaining } from '@/lib/utils'
import { useState } from 'react'
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { paths } from "@/constants/paths"
import { PasswordInput } from '@/components/ui/input-password'
import { ResponsePayloadType } from '@/lib/http'
import useAuthStore, { TypeUsers } from '@/store/auth.store'

const RegisterForm = () => {
    const { user, setUser } = useAuthStore((state: TypeUsers) => ({
        user: state.user,
        setUser: state.setUser
    }))
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const router = useRouter()
    const form = useForm<RegisterBodyType>({
        resolver: zodResolver(RegisterBody),
        defaultValues: {
            name: 'khách số 11',
            phone: '0901465811',
            username: 'khach11',
            password: 'Aa123123',
            confirmPassword: 'Aa123123'
        }
    })

    async function onSubmit(values: RegisterBodyType) {
        if (loading) return;
        setLoading(true);
        try {
            const result = await authApiRequest.register(values);
            const payload = result.payload as ResponsePayloadType;
            if (result.status == 201) {
                toast({
                    description: payload.mess,
                    duration: 5000,
                })
                const accessToken = payload.data.accessToken;
                const refreshToken = payload.data.refreshToken;

                const decodedAccess = decodeJWT(accessToken);
                const decodedRefresh = decodeJWT(refreshToken);

                setCookie('accessToken', accessToken, getDateRemaining(decodedAccess.exp));
                setCookie('refreshToken', refreshToken, getDateRemaining(decodedRefresh.exp));
                setUser(payload.data.account)
                router.push('/')
                router.refresh()
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
                    <Button type="submit" className="w-full">Đăng ký</Button>
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