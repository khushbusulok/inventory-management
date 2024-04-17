"use client"
import { loginMethod } from "../redux/slice/authSlice";
// import { RootState } from "@/redux/store";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { UserType } from "../types/user";
import { useRouter } from "next/navigation";

const Login = () => {
    const dispatch:AppDispatch = useDispatch();
    const router = useRouter();
    const[username, setUsername] = useState<string>('');
    const[password, setPassword] = useState<string>('');
    const[remember, setremember] = useState<any>(false)

    const setrememberfn = (e: any) => {
        setremember(e.target.checked)
    }
    const handleLogin = () => {
        const userData: UserType = {email:username, password, remember};
        dispatch(loginMethod(userData));
    }
    return(
      <div className="-translate-y-2/4 -translate-x-2/4 absolute top-2/4 left-2/4">
        <div className="w-[500px] bg-violet-500 p-8 rounded-md">
            <p className="text-center text-xl">LOG IN</p>
            <div className="mt-8">
                <div>
                    <input type="text" name="username" onChange={(e)=>setUsername(e.target.value)} placeholder="Username" className="w-[400px] bg-transparent border-b-2 p-1 focus:outline-none"/>
                </div>
                <div className="mt-4">
                    <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="w-[400px] bg-transparent border-b-2 p-1 focus:outline-none" />
                </div>
                <div className="mt-6">
                    <input type="checkbox" id="remember_me" name="remember" value={remember} onClick={(e)=>setrememberfn(e)} className="w-6 h-6"/>
                    <label htmlFor="Remember me" className="align-top pl-1">Remember me</label>
                </div>
            </div>
            <div className="text-center mt-5">
                <button type="submit" className="bg-white text-black py-2 px-6 rounded-3xl" onClick={handleLogin}>Login</button>
            </div>
            <div className="text-center pt-10">
                <a className="text-xs">Forgot Password?</a>
            </div>
        </div>
      </div>
    )
}

export default Login;