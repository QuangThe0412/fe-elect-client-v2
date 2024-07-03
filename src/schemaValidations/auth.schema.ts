import z from 'zod'

export const RegisterBody = z
    .object({
        name: z.string().trim().min(2).max(256),
        email: z.string().email(),
        password: z.string().min(6).max(100),
        confirmPassword: z.string().min(6).max(100)
    })
    .strict()
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: 'custom',
                message: 'Mật khẩu không khớp',
                path: ['confirmPassword']
            })
        }
    })

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>

export const RegisterRes = z.object({
    data: z.object({
        token: z.string(),
        expiresAt: z.string(),
        account: z.object({
            id: z.number(),
            name: z.string(),
            email: z.string()
        })
    }),
    message: z.string()
})

//body
export type RegisterResType = z.TypeOf<typeof RegisterRes>

export const LoginBody = z
    .object({
        username: z.string().min(6, { message: 'Vui lòng nhập tài khoản' }),
        password: z.string().min(6, { message: 'Vui lòng nhập mật khẩu' }),
    })
    .strict()

export type LoginBodyType = z.TypeOf<typeof LoginBody>

export const LoginRes = z
    .object({
        IDKhachHang: z.string(),
        IDLoaiKH: z.string(),
        TenKhachHang: z.string(),
        username: z.string(),
        DienThoai: z.string(),
    }).strict()

export type LoginResType = z.TypeOf<typeof LoginRes>
export const SlideSessionBody = z.object({}).strict()

export type SlideSessionBodyType = z.TypeOf<typeof SlideSessionBody>
export const SlideSessionRes = RegisterRes

export type SlideSessionResType = z.TypeOf<typeof SlideSessionRes>