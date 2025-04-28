import React, { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext.tsx'
import updateUser from '../actions/update-user.tsx'
import { useNavigate } from 'react-router-dom'
import updateUserPassword from '../actions/update-user-password.tsx'
import { useCart } from '../context/CartContext.tsx'

const Account = () => {
    const { user, setUser } = useUser()
    const { cartItemCount, setCartItemCount } = useCart()
    const navigate = useNavigate()
    
    const [personalDetailsForm, setPersonalDetailsForm] = useState({
        title: user?.title || '',
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        gender: user?.gender || '',
        email: user?.email || '',
    })

    const [privacyForm, setPrivacyForm] = useState({
        current_password: '',
        new_password: '',
        confirm_new_password: ''
    })

    const handleChange = (e :React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setPersonalDetailsForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handlePasswordChange = (e :React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setPrivacyForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handlePersonalDetailsSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const token = localStorage.getItem('token')
        if (!token) {
            return alert('You need to be logged in')
        }

        const updatedData = personalDetailsForm

        try {
            const updatedUser = await updateUser(updatedData, token)
            setUser(updatedUser)
            alert('Changes saved successfully!')
        } catch (error) {
            alert('Something went wrong saving changes.')
            console.error(error)
        }
    }

    const handlePrivacyFormChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const token = localStorage.getItem('token')
        if (!token) {
            return alert('You need to be logged in')
        }

        const updatedData = privacyForm

        try {
            const updateUserPassord = await updateUserPassword(updatedData, token)
            alert('Password successfully changed!')
        } catch (error) {
            alert('Something went wrong saving changes.')
            console.error(error)
        }

    }

    const handleSignOut = () => {
        localStorage.removeItem('token')
        setCartItemCount(0)
        setUser(null)
        navigate('/')
    }

    useEffect(() => {
        if (user) {
            setPersonalDetailsForm({
                title: user.title || '',
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                gender: user.gender || '',
                email: user.email || '',
            })
        }
    }, [user])
    return (
        <div className="bg-gray-100">
            <h2 className="text-3xl text-center tracking-[0.1rem] pt-4 pb-12">Welcome back, {user?.title && `${user?.title.charAt(0).toUpperCase()}${user?.title.slice(1)}`} {user?.first_name}</h2>
            <div className="flex mx-8 pb-12 gap-4">
                <div id="account-navigation" className="h-fit bg-white px-8 py-8">
                    <ul className="flex flex-col gap-4 cursor-pointer">
                        <li><a href="/account" className="uppercase text-xs font-medium">My account</a></li>
                        <li><a href="/orders" className="uppercase text-xs font-medium">Order history</a></li>
                        <li><a onClick={handleSignOut} className="uppercase text-xs font-medium">Sign out</a></li>
                    </ul>
                </div>
                <div className="flex flex-1">
                    <div className="flex flex-1 flex-col gap-6">
                        <div className="bg-white flex flex-1 flex-col px-8 py-8">
                            <p className="uppercase text-[#0e0f0f] tracking-[0.15rem] text-sm font-medium">Personal details</p>
                            <div className="border border-gray-200 py-8 px-4 mt-8">
                                <form onSubmit={handlePersonalDetailsSave}>
                                    <fieldset>
                                        <div className="flex flex-col w-full sm:w-1/2">
                                            <label className="text-sm" htmlFor="customer-title">
                                                Title
                                            </label>
                                            <div className="border-b w-full pb-2 mb-2">
                                                <select required className="w-full" name="title" id="customer-title" value={personalDetailsForm.title} onChange={handleChange}>
                                                    <option value="">Please select</option>
                                                    <option value="ms">Ms.</option>
                                                    <option value="mr">Mr.</option>
                                                    <option value="professor">Professor</option>
                                                    <option value="lord">Lord</option>
                                                    <option value="mrs">Mrs.</option>
                                                    <option value="sheik">Sheik</option>
                                                    <option value="dr">Dr.</option>
                                                    <option value="sir">Sir</option>
                                                    <option value="miss">Miss</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-12 w-full mt-12 mb-6">
                                            <div className="w-full sm:w-1/2 relative group">
                                                <input type="text" name="first_name" required minLength={3} maxLength={100} className="border-b w-full h-10 px-4 text-sm peer outline-none" value={personalDetailsForm.first_name} onChange={handleChange} />
                                                <label htmlFor="customer-first-name" className="transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0">First Name</label>
                                            </div>
                                            <div className="w-full sm:w-1/2 relative group">
                                                <input type="text" name="last_name" required minLength={3} maxLength={100} className="border-b w-full h-10 px-4 text-sm peer outline-none" value={personalDetailsForm.last_name} onChange={handleChange} />
                                                <label htmlFor="customer-last-name" className="transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0">Last Name</label>
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-12 w-full mt-12 mb-6">
                                            <div className="w-full sm:w-1/2 relative group">
                                                <label className="text-sm" htmlFor="customer-gender">
                                                    Gender
                                                </label>
                                                <div className="border-b w-full">
                                                    <select required className="w-full" name="gender" id="customer-gender" value={personalDetailsForm.gender} onChange={handleChange}>
                                                        <option value="">Please select</option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="w-full sm:w-1/2 relative group">
                                                <input type="text" name="email" required minLength={3} maxLength={252} className="border-b w-full h-10 px-4 text-sm peer outline-none" value={personalDetailsForm.email} onChange={handleChange} />
                                                <label htmlFor="customer-email" className="h-10 transform transition-all absolute top-0 left-0 flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0">Email</label>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-500 my-10">We will always have your back, Hackett London does not share or sell presonal info.</p>
                                        <div className="flex gap-6 justify-center">
                                            <span className="uppercase py-2 px-8 text-sm font-medium tracking-wider bg-white text-[#1f2134] border-2 border-[#1f2134] cursor-pointer">Cancel</span>
                                            <button type="submit" name="send" className="uppercase py-2 px-6 bg-[#1f2134] text-white text-sm tracking-wider">Save changes</button>
                                        </div>
            
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                        <div className="bg-white flex flex-1 flex-col px-8 py-8">
                            <p className="uppercase text-[#0e0f0f] tracking-[0.15rem] text-sm font-medium">Privacy</p>
                            <div className="border border-gray-200 py-8 px-4 mt-8">
                                <form onSubmit={handlePrivacyFormChange}>
                                    <fieldset>
                                        <div className="flex flex-col sm:flex-row gap-12 w-full mt-12 mb-6">
                                            <div className="w-full sm:w-1/2 relative group">
                                                <label className="flex items-center text-xs text-gray-500">Current Password</label>
                                                <input type="password" name="current_password" required minLength={3} maxLength={1000} className="border-b w-full h-10 text-sm outline-none" onChange={handlePasswordChange} />
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-12 w-full mt-12 mb-6">
                                            <div className="w-full sm:w-1/2 relative group">
                                                <label className="flex items-center text-xs text-gray-500">New Password</label>
                                                <input type="password" name="new_password" required minLength={3} maxLength={1000} className="border-b w-full h-10 text-sm outline-none" onChange={handlePasswordChange} />
                                            </div>
                                            <div className="w-full sm:w-1/2 relative group">
                                                <label className="flex items-center text-xs text-gray-500">Confirm New Password</label>
                                                <input type="password" name="confirm_new_password" required minLength={3} maxLength={1000} className="border-b w-full h-10 text-sm outline-none" onChange={handlePasswordChange} />
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-500 my-10">We will always have your back, Hackett London does not share or sell presonal info.</p>
                                        <div className="flex gap-6 justify-center">
                                            <span className="uppercase py-2 px-8 text-sm font-medium tracking-wider bg-white text-[#1f2134] border-2 border-[#1f2134] cursor-pointer">Cancel</span>
                                            <button type="submit" name="send-set-password" className="uppercase py-2 px-6 bg-[#1f2134] text-white text-sm tracking-wider">Change password</button>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account