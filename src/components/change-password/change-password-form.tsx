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
import { useToast } from '@/components/ui/use-toast'
import { handleErrorApi, tryGetAccessToken } from '@/lib/utils'
import { useState } from 'react'
import { ResponsePayloadType } from '@/lib/http'
import accountApiRequest from '@/apiRequests/account'
import { PasswordBody, PasswordBodyType } from '@/schemaValidations/account.schema'
import { PasswordInput } from '../ui/input-password'
import { ToastAction } from '../ui/toast'

const ChangePasswordForm = ({ onClose }: { onClose: () => void }) => {
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const form = useForm<PasswordBodyType>({
        resolver: zodResolver(PasswordBody),
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        }
    })

    async function onSubmit(values: PasswordBodyType) {
        if (loading) return;
        setLoading(true);
        try {
            const accessToken = await tryGetAccessToken() as string;
            const { status, payload } = await accountApiRequest.changePassword(accessToken, values) as ResponsePayloadType;
            const { mess } = payload;

            if (status == 200) {
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
                        name='oldPassword'
                        render={({ field }) => (
                            <FormItem className="grid gap-2">
                                <FormLabel className="mr-auto">Mật khẩu hiện tại</FormLabel>
                                <FormControl>
                                    <PasswordInput {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='newPassword'
                        render={({ field }) => (
                            <FormItem className="grid gap-2">
                                <FormLabel className="mr-auto">Mật khẩu mới</FormLabel>
                                <FormControl>
                                    <PasswordInput {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='confirmNewPassword'
                        render={({ field }) => (
                            <FormItem className="grid gap-2">
                                <FormLabel className="mr-auto">Nhập lại mật khẩu mới</FormLabel>
                                <FormControl>
                                    <PasswordInput {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={loading} type="submit" className="w-full mt-4 bg-accent-custom">Cập nhật</Button>
                </form>
            </Form>
        </>
    )
}

export default ChangePasswordForm