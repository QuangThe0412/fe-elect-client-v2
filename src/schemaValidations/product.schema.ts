export type CategoryResType = {
    IDLoaiMon?: number;
    IDNhomMon?: number;
    TenLoai?: string;
}

export type ProductResType = {
    IDMon?: number;
    IDLoaiMon?: number;
    TenMon?: string;
    Image?: string;
    DVTMon?: string;
    DonGiaBanSi?: number;
    DonGiaBanLe?: number;
    DonGiaVon?: number;
    SoLuongTonKho?: number;
    ThoiGianBH?: number;
    GhiChu?: string;
}