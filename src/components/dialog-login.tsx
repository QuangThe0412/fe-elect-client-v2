import LoginForm from "@/app/(auth)/login/login-form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import useAuthStore, { TypeUsers } from "@/store/auth.store"

export function LoginDialog() {
    const { isShowLoginDialog, setIsShowLoginDialog } = useAuthStore((state: TypeUsers) => ({
        isShowLoginDialog: state.isShowLoginDialog,
        setIsShowLoginDialog: state.setIsShowLoginDialog
    }))
    return (
        <Dialog open={isShowLoginDialog}>
            <DialogContent className="sm:max-w-[425px]" onClose={() => setIsShowLoginDialog(false)}>
                <DialogHeader>
                    <DialogTitle>Đăng nhập</DialogTitle>
                    <DialogDescription>
                        Vui lòng điền thông tin để đăng nhập
                    </DialogDescription>
                </DialogHeader>
                <LoginForm />
            </DialogContent>
        </Dialog>
    )
}
