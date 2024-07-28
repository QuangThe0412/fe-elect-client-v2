import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import ProfileForm from "./profile-form"

type DialogProps = {
    open: boolean
    onClose: () => void
}

export function DialogProfile({ open, onClose }: DialogProps) {
    return (
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[425px]" onClose={onClose}>
                <DialogHeader>
                    <DialogTitle>Cập nhật thông tin</DialogTitle>
                    <DialogDescription>
                        Thay đổi thông tin cá nhân của bạn sau đó chọn <b>Lưu</b> để cập nhật thông tin.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <ProfileForm onClose={onClose} />
                </div>
            </DialogContent>
        </Dialog>
    )
}
