import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    callBack: () => void;
    isShowCancel?: boolean;
    title?: string;
    description?: string | JSX.Element;
    textConfirm?: string;
    textCancel?: string;
}

export function AlertDialogCustom(
    {
        isOpen, setIsOpen, callBack,
        isShowCancel = true, description, title,
        textCancel = "Hủy", textConfirm = "Tiếp tục"
    }: props) {
    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {isShowCancel && <AlertDialogCancel onClick={() => setIsOpen(false)}>{textCancel}</AlertDialogCancel>}
                    <AlertDialogAction onClick={callBack}>{textConfirm}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
