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
import accountApiRequest from '@/apiRequests/account'
import { ProfileBody, ProfileBodyType } from '@/schemaValidations/account.schema'
import { ToastAction } from '@radix-ui/react-toast'

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
            const result = await accountApiRequest.updateProfile(values) as ResponsePayloadType;
            const { status, payload } = result;
            const { mess, data } = payload;
            if (status == 200) {
                setUser(data);
                toast({
                    description: mess,
                    duration: 5000,
                })
                onClose();
            } else {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: mess,
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
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