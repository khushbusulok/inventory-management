"use client"
import { use, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AppDispatch, RootState, dispatch, store } from "./redux/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { getUserData } from "./redux/slice/userSlice";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function CustomProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <Provider store={store}>
            <AppLayer>
                {children}
            </AppLayer>
        </Provider>
    );
}

const AppLayer = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const pathname = usePathname();
    const router = useRouter();
    const { user, error } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(getUserData())
    }, [])

    useEffect(() => {
        console.log(user)
        // if(user){
        //     router.push('/')
        // }
        // if (!user){
        //     router.push('/login')
        // }
        if (pathname !== '/login' && !user && error) {
            router.push('/login')
        }

        if (pathname === '/login' && user && !error) {
            router.push('/')
        }
    }, [user, error])
    return <>{children}</>
}
