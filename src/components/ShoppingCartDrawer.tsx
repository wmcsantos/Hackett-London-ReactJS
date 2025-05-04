import React, { useEffect, useState } from 'react'
import deleteItemFromCart from '../actions/delete-item-from-cart.tsx'
import fetchUserActiveCart from '../actions/fetch-user-active-cart.tsx'

const ShoppingCartDrawer = ({ cartItems, drawerOpen }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [items, setItems] = useState(cartItems)

    useEffect(() => {
        setItems(cartItems)
        if (drawerOpen) {
            setIsOpen(true)
        }
    }, [drawerOpen])

    const closeDrawer = () => setIsOpen(false)

    const deleteItem = async (e, itemId) => {
        e.preventDefault()

        const cart = await fetchUserActiveCart()
        const cartId = cart?.id
        
        await deleteItemFromCart(cartId, itemId)

        // Update UI
        setItems(prevItems => prevItems.filter(item => item.id !== itemId))
    }

    return (
        <>
            {/* <!-- Overlay When Cart Drawer is Open --> */}
            <div 
                id="overlay" 
                className={`fixed inset-0 bg-gray-900/50 z-40 transition-opacity duration-300 ${isOpen ? 'block' : 'hidden'}`}
                onClick={closeDrawer}
            ></div>
            {/* <!-- Shopping Cart Drawer --> */}
            <div 
                id="cart-drawer" 
                className={`fixed top-16 right-0 w-[400px] h-full bg-white transform transition-transform duration-300 ease-in-out z-50 
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="p-6 pb-0 flex justify-between items-center">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.2rem]">In your bag</h2>
                    <button 
                        id="close-cart-drawer" 
                        className="text-gray-500 hover:text-gray-800"
                        onClick={closeDrawer}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
                <div className="p-6">
                    <div id="cart-items">
                        {items.length === 0 ? (
                            <p className="text-sm text-gray-500">Your cart is empty.</p>
                            ) : (
                            items.map((item, index) => (
                            <div key={index} className="flex relative gap-4 my-4">
                                <div id="product-variant">
                                    <div className="product-image">
                                        <a href="">
                                            <picture className="block w-[115px] h-[160px]">
                                                <img src={`${item.image_url}`} alt="" />
                                            </picture>
                                        </a>
                                    </div>
                                </div>
                                <div id="product-details" className="flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-xs font-semibold capitalize">{item.product_name}</h3>
                                        <p className="text-xs mt-2">€ {item.price}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm capitalize">Color: {item.color}</p>
                                        <p className="text-sm">Size: {item.size}</p>
                                        <span className="text-sm">Quantity: </span>
                                        <span className="text-sm">{item.quantity}</span>
                                    </div>
                                    <div>
                                        <a href="" className="text-sm underline capitalize">Edit item</a>
                                        <span>|</span>
                                        <a onClick={(e) => deleteItem(e, item.id)} id="remove-item" className="text-sm underline capitalize cursor-pointer" data-cart-item-id={item.id}>Remove</a>
                                    </div>
                                </div>
                            </div>
                            ))
                        )}
                    </div>
                    <div className="mt-6">
                        <p className="text-xs font-semibold">Subtotal <span id="cart-total" className=" right-0">€ {items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</span></p>
                    </div>
                    <div className="mt-6 flex justify-between gap-2 text-center">
                        <a href="/cart" className="basis-1/2 text-xs tracking-[0.2rem] text-[#1f2134] border border-[#1f2134] px-4 py-3 uppercase bg-white">Shopping bag</a>
                        <a href="/checkout" className="basis-1/2 text-xs tracking-[0.2rem] text-white px-4 py-3 uppercase bg-[#1f2134]">Checkout</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShoppingCartDrawer