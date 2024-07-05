"use client";
import React, { useEffect, useState } from 'react';
import accountApiRequest from '@/apiRequests/account';

const ProfilePage: React.FC = () => {
    const [tenKhachHang, setTenKhachHang] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const result = await accountApiRequest.profile();
            console.log({ result });
            setTenKhachHang(result.payload.data.TenKhachHang);
        };

        fetchData();
    }, []);

    return (
        <div>
            <ul>
                <li>{tenKhachHang}</li>
            </ul>
        </div>
    );
};

export default ProfilePage;