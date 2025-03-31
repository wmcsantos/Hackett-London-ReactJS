import React from 'react'
import HomeImage from '../images/home-image.png'
import BrandsHackett1 from '../images/brands-hackett1.svg'
import BrandsHackett2 from '../images/brands-hackett2.svg'
import BrandsHackett3 from '../images/brands-hackett3.svg'
import BrandsHackett4 from '../images/brands-hackett4.svg'
import BackToWork from '../images/back-to-work-landing-page.webp'
import BackToShirts from '../images/back-to-shirts-landing-page.webp'
import logoFooter from '../images/hackett-logo-footer.webp'

const Homepage = () => {
  return (
    <>
        <main className="flex flex-col w-full">
            <div className="flex flex-col justify-center items-center gap-y-6 bg-auto w-full h-[700px]" style={{ backgroundImage: `url(${HomeImage})` }}>
                <h1 className="flex w-full justify-center font-serif text-white text-8xl tracking-wider">New Collection</h1>
                <h3 className="text-white">Discover our new collection.</h3>
                <button className="uppercase text-white border border-white px-8 py-3 font-medium hover:bg-white hover:text-black transition-all duration-500">Shop new in</button>
            </div>
        </main>
        <div id="our-brands">
            <div className="my-16 flex justify-center">
                <h1 className="uppercase text-[#1f2134] font-medium text-md tracking-[0.25rem]">Our brands</h1>
            </div>
            <div className="grid grid-cols-2 gap-8 lg:gap-0 lg:flex lg:flex-row h-32 lg:h-16 justify-around my-16">
                <div className="flex-1">
                    <div><img className="mx-auto w-2/5 lg:w-3/5" src={BrandsHackett1} alt="" /></div>
                </div>
                <div className="flex-1">
                    <div><img className="mx-auto w-2/5 lg:w-3/5" src={BrandsHackett2} alt="" /></div>
                </div>
                <div className="flex-1">
                    <div><img className="mx-auto w-2/5 lg:w-3/5" src={BrandsHackett3} alt="" /></div>
                </div>
                <div className="flex-1">
                    <div><img className="mx-auto w-2/5 lg:w-3/5" src={BrandsHackett4} alt="" /></div>
                </div>
            </div>
        </div>
        <div id="back-to-work" className="flex relative mt-4 gap-x-2 h-[500]">
            <div className="flex flex-col absolute bottom-0 left-1/2 lg:relative lg:left-0 transform -translate-x-1/2 -translate-y-1/2 lg:-translate-x-0 lg:-translate-y-0 lg:w-2/5 justify-center items-center bg-none lg:bg-stone-100">
                <p className="text-lg sm:text-2xl md:text-3xl mb-6 text-white lg:text-stone-700 font-extralight tracking-wider font-serif">Back to Work</p>
                <p className="text-white lg:text-stone-700 text-sm lg:text-md">Business-casual or formal looks</p>
                <div className="group mt-6">
                    <a href="" className="uppercase tracking-wide text-sm font-medium text-white lg:text-stone-700 lg:hover:text-stone-500">Shop now</a>
                    <div className="bg-stone-500 h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
                </div>
            </div>
            <div className="flex w-full lg:w-3/5">
                <img src={BackToWork} alt="" />
            </div>
        </div>
        <div id="back-to-shirts" className="flex relative mt-4 gap-x-2 h-[500]">
            <div className="flex w-full lg:w-3/5">
                <img src={BackToShirts} alt="" />
            </div>
            <div className="flex flex-col absolute bottom-0 left-1/2 lg:relative lg:left-0 transform -translate-x-1/2 -translate-y-1/2 lg:-translate-x-0 lg:-translate-y-0 lg:w-2/5 justify-center items-center bg-none lg:bg-stone-100">
                <p className="text-lg sm:text-2xl md:text-3xl mb-6 text-white lg:text-stone-700 font-extralight tracking-wider font-serif">Back to Shirts</p>
                <p className="text-white lg:text-stone-700 text-sm lg:text-md">Elegance and authenticity, with a British Edge</p>
                <div className="group mt-6">
                    <a href="" className="uppercase tracking-wide text-sm font-medium text-white lg:text-stone-700 lg:hover:text-stone-500">Discover more</a>
                    <div className="bg-stone-500 h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
                </div>
            </div>
        </div>
        <div className="mt-16 bg-white mx-auto py-10">
            <img src={logoFooter} alt="Hackett Logo Footer" className="bg-contain h-32 mx-auto" />
        </div>
    </>
  )
}

export default Homepage