import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { LuQrCode } from "react-icons/lu";
import imgQr from "../../public/zalo-qr.jpeg"
import Image from "next/image";

export function ZaloQR() {
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <LuQrCode />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>QR Code.</AlertDialogTitle>
                    <AlertDialogDescription>
                        Quét mã để liên hệ với chúng tôi qua Zalo.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Image src={imgQr} width={500} height={500} alt="Zalo QR" className="w-full" />
                <AlertDialogFooter>
                    <AlertDialogCancel>Đóng</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
