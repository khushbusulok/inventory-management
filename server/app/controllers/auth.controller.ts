import { Request, Response } from "express";
import {checkUserIsExist, addUser} from "../models/auth.model"

const signup = async (req: Request ,res: Response) => {
    const data = {
        email: req.body.email,
        mobile: req.body.mobile,
        countryCode: req.body.countryCode,
        profile: req.body.profile,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }

    const existingUser = await checkUserIsExist(req.body.email);
    if(existingUser) {
        return res.status(400).json({message: 'User already exist'});
    }

    try {
        const saveUser = await addUser(data);
        return res.status(201).json({user: saveUser, message: 'Thank you for join with us'});
    } catch (err) {
        console.log('Error', err);
        return res.status(500).json({ message: 'Internal server error '})
    }
}

const login = async (req: Request ,res: Response) => {
    try{
        console.log(req.body, "---------------")
        const checkUser = await checkUserIsExist(req.body.email);
        if(!checkUser) {
            return res.status(404).json({message: 'user not found'});
        }
        if(req.body.password !== checkUser.password) {
            return res.status(200).json({message: 'invalid password'})
        }
        req.session.users = {
            id: checkUser._id,
            email: checkUser.email,
            firstName: checkUser.firstName,
            lastName: checkUser.lastName
        }
        return res.status(200).json({data: req.session.users, message: 'signin successsfully'});
    } catch (err) {
        console.log('Error', err);
        return res.status(500).json({ message: 'Internal server error '})
    }
}

const logout = async (req: Request, res: Response) => {
    try {
        req.session.destroy((err) => {
            if(err) {
                console.error('Error destroying session', err);
                return res.status(500).json({message: 'Error destroying session'});
            }
            res.clearCookie('connect.sid');
            return res.status(200).json({message:'Logout successful'});
        })
    } catch(err) {
        console.error('Error', err);
        return res.status(500).json({message:'Internal server error'})
    }
}

export default { signup, login, logout };