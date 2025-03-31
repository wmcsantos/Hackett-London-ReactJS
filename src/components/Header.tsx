import React, { useEffect, useState } from 'react'
import hackettLogo from '../images/logos/hackett-logo.svg'
import clothingHeader from '../images/clothing-header.jpg'
import fetchAllCategories from '../actions/fetch-all-categories.tsx';
import fetchSubcategoriesById from '../actions/fetch-subcategories-by-id.tsx';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCategory } from '../state/category/categorySlice.ts'

function Header() {
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState({})

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchAllCategories()
      setCategories(data)
    }
    getCategories()

  }, [])
  
  const handleMouseEnter = async (categoryId) => {
    if (!subcategories[categoryId]) {
      const data = await fetchSubcategoriesById(categoryId)
      setSubcategories((prev) => ({ ...prev, [categoryId]: data }))
    }
  }
  
  const handleCategoryClick = (categoryId, categoryName) => {
    dispatch(setCategory({ id: categoryId, name: categoryName}))
  }
  
  const handleSubcategoryClick = (categoryId, subcategoryName) => {
    dispatch(setCategory({ id: categoryId, name: subcategoryName}))
  }

  return (
    <>
    <div className="flex justify-between items-center h-[4.5rem] px-8 bg-white">
        <a href="/">
            <img src={hackettLogo} alt="Hackett Logo" />
        </a>
        <nav className="flex h-full items-center w-full lg:w-auto lg:block z-10">
            <div className="nav-links absolute lg:static lg:min-h-fit bg-white min-h-full left-0 top-[-100%] w-full md:w-1/2 flex items-start px-5 border-[#eee]">
                <div className="absolute right-5 -top-12 cursor-pointer" onClick={() => {}}>
                </div>
                <ul className="w-full lg:flex flex-col lg:flex-row lg:h-full leading-[4rem]">
                  {categories.map((category) => (
                    <li 
                      key={category.id} 
                      className="category-list group lg:px-5 h-full" 
                      data-category-id={`${category.name}-${category.id}`}
                      onMouseEnter={() => handleMouseEnter(category.id)}
                    >
                        <div className="category-menu flex justify-between cursor-pointer">
                          <Link 
                            to={`/view-all/${category.name}`} 
                            className="hidden lg:block h-full text-sm leading-[4rem] uppercase text-[#1f2134] font-semibold hover:before:scale-x-100 hover:before:origin-left relative before:w-full before:h-0.5 before:origin-right before:transition-transform before:duration-300 before:scale-x-0 before:bg-[#1f2134] lg:before:absolute before:left-0 before:bottom-3"
                            onClick={() => handleCategoryClick(category.id, category.name)}
                            >
                            {category.name}
                          </Link>
                          <Link className="lg:hidden h-full text-sm leading-[4rem] block uppercase text-[#1f2134] font-semibold hover:before:scale-x-100 hover:before:origin-left relative before:w-full before:h-0.5 before:origin-right before:transition-transform before:duration-300 before:scale-x-0 before:bg-[#1f2134] lg:before:absolute before:left-0 before:bottom-3">
                            {category.name}
                          </Link>
                        </div>
                        <div id="dropdown-header" className="dropdown-menu flex-row gap-4 pl-5 lg:justify-center bg-white absolute left-0 w-full max-h-[800px] lg:p-6 hidden opacity-0 lg:group-hover:opacity-100 lg:group-hover:flex">
                          <div className="w-full lg:w-2/5">
                            <ul className="dropdown-submenu flex flex-col lg:grid grid-flow-col grid-cols-2 grid-rows-7 h-full uppercase text-[#1f2134] text-sm">
                            {subcategories[category.id]?.length > 0 ? (
                              subcategories[category.id].map((sub) => (
                                <li key={sub.id} className="py-1">
                                  <Link to={`/${category.name}/${sub.name}`} onClick={() => handleSubcategoryClick(sub.id, sub.name)}>{sub.name}</Link>
                                </li>
                              ))
                            ) : (
                              <li>No subcategories</li>
                            )}
                            </ul>
                          </div>
                          <div className="1/5 hidden lg:block">
                            <img className="object-scale-down h-80 w-160" src={clothingHeader} alt="" />
                          </div>
                        </div>
                    </li>
                  ))}
                </ul>
            </div>
        </nav>

        <div className="utility-menu-icons flex h-full justify-center items-center gap-x-2">
            <div className="flex items-center relative overflow-hidden">
                <p className="text-center m-4 text-black text-md font-medium">User</p>
                <a href="/">
                </a>
            </div>
            <a href="/" className="flex">
                <span id="cart-quantity">
                    0
                </span>
            </a>
            <button data-collapse-toggle="navbar-default" onClick={() => {}} type="button" className="inline-flex items-center py-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
            </button>
        </div>
    </div>
  </>
  )
}

export default Header