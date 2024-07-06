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
import { useToast } from '@/components/ui/use-toast'
import { handleErrorApi } from '@/lib/utils'
import { useState } from 'react'
import { ResponsePayloadType } from '@/lib/http'
import useAuthStore, { TypeUsers } from '@/store/auth.store'
import { z } from 'zod'
import accountApiRequest from '@/apiRequests/account'

const ProfileBody = z
    .object({
        name: z.string().trim()
            .min(1, { message: 'Vui lòng nhập họ tên' })
            .max(256, { message: 'Không đúng định dạng' }),
        phone: z.string()
            .min(10, { message: "Số điện thoại không hợp lệ" })
            .max(10, { message: "Số điện thoại không hợp lệ" })
            .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, { message: "Số điện thoại không hợp lệ" })
    })
    .strict()

type ProfileBodyType = z.TypeOf<typeof ProfileBody>

const ProfileForm = ({ onClose }: { onClose: () => void }) => {
    const { user, setUser } = useAuthStore((state: TypeUsers) => ({
        user: state.user,
        setUser: state.setUser,
    }))
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const form = useForm<ProfileBodyType>({
        resolver: zodResolver(ProfileBody),
        defaultValues: {
            name: user?.TenKhachHang,
            phone: user?.DienThoai,
        }
    })

    async function onSubmit(values: ProfileBodyType) {
        if (loading) return;
        setLoading(true);
        try {
            const result = await accountApiRequest.updateProfile(values);
            const payload = result.payload as ResponsePayloadType;
            if (result.status == 200) {
                const data = payload.data;
                setUser(data);
                toast({
                    description: payload.mess,
                    duration: 5000,
                })
                onClose();
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
                    <Button disabled={loading} type="submit" className="w-full mt-4">Cập nhật</Button>
                </form>
            </Form>
        </>
    )
}

export default ProfileForm