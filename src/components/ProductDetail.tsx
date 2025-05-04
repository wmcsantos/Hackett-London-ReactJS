import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import fetchProductImages from '../actions/fetch-product-images.tsx'
import fetchProductById, { Product } from '../actions/fetch-product-by-id.tsx'
import fetchProductColors, { ProductColors } from '../actions/fetch-product-colors.tsx'
import fetchProductSizes, { ProductSizes } from '../actions/fetch-product-sizes.tsx'
import { useSelector } from 'react-redux'
import { RootState } from '../state/store.ts'
import addItemToCart from '../actions/add-item-to-cart.tsx'
import fetchProductVariant from '../actions/fetch-product-variant.tsx'
import createCart from '../actions/create-cart.tsx'
import { useCart } from '../context/CartContext.tsx'
import fetchUserActiveCart from '../actions/fetch-user-active-cart.tsx'
import fetchCartItemsCount from '../actions/fetch-cart-items-count.tsx'
import ShoppingCartDrawer from './ShoppingCartDrawer.tsx'

const ProductDetail = () => {
    const { productId } = useParams()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)

    const { cartItems, fetchCart } = useCart()
    
    const colorCode = searchParams.get('color')
    const sizeName = searchParams.get('size')

    const [productImages, setProductImages] = useState<any[]>([])
    const [productColors, setProductColors] = useState<ProductColors | null>([])
    const [productSizes, setProductSizes] = useState<ProductSizes | null>([])
    const [productInfo, setProductInfo] = useState<Product | null>(null)
    const [drawerOpen, setDrawerOpen] = useState(false)

    const [selectedSize, setSelectedSize] = useState<any>()
    const category = useSelector((state: RootState) => state.category.selectedCategory)
    const subcategory = useSelector((state: RootState) => state.category.selectedSubcategory)

    const selectedColor = productColors?.find((color) => color.code === colorCode)
    // const selectedSize = productSizes?.find((size) => size.code === sizeName)


    
    useEffect(() => {
        // if (!productId || !colorCode) return

        const getProductImages = async () => {
            const data = await fetchProductImages(colorCode, productId)
            setProductImages(data)
        }

        const getProductSizes = async () => {
            const data = await fetchProductSizes(colorCode, productId)
            setProductSizes(data)
        }

        const getProductInfo = async () => {
            const [product] = await fetchProductById(productId)
            setProductInfo(product)
        }

        const getProductColors = async () => {
            const data = await fetchProductColors(productId)           
            setProductColors(data)
        }
        
        getProductImages()
        getProductInfo()
        getProductColors()
        getProductSizes()
    }, [])
    
    function highlightSelectedSize(size)
    {
        const listItems = document.querySelectorAll('#sizes-list li');
        listItems.forEach(li => {
            const anchor = li.querySelector('a');
            
            const sizeInAnchor = anchor?.innerText.trim();
            
            if (sizeInAnchor === size) 
            {
                anchor?.classList.add('border', 'border-black');
            } else 
            {
                anchor?.classList.remove('border', 'border-black');
            }
        });
    }

    function updateUrl(e, size)
    {
        e.preventDefault();
        
        const url = new URL(window.location.href);
        const sizeId = e.currentTarget.getAttribute('data-size-id')
        
        url.searchParams.set("size", size);

        window.history.pushState({}, '', url);

        highlightSelectedSize(size);
        
        setSelectedSize(sizeId)
    }

    const addToBag = async () => {
        if (!selectedSize || !selectedColor) {
            console.error('Size or Color not selected!');
            return;
        }

        const productVariant = await fetchProductVariant(Number(productId), selectedSize, selectedColor.color_id)
        const cart =  await createCart()
        try {
            await addItemToCart(cart.id, productVariant.id, 1, productVariant.price)
            
            const activeCart = await fetchUserActiveCart()
            if (activeCart && activeCart.id) {
                const data = await fetchCartItemsCount(activeCart.id)
                await fetchCart()
            }
            } catch (error) {
            console.error('Failed to add item or fetch cart count:', error)
        }
        setDrawerOpen(true)
    }

    return (
        <>
            {/* <!-- Modal --> */}
        <div id="message-modal" className="hidden fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <p id="modal-message" className="text-[#1f2134]"></p>
                <button id="modal-login-btn" className="uppercase text-center text-sm p-2 bg-[#1f2134] text-white tracking-wider mt-6 mx-6 hover:bg-white hover:text-[#1f2134] border-2 border-[#1f2134] transition-all duration-300">Log In</button>
            </div>
        </div>
        <div className="flex">
            <div id="product-images" className="w-3/5">
                <div className="grid grid-cols-8 gap-2">
                    {
                        productImages.map((image, index) => (
                            <picture key={index} className={index > 3 ? "" : "col-span-4"}>
                                <img src={image.image_url} alt="" />
                            </picture>
                        ))
                    }
                </div>
            </div>
            <div id="product-details" className="w-2/5 h-[1000px] px-8 py-2">
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li>
                        <div className="flex items-center">
                            <a href="#" className="ms-1 text-sm capitalize font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">{category?.name}</a>
                        </div>
                        </li>
                        <li aria-current="page">
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                            </svg>
                            <span className="capitalize ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">{subcategory || "Subcategory"}</span>
                        </div>
                        </li>
                    </ol>
                </nav>
                <h1 id="product-title" className="capitalize text-lg font-semibold" data-product-id={productInfo?.id}>{productInfo?.name || 'None'}</h1>
                <p className="text-xs mt-2">{`€ ${productInfo?.price}`}</p>
                <div id="choose-color" className="mt-6">
                    <span className="uppercase font-semibold text-xs tracking-wider">Choose color:</span>
                    <span className="text-xs capitalize">{selectedColor?.name}</span>
                    <ul id="product-colors" className="flex h-8 mt-4 gap-x-2">
                        {
                            productColors.map((color, index) => (
                                <li key={index} className={`${color.code === colorCode ? 'border-b border-black' : ''} pb-1`}>
                                    <a href={`?color=${color.code}`} className="color-option" data-color-id={`${color.color_id}`} data-default-color-id={color.code === colorCode ? color.color_id : ''}>
                                        <img className="border border-gray-200 h-full" src={color.image_url} alt="" />
                                    </a>
                                </li>
                                
                            ))
                        }
                    </ul>
                </div>
                <div id="product-sizes" className="mt-4">
                    <div className="flex gap-2 items-center">
                        <span className="uppercase font-semibold text-xs tracking-wider">Select size:</span>
                        <p id="missing-size-message" className="text-red-800 text-xs"></p>
                    </div>
                    <div>
                        <ul id="sizes-list" className="flex gap-2 h-8 mt-4 mb-8 text-xs font-semibold text-center">
                            <li className="w-10"><a href={productSizes[0]?.stock !== 0 ? '' : undefined} data-size-id={productSizes[0]?.size_id} data-default-size-id={selectedSize === "XS" ? 1 : ""} onClick={productSizes[0]?.stock !== 0 ? (e) => {updateUrl(e, 'XS')} : undefined}  className={`${productSizes[0]?.stock === 0 ? "text-gray-400" : "size-option hover:border hover:border-black"} block p-2`}>XS</a></li>
                            <li className="w-10"><a href={productSizes[1]?.stock !== 0 ? '' : undefined} data-size-id={productSizes[1]?.size_id} data-default-size-id={selectedSize === "S" ? 2 : ""} onClick={productSizes[1]?.stock !== 0 ? (e) => {updateUrl(e, 'S')} : undefined}  className={`${productSizes[1]?.stock === 0 ? "text-gray-400" : "size-option hover:border hover:border-black"} block p-2`}>S</a></li>
                            <li className="w-10"><a href={productSizes[2]?.stock !== 0 ? '' : undefined} data-size-id={productSizes[2]?.size_id} data-default-size-id={selectedSize === "M" ? 3 : ""} onClick={productSizes[2]?.stock !== 0 ? (e) => {updateUrl(e, 'M')} : undefined}  className={`${productSizes[2]?.stock === 0 ? "text-gray-400" : "size-option hover:border hover:border-black"} block p-2`}>M</a></li>
                            <li className="w-10"><a href={productSizes[3]?.stock !== 0 ? '' : undefined} data-size-id={productSizes[3]?.size_id} data-default-size-id={selectedSize === "L" ? 4 : ""} onClick={productSizes[3]?.stock !== 0 ? (e) => {updateUrl(e, 'L')} : undefined}  className={`${productSizes[3]?.stock === 0 ? "text-gray-400" : "size-option hover:border hover:border-black"} block p-2`}>L</a></li>
                            <li className="w-10"><a href={productSizes[4]?.stock !== 0 ? '' : undefined} data-size-id={productSizes[4]?.size_id} data-default-size-id={selectedSize === "XL" ? 5 : ""} onClick={productSizes[4]?.stock !== 0 ? (e) => {updateUrl(e, 'XL')} : undefined}  className={`${productSizes[4]?.stock === 0 ? "text-gray-400" : "size-option hover:border hover:border-black"} block p-2`}>XL</a></li>
                            <li className="w-10"><a href={productSizes[5]?.stock !== 0 ? '' : undefined} data-size-id={productSizes[5]?.size_id} data-default-size-id={selectedSize === "XXL" ? 6 : ""} onClick={productSizes[5]?.stock !== 0 ? (e) => {updateUrl(e, 'XXL')} : undefined}  className={`${productSizes[5]?.stock === 0 ? "text-gray-400" : "size-option hover:border hover:border-black"} block p-2`}>XXL</a></li>
                            <li className="w-10"><a href={productSizes[6]?.stock !== 0 ? '' : undefined} data-size-id={productSizes[6]?.size_id} data-default-size-id={selectedSize === "3XL" ? 7 : ""} onClick={productSizes[6]?.stock !== 0 ? (e) => {updateUrl(e, '3XL')} : undefined}  className={`${productSizes[6]?.stock === 0 ? "text-gray-400" : "size-option hover:border hover:border-black"} block p-2`}>3XL</a></li>
                        </ul>
                    </div>

                    <a href="" className="uppercase underline underline-offset-1 text-sm">Size Guide</a>
                </div>

                <button id="add-to-cart" type="submit" onClick={addToBag} value="Add to Bag" className="after:content-[url('<?=ROOT?>/images/icons/shopping-cart-icon.svg')] hover:after:content-[url('<?=ROOT?>/images/icons/shopping-cart-hover-icon.svg')] w-full uppercase p-2 bg-[#1f2134] text-white text-sm tracking-wider my-6 hover:bg-white hover:text-[#1f2134] hover:fill-black border-2 border-[#1f2134] transition-all duration-300">
                    Add to bag
                </button>
            </div>
        </div>
        <div className="product-details w-2/3 grid grid-cols-2 gap-4 mx-4 mt-12">
            <div>
                <div>
                    <div>
                        <h1 className="uppercase font-medium tracking-[0.25rem] text-sm pb-4">Product details</h1>
                    </div>
                    <div className="text-sm">
                        {productInfo?.description_details}
                    </div>
                </div>
                <div className="mt-4">
                    <div>
                        <h1 className="uppercase font-medium tracking-[0.25rem] text-sm pb-4">Composition</h1>
                    </div>
                    <div className="text-sm">
                    {productInfo?.description_composition}
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <div>
                        <h1 className="uppercase font-medium tracking-[0.25rem] text-sm pb-4">Care</h1>
                    </div>
                    <div className="text-sm">
                    {productInfo?.description_care}
                    </div>
                </div>
                <div className="mt-4">
                    <div>
                        <h1 className="uppercase font-medium tracking-[0.25rem] text-sm pb-4">Delivery and returns</h1>
                    </div>
                    <div className="text-sm">
                    {productInfo?.description_delivery}
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-16 bg-white mx-auto py-10">
            <img src="images/hackett-logo-footer.webp" alt="Hackett Logo Footer" className="bg-contain h-32 mx-auto" />
        </div>
        <ShoppingCartDrawer cartItems={cartItems} drawerOpen={drawerOpen} />
        </>
    )
    }

    export default ProductDetail