import z from 'zod'

export type TypeDataAccountRes = {
  IDKhachHang: number
  IDLoaiKH: number
  TenKhachHang: string
  UserName: string
  DienThoai: string
}

export const AccountRes = z
  .object({
    data: z.object({
      account: z.object({
        IDKhachHang: z.number(),
        IDLoaiKH: z.number(),
        TenKhachHang: z.string(),
        UserName: z.string(),
        DienThoai: z.string()
      })
    }),
    message: z.string()
  })
  .strict()

export type AccountResType = z.TypeOf<typeof AccountRes>

export const ProfileBody = z
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

export type ProfileBodyType = z.TypeOf<typeof ProfileBody>

export const PasswordBody = z
  .object({
    oldPassword: z.string()
      .min(1, { message: "Vui lòng nhập mật khẩu hiện tại" }),
    newPassword: z.string()
      .min(7, { message: "Mật khẩu mới quá ngắn" })
      .max(50, { message: "Mật khẩu mới quá dài" })
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
        { message: "Mật khẩu phải chứa ít nhất một chữ cái viết thường, một chữ cái viết hoa, một số, và một ký tự đặc biệt" }),
    confirmNewPassword: z.string()
  })
  .strict()
  .superRefine(({ confirmNewPassword, newPassword }, ctx) => {
    if (confirmNewPassword !== newPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Mật khẩu mới không khớp',
        path: ['confirmNewPassword']
      })
    }
  })

export type PasswordBodyType = z.TypeOf<typeof PasswordBody>