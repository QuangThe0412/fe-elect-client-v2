
export type CartItem = {
    IDHoaDon?: number;
    IDKhachHang?: number;
    CongNo?: number;
    TrangThai?: number;
}

export type CartDetails = {
    IDChiTietHD?: number;
    IDHoaDon?: number;
    IDMon?: number;
    TenMon?: string;
    SoLuong?: number;
    DonGia?: number;
    ChietKhau?: number;
    TienChuaCK?: number;
    TienCK?: number;
    TienSauCK?: number;
    Deleted?: boolean;
    Image?: string;
}

export type CartType = CartItem & {
    details?: CartDetails[];
};