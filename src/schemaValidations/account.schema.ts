import z from 'zod'

export const AccountRes = z
  .object({
    data: z.object({
      account: z.object({
        IDKhachHang : z.number(),
        IDLoaiKH : z.number(),
        TenKhachHang : z.string(),
        UserName : z.string(),
        DienThoai : z.string()
      })
    }),
    message: z.string()
  })
  .strict()

export type AccountResType = z.TypeOf<typeof AccountRes>

export const UpdateMeBody = z.object({
  name: z.string().trim().min(2).max(256)
})

export type UpdateMeBodyType = z.TypeOf<typeof UpdateMeBody>