import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../state/store'
import Product from './Product.tsx'

const Products = () => {
    const category = useSelector((state: RootState) => state.category.selectedCategory)
    const subcategory = useSelector((state: RootState) => state.category.selectedSubcategory)

    const categoryId = category ? category.id : null    

    return (
        <>
            <h1 className="uppercase tracking-[0.25rem] mt-4 mb-12 text-center font-semibold text-3xl">{subcategory || category?.name}</h1>

            <div className="relative">
                <div id="filters" className="flex h-12 justify-between border-t border-gray-400 uppercase text-xs font-semibold px-8">
                    <div className="flex">
                        <div className="flex lg:hidden items-center py-3 pr-4">
                            <button id="open-filters" className="uppercase">Filters</button>
                        </div>
                        <div className="hidden lg:flex items-center py-3 pr-4 cursor-pointer group">
                            <p>Product type</p>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 9L12 16L5 9" stroke="#383838" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <div id="" className="bg-white absolute top-12 left-0 w-full max-h-[800px] lg:p-6 opacity-0 hidden lg:group-hover:opacity-100 lg:group-hover:flex">
                                <div className="grid grid-rows-4 grid-cols-4 grid-flow-col gap-4">
                                    <a href="" className="flex lowercase font-light">
                                        <div className="checkbox block w-3 h-3 min-w-3 border border-black text-center mr-3"></div>
                                        <span className="">shirt</span>
                                        <span>(141)</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:flex items-center py-3 pr-4 cursor-pointer group">
                            <p>Colour</p>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 9L12 16L5 9" stroke="#383838" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <div id="" className="bg-white absolute top-12 left-0 w-full max-h-[800px] lg:p-6 opacity-0 hidden lg:group-hover:opacity-100 lg:group-hover:flex">
                                <div className="grid grid-rows-4 grid-cols-4 grid-flow-col gap-4">
                                    <a href="" className="flex lowercase font-light">
                                        <div className="checkbox block w-3 h-3 min-w-3 border border-black text-center mr-3"></div>
                                        <span className="">shirt</span>
                                        <span>(141)</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:flex items-center py-3 pr-4 cursor-pointer group">
                            <p>Size</p>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 9L12 16L5 9" stroke="#383838" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <div id="" className="bg-white absolute top-12 left-0 w-full max-h-[800px] lg:p-6 opacity-0 hidden lg:group-hover:opacity-100 lg:group-hover:flex">
                                <div className="grid grid-rows-4 grid-cols-4 grid-flow-col gap-4">
                                    <a href="" className="flex lowercase font-light">
                                        <div className="checkbox block w-3 h-3 min-w-3 border border-black text-center mr-3"></div>
                                        <span className="">shirt</span>
                                        <span>(141)</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:flex items-center py-3 pr-4 cursor-pointer group">
                            <p>Length</p>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 9L12 16L5 9" stroke="#383838" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <div id="" className="bg-white absolute top-12 left-0 w-full max-h-[800px] lg:p-6 opacity-0 hidden lg:group-hover:opacity-100 lg:group-hover:flex">
                                <div className="grid grid-rows-4 grid-cols-4 grid-flow-col gap-4">
                                    <a href="" className="flex lowercase font-light">
                                        <div className="checkbox block w-3 h-3 min-w-3 border border-black text-center mr-3"></div>
                                        <span className="">shirtshirt</span>
                                        <span>(141)</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:flex items-center py-3 pr-4 cursor-pointer group">
                            <p>Composition</p>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 9L12 16L5 9" stroke="#383838" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <div id="" className="bg-white absolute top-12 left-0 w-full max-h-[800px] lg:p-6 opacity-0 hidden lg:group-hover:opacity-100 lg:group-hover:flex">
                                <div className="grid grid-rows-4 grid-cols-4 grid-flow-col gap-4">
                                    <a href="" className="flex lowercase font-light">
                                        <div className="checkbox block w-3 h-3 min-w-3 border border-black text-center mr-3"></div>
                                        <span className="">shirt</span>
                                        <span>(141)</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <span className="hidden lg:block border-r m-3 border-black"></span>
                        <div className="hidden lg:flex items-center py-3 pr-4">
                            <p className="text-gray-500">Clear all filters</p>
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <p className="hidden my-auto lg:block py-3 capitalize text-gray-500 font-extralight">(634) results</p>
                        <div className="flex items-center py-3 pr-4">
                        <button className="uppercase">Sort by</button>
                        <svg className="hidden lg:block" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 9L12 16L5 9" stroke="#383838" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
            </div>
            {/* <!-- Drawer for Filters (hidden by default) --> */}
            <div id="filter-drawer" className="fixed top-0 left-0 h-full w-1/2 bg-white transform -translate-x-full transition-transform duration-300 z-50 lg:hidden">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="uppercase text-xs font-bold">Filters</h2>
                    <button id="close-filters" className="text-sm font-bold">✕</button>
                </div>
                <div className="p-4 overflow-y-auto h-full">
                    {/* <!-- Accordion for Filters --> */}
                    <div className="accordion-item">
                        <div className="accordion-header flex justify-between py-4 px-0 uppercase text-xs font-semibold cursor-pointer">
                            <h3 className="">Product type</h3>
                            <svg className="accordion-icon lg:block transition-transform duration-300" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 9L12 16L5 9" stroke="#383838" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className="accordion-content py-2 px-0 hidden">
                            <a href="" className="flex lowercase font-light">
                                <div className="checkbox block w-3 h-3 min-w-3 border border-black text-center my-auto mr-3"></div>
                                <span className="text-xs">shirt</span>
                                <span className="text-xs">(141)</span>
                            </a>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <div className="accordion-header flex justify-between py-4 px-0 uppercase text-xs font-semibold cursor-pointer">
                            <h3 className="">Colour</h3>
                            <svg className="accordion-icon lg:block transition-transform duration-300" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 9L12 16L5 9" stroke="#383838" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className="accordion-content py-2 px-0 hidden">
                            <a href="" className="flex lowercase font-light">
                                <div className="checkbox block w-3 h-3 min-w-3 border border-black text-center my-auto mr-3"></div>
                                <span className="text-xs">shirt</span>
                                <span className="text-xs">(141)</span>
                            </a>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <div className="accordion-header flex justify-between py-4 px-0 uppercase text-xs font-semibold cursor-pointer">
                            <h3 className="">Size</h3>
                            <svg className="accordion-icon lg:block transition-transform duration-300" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 9L12 16L5 9" stroke="#383838" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className="accordion-content py-2 px-0 hidden">
                            <a href="" className="flex lowercase font-light">
                                <div className="checkbox block w-3 h-3 min-w-3 border border-black text-center my-auto mr-3"></div>
                                <span className="text-xs">shirt</span>
                                <span className="text-xs">(141)</span>
                            </a>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <div className="accordion-header flex justify-between py-4 px-0 uppercase text-xs font-semibold cursor-pointer">
                            <h3 className="">Length</h3>
                            <svg className="accordion-icon lg:block transition-transform duration-300" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 9L12 16L5 9" stroke="#383838" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className="accordion-content py-2 px-0 hidden">
                            <a href="" className="flex lowercase font-light">
                                <div className="checkbox block w-3 h-3 min-w-3 border border-black text-center my-auto mr-3"></div>
                                <span className="text-xs">shirt</span>
                                <span className="text-xs">(141)</span>
                            </a>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <div className="accordion-header flex justify-between py-4 px-0 uppercase text-xs font-semibold cursor-pointer">
                            <h3 className="">Composition</h3>
                            <svg className="accordion-icon lg:block transition-transform duration-300" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 9L12 16L5 9" stroke="#383838" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className="accordion-content py-2 px-0 hidden">
                            <a href="" className="flex lowercase font-light">
                                <div className="checkbox block w-3 h-3 min-w-3 border border-black text-center my-auto mr-3"></div>
                                <span className="text-xs">shirt</span>
                                <span className="text-xs">(141)</span>
                            </a>
                        </div>
                    </div>

                    {/* <!-- Add other accordion items as necessary --> */}
                </div>
            </div>
            </div>
            
            {/* <!-- Overlay for closing drawer --> */}
            <div id="drawer-overlay" className="fixed inset-0 bg-black opacity-50 hidden z-40 lg:hidden"></div>

            {category && <Product categoryId={categoryId} />}
        </>
        )
    }

    export default Products