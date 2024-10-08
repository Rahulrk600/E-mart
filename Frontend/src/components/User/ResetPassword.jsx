import React, { useEffect, useState } from 'react'
import { Input, Button } from '../index.js'
import { useForm } from 'react-hook-form'
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useDispatch,useSelector } from 'react-redux'
import {useParams, useNavigate} from 'react-router-dom'
import {resetPassword, clearError } from '../../Store/Reducer/UserReducers/authSlice.js'
import { toast } from 'react-toastify'

function ResetPassword() {

    const dispatch = useDispatch();
    const {token} = useParams()
    const navigate = useNavigate()
    const {loading, error} = useSelector((state)=> state.auth)
    const [showPassword, setShowPassword] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const onResetPassword = (data) => {
        dispatch(resetPassword({token,data}))
        navigate("/signin")
    }

    useEffect(()=>{
        if(error){
            toast.error(error)
            dispatch(clearError())
        }
    },[dispatch, error])

    return (
        <div className='flex justify-center items-center max-h-screen  bg-slate-200 sm:mt-5'>
            <div className='w-full max-w-md  bg-white p-8 space-y-4  rounded-lg shadow-md sm:w-2/6'>
                <h2 className='text-2xl text-center font-bold text-gray-700 mb-6'>Reset Password</h2>

                <form className='space-y-4' onSubmit={handleSubmit(onResetPassword)} >

                    <div className=' relative'>
                        <FaLock className='text-gray-500 mr-2' />
                        <Input
                            className="px-3 py-1 mt-1"
                            label="new Password:"
                            placeholder=" Enter your new password "
                            type={showPassword ? 'text' : "password"}
                            {...register("password", {
                                required: 'New Password is required',
                            })}
                        />
                        <span
                            onClick={togglePasswordVisibility}
                            className=' absolute right-2 top-14 cursor-pointer'>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>

                        {errors.password && (
                            <p className='text-red-600 text-sm text-center'>
                                {errors.password.message}
                            </p>
                        )}

                    </div>


                    <div className=' relative'>
                        <FaLock className='text-gray-500 mr-2' />
                        <Input
                            className="px-3 py-1 mt-1"
                            label="Confiram Password:"
                            placeholder=" Enter your ConfiramPassword "
                            type={showPassword ? 'text' : "password"}
                            {...register("confiramPassword", {
                                required: 'Password is required',
                            })}
                        />
                        <span
                            onClick={togglePasswordVisibility}
                            className=' absolute right-2 top-14 cursor-pointer'>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>

                        {errors.newPassword && (
                            <p className='text-red-600 text-sm text-center'>
                                {errors.newPassword.message}
                            </p>
                        )}

                    </div>

                    <div className='m-5 flex justify-center items-center'>
                        <Button
                            type='submit'
                            childarn={"Update"}
                            classsName='bg-indigo-500 text-white py-2 hover:bg-indigo-700  focus:outline-none focus:ring-2 focus:ring-indigo-00'
                        />

                    </div>
                </form>

            </div>
        </div>
    )
}


export default ResetPassword