type PathMenu = {
    name: string;
    path: string;
}

export const paths = {
    home: "/",
    login: "/login",
    register: "/register",
    search: "/search",
    products: "/products",
    profile: "/profile",
    cart: "/cart",
    refreshToken: "/refreshToken",
    details: "/details"
};

export const pathsArray: PathMenu[] = [
    {
        name: "TRANG CHỦ",
        path: paths.home,
    },
    {
        name: "SẢN PHẨM",
        path: paths.search,
    }
];