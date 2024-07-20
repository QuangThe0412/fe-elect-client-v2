type PathTypeConfig = {
    name: string;
    path: string;
    isHide?: boolean;
}

export const paths = {
    home: "/",
    login: "/login",
    register: "/register",
    products: "/search",
    profile: "/profile",
    cart: "/cart",
    refreshToken: "/refreshToken",
};

export const pathsArray: PathTypeConfig[] = [
    {
        name: "HOME",
        path: paths.home,
    },
    {
        name: "LOGIN",
        path: paths.login,
        isHide: true,
    },
    {
        name: "REGISTER",
        path: paths.register,
        isHide: true,
    },
    {
        name: "PRODUCTS",
        path: paths.products,
    },
    {
        name: "PROFILE",
        path: paths.profile,
        isHide: true,
    },
    {
        name: "CART",
        path: paths.cart,
        isHide: true,
    },
    {
        name: "REFRESH TOKEN",
        path: paths.refreshToken,
        isHide: true,
    },
];