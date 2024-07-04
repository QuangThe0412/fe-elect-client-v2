import z from 'zod'

export const RegisterBody = z
    .object({
        name: z.string().trim()
            .min(1, { message: 'Vui lòng nhập họ tên' })
            .max(256, { message: 'Không đúng định dạng' }),
        username: z.string()
            .min(6, { message: 'Vui lòng nhập tài khoản' })
            .max(100, { message: 'Không đúng định dạng' }),
            // .regex(/^[A-Za-z0-9]+$/, { message: 'Tài khoản không được chứa dấu hoặc ký tự đặc biệt' }),
        phone: z.string()
            .min(10, { message: "Số điện thoại không hợp lệ" })
            .max(10, { message: "Số điện thoại không hợp lệ" })
            .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, { message: "Số điện thoại không hợp lệ" }),
        password: z.string()
            .min(7, { message: "Mật khẩu quá ngắn" })
            .max(50, { message: "Mật khẩu quá dài" })
            .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                { message: "Mật khẩu phải chứa ít nhất một chữ cái viết thường, một chữ cái viết hoa, một số, và một ký tự đặc biệt" }), confirmPassword: z.string()
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
        accessToken: z.string(),
        refreshToken: z.string(),
        expiresAccessToken: z.string(),
        expiresRefreshToken: z.string(),
        account: z.object({
            id: z.number(),
            idtype: z.number(),
            name: z.string(),
            username: z.string(),
            phone: z.string(),
        })
    }),
    mess: z.string()
})

//body
export type RegisterResType = z.TypeOf<typeof RegisterRes>

export const LoginBody = z
    .object({
        username: z.string().min(6, { message: 'Vui lòng nhập tài khoản' }).max(100, { message: 'Không đúng định dạng' }),
        password: z.string().min(6, { message: 'Vui lòng nhập mật khẩu' }).max(100, { message: 'Không đúng định dạng' }),
    })
    .strict()

export type LoginBodyType = z.TypeOf<typeof LoginBody>

export const LoginRes = RegisterRes

export type LoginResType = z.TypeOf<typeof LoginRes>