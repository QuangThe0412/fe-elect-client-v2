import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import ChangePasswordForm from "./change-password-form"

type DialogProps = {
    open: boolean
    onClose: () => void
}

export function ChangePassword({ open, onClose }: DialogProps) {
    return (
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[425px]" onClose={onClose}>
                <DialogHeader>
                    <DialogTitle>Cập nhật thông tin</DialogTitle>
                    <DialogDescription>
                        Điền thông tin hợp lệ sau đó bấm <b>Lưu</b> để cập nhật mật khẩu.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <ChangePasswordForm onClose={onClose} />
                </div>
            </DialogContent>
        </Dialog>
    )
}
