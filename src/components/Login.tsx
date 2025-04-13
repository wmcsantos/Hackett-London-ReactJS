import React, {useState } from 'react'
import loginAccess from '../actions/login-access.tsx'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const data = await loginAccess(email, password)
            localStorage.setItem('token', data.access_token)

            window.location.href = '/'
        } catch (err: any) {
            setErrorMessage(err.message)
        }
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
  return (
    <div className="bg-gray-100">
    {/* <?php require_once("templates/header.php") ?> */}
        {/* <!-- Indication of a failed login --> */}
        {/* <?php 
            if (isset($_SESSION['loginStatusMessage'])) {
                echo "<p className='text-center m-4 text-red-800 text-md font-medium'>{$_SESSION['loginStatusMessage']}</p>";
                unset($_SESSION['loginStatusMessage']);
            }
        ?> */}
    {/* <!-- Modal Forgot Password --> */}
    <div id="forgot-password-modal" className="hidden fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h1 className="text-medium font-semibold mb-4">Forgot your password?</h1>
            <p id="modal-forgot-password-message" className="text-[#1f2134] text-sm mb-8">
                Don't worry - it's easily done! Just enter your email address below and we'll send you a link to reset your password.
            </p>
            <form method="POST" action="<?= ROOT ?>/forgot-password">
                <label className="flex h-full border-b border-slate-400 py-2">
                    <input name="email" className="w-full appearance-none bg-transparent border-none leading-tight focus:outline-none" type="text" placeholder="Enter your email" />
                </label>
                <button type="submit" name="send" id="modal-forgot-password-btn" className="uppercase w-full text-center text-sm p-2 bg-[#1f2134] text-white tracking-wider mt-6 hover:bg-white hover:text-[#1f2134] border-2 border-[#1f2134] transition-all duration-300">Reset Password</button>
            </form>
        </div>
    </div>
    <div className="flex mt-10 lg:hidden">
        <div className="flex w-1/2 justify-center">
            <input className="hidden peer" type="radio" id="tab-registered" name="tabs" checked />
            <label htmlFor="tab-registered" className="w-full pb-2 text-sm text-center border-b peer-checked:border-b-black peer-checked:text-black text-gray-400 border-b-gray-400 cursor-pointer">Registered</label>
        </div>
        <div className="flex w-1/2 justify-center">
            <input className="hidden peer" type="radio" id="tab-guest" name="tabs" />
            <label htmlFor="tab-guest" className="w-full pb-2 text-sm text-center border-b peer-checked:border-b-black peer-checked:text-black text-gray-400 border-b-gray-400 cursor-pointer" >Guest</label>
        </div>
    </div>
        <div className="flex w-full lg:w-5/6 gap-4 mx-auto text-sm lg:mt-10">
            <div id="register" className="w-full lg:w-1/2 bg-white justify-center px-32 md:px-14 pb-14 lg:block">
                <h2 className="my-14 text-center font-semibold tracking-[0.25rem] uppercase text-[#1f2134]">Registered</h2>
                <form onSubmit={handleLogin}>
                    <div className="h-12 mb-14">
                        <label className="flex h-full border-b border-slate-400 py-2">
                            <input className="w-full appearance-none bg-transparent border-none leading-tight focus:outline-none" type="email" name="email" value={email} onChange={handleEmailChange} placeholder="Email" />
                        </label>
                    </div>
                    <div className="h-12 mb-14">
                        <label className="flex h-full border-b border-slate-400 py-2">
                            <input className="w-full appearance-none bg-transparent border-none leading-tight focus:outline-none" type="password" name="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
                        </label>
                    </div>
                    {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
                    <div className="flex flex-col justify-center text-sm">
                        <a id="forgot-password-link" className="text-center tracking-[0.1rem] text-[#1f2134] underline underline-offset-8 pt-10 pb-2 hover:text-slate-500 cursor-pointer">Forgot your password?</a>
                        <button type="submit" name="send" className="uppercase text-center p-4 bg-[#1f2134] text-white tracking-wider my-6 hover:bg-white hover:text-[#1f2134] border-2 border-[#1f2134] transition-all duration-300">Sign In and checkout</button>
                    </div>
                </form>
            </div>
            <div id="create-account" className="w-full lg:w-1/2 hidden bg-white justify-center px-32 md:px-14 lg:block">
                <h2 className="my-14 text-sm text-center font-semibold tracking-[0.25rem] uppercase text-[#1f2134]">New at hackett?</h2>
                <p className="mb-6 text-[#1f2134] tracking-wider uppercase text-sm font-medium">Membership has its benefits</p>
                <ul className="text-[#1f2134] text-sm">
                    <li className="pt-3 pb-6">Save your billing and shipping for faster, easier checkout.</li>
                    <li className="pt-3 pb-6">Check the status of your orders and check the online.</li>
                    <li className="pt-3 pb-6">WhatsApp Fast track</li>
                    <li className="pt-3 pb-6">View your order history - a detailed list of each order.</li>
                </ul>
                <div className="flex flex-col justify-center">
                    <a href="<?=ROOT?>/register" className="uppercase text-center p-4 bg-[#1f2134] text-white text-sm tracking-wider my-6 hover:bg-white hover:text-[#1f2134] border-2 border-[#1f2134] transition-all duration-300">Create account</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login