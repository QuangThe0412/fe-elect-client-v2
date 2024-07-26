import { CartDetails } from '@/schemaValidations/cart.schema'
import configEnv from '@/configEnv';
import { emptyImage, formatCurrency, formatNumber } from '@/lib/utils';
import cartApiRequest from '@/apiRequests/cart';
import useCartStore, { TypeCartStore } from '@/store/cart.store';
import { Button } from '@/components/ui/button';
import { BsFillTrash3Fill, BsPlusLg } from 'react-icons/bs';
import { ResponsePayloadType } from '@/lib/http';
import { HiOutlineMinus } from 'react-icons/hi2';
import { paths } from '@/lib/paths';
import Link from 'next/link';
import Image from 'next/image';

function ItemCart({ data }: { data: CartDetails }) {
    const { cart, setCart, loadingCart, setLoadingCart } = useCartStore((state: TypeCartStore) => ({
        cart: state.cart,
        setCart: state.setCart,
        loadingCart: state.loadingCart,
        setLoadingCart: state.setLoadingCart,
    }))

    const { IDChiTietHD, TenMon, SoLuong = 0, DonGia = 0, ChietKhau = 0, Image: image, IDMon } = data
    const src = `${(configEnv.NEXT_PUBLIC_LINK_IMAGE_GG ?? '') + image}`
    const total = DonGia * SoLuong

    const onRemove = async (idChiTietHd: number | undefined) => {
        setLoadingCart(true);
        const body = { IDChiTietHD: idChiTietHd }
        const { payload, status } = await cartApiRequest.deleteCart(body) as ResponsePayloadType;
        if (status === 200) {
            const _cart = cart?.details?.filter(item => item.IDChiTietHD !== idChiTietHd);
            const newcart = { ...cart, details: _cart };
            setCart(newcart);
            setLoadingCart(false);
        }
    }

    const onPlus = async (idChiTietHd: number | undefined) => {
        setLoadingCart(true);
        const body = {
            IDChiTietHD: idChiTietHd,
            SoLuong: SoLuong + 1
        }
        const { payload, status } = await cartApiRequest.putCart(body) as ResponsePayloadType;
        if (status === 200) {
            const _cart = cart?.details?.map(item => {
                const { IDChiTietHD, SoLuong = 0, DonGia = 0, ChietKhau = 0 } = item;
                const _soLuong = SoLuong + 1;
                const moneyBefore = DonGia * _soLuong;
                const moneyDiscount = (moneyBefore * ChietKhau) / 100;
                const moneyAfter = moneyBefore - moneyDiscount;
                if (IDChiTietHD === idChiTietHd) {
                    return {
                        ...item,
                        TienChuaCK: moneyBefore,
                        TienCK: moneyDiscount,
                        TienSauCK: moneyAfter,
                        SoLuong: _soLuong
                    }
                }
                return item;
            });
            const newcart = { ...cart, details: _cart };
            setCart(newcart);
            setLoadingCart(false);
        }
    }

    const onMinus = async (idChiTietHd: number | undefined) => {
        setLoadingCart(true);
        if (SoLuong <= 1) {
            await onRemove(idChiTietHd);
            return;
        }
        const body = {
            IDChiTietHD: idChiTietHd,
            SoLuong: SoLuong - 1
        }
        const { payload, status } = await cartApiRequest.putCart(body) as ResponsePayloadType;
        if (status === 200) {
            const _cart = cart?.details?.map(item => {
                const { IDChiTietHD, SoLuong = 0, DonGia = 0, ChietKhau = 0 } = item;
                const _soLuong = SoLuong - 1;
                const moneyBefore = DonGia * _soLuong;
                const moneyDiscount = (moneyBefore * ChietKhau) / 100;
                const moneyAfter = moneyBefore - moneyDiscount;
                if (IDChiTietHD === idChiTietHd) {
                    return {
                        ...item,
                        TienChuaCK: moneyBefore,
                        TienCK: moneyDiscount,
                        TienSauCK: moneyAfter,
                        SoLuong: _soLuong
                    }
                }
                return item;
            });
            const newcart = { ...cart, details: _cart };
            setCart(newcart);
            setLoadingCart(false);
        }
    }

    return (
        <tr key={IDChiTietHD} className='border'>
            <td>
                <Link className="flex items-center" href={`${paths.products}/${IDMon}`}>
                    <Image width={100} height={100} className="px-4 py-4"
                        src={src}
                        onError={emptyImage}
                        alt="Product image" />
                    <span title={TenMon} className="text-sm line-clamp-2">{TenMon}</span>
                </Link>
            </td>
            <td className="text-center">{formatNumber(DonGia)}</td>
            <td className="text-center">
                <div className="flex items-center justify-center">
                    <Button disabled={loadingCart} className="border rounded-md py-2 px-4 mr-2"
                        onClick={() => onMinus(IDChiTietHD)}>
                        <HiOutlineMinus />
                    </Button>
                    <span className="text-center w-8">{formatNumber(SoLuong)}</span>
                    <Button disabled={loadingCart} className="border rounded-md py-2 px-4 ml-2"
                        onClick={() => onPlus(IDChiTietHD)}>
                        <BsPlusLg />
                    </Button>
                </div>
            </td>
            <td className="text-center">{ChietKhau}%</td>
            <td className="text-center">{formatCurrency(total)}</td>
            <td className="text-center">
                <Button className="flex justify-center cursor-pointer text-center"
                    disabled={loadingCart}
                    onClick={() => onRemove(IDChiTietHD)}>
                    <BsFillTrash3Fill />
                </Button>
            </td>
        </tr>
    )
}

export default ItemCart