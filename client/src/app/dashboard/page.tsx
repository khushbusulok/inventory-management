"use client"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getUserData } from "../redux/slice/userSlice";
import { useEffect } from "react";

export default function Dashboard() {
    const { user } = useSelector((state:RootState) => state.user);
   
    return (
        <h1>{user}</h1>
    )
}