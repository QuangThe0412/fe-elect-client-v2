import React from 'react';
import { cookies } from 'next/headers'
import configEnv from '@/configEnv';

type ProfileTypeRes = {
    status: number
    payload: {
        data: {
            IDKhachHang: number,
            IDLoaiKH: number,
            TenKhachHang: string,
            UserName: string,
            DienThoai: string,
        },
        mess: string,
        code: string,
    }
}

const ProfilePage: React.FC = async () => {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')

    const result = await fetch(`${configEnv.NEXT_PUBLIC_API_URL}/account/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${accessToken?.value}`
        }
    }).then(async (res) => {
        const payload = await res.json()
        const data = {
            status: res.status,
            payload
        } as ProfileTypeRes;
        return data
    })

    console.log({ result })

    return (
        <div>
            <ul>
                <li>{result.payload.data.TenKhachHang}</li>
            </ul>
        </div>
    );
};

export default ProfilePage;