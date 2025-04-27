import React, { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext.tsx'
import fetchUserOrders, { OrdersType } from '../actions/fetch-user-orders.tsx'
import { useNavigate } from 'react-router-dom'

const Orders = () => {
    const { user, setUser } = useUser()
    const navigate = useNavigate()

    const [orders, setOrders] = useState<OrdersType[]>([])

    const handleSignOut = () => {
        localStorage.removeItem('token')
        setUser(null)
        navigate('/')
    }

    useEffect(() => {
        const getUserOrders = async () => {
          const data = await fetchUserOrders()
          setOrders(data);
        }
        
        getUserOrders()   
      }, []);
    return (
        <div className="bg-gray-100">
            <h2 className="text-3xl text-center tracking-[0.1rem] pt-4 pb-12">Welcome back, {user?.title && `${user?.title.charAt(0).toUpperCase()}${user?.title.slice(1)}`} {user?.first_name}</h2>
            <div className="flex mx-8 pb-12 gap-4">
                <div id="account-navigation" className="bg-white px-8 py-8">
                    <ul className="flex flex-col gap-4">
                    <li><a href="/account" className="uppercase text-xs font-medium">My account</a></li>
                        <li><a href="/orders" className="uppercase text-xs font-medium">Order history</a></li>
                        <li><a onClick={handleSignOut} className="uppercase text-xs font-medium">Sign out</a></li>
                    </ul>
                </div>
                    {orders.length === 0 && (
                        <div className="bg-white flex-1 px-8 py-8">
                            <p className="uppercase text-[#0e0f0f] tracking-[0.1rem] font-semibold">Your recent orders</p>
                            <p className= "text-[#0e0f0f] text-sm font-light mb-2">We have no order records for this account.</p>
                            <a href="/" className="underline">Continue Shopping</a>
                        </div>
                    )
                    }
                    {orders.length !== 0 && (
                        <div className="bg-white flex-1 px-8 py-8">
                        <table className="w-full text-[#323232]">
                            <thead>
                                <tr className="bg-[#1e2134] text-white text-lg text-left">
                                    <th>Order Id</th>
                                    <th>Date</th>
                                    <th>Total Amount</th>
                                    <th>Order Status</th>
                                </tr>
                            </thead>
                            <tbody>
                            {orders.map((order, index) => (
                                <tr key={index} className="border-b">
                                    <td>#{order.id}</td>
                                    <td>{order.order_date}</td>
                                    <td>€{order.total_amount}</td>
                                    <td>{order.order_status}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    )}
            </div>
        </div>
    )
}

export default Orders