import React, { useEffect, useState } from 'react'
import hackettLogo from '../images/logos/hackett-logo.svg'
import clothingHeader from '../images/clothing-header.jpg'
import fetchAllCategories from '../actions/fetch-all-categories.tsx'
import fetchSubcategoriesById from '../actions/fetch-subcategories-by-id.tsx'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCategory } from '../state/category/categorySlice.ts'

function Header() {
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState({})

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const toggleMenu = () => {
    const navLinks = document.querySelector('.nav-links')
    const navUtilityIcons = document.querySelector('.utility-menu-icons')
    navLinks && navLinks.classList.toggle("top-[4.5rem]")
    navUtilityIcons && navUtilityIcons.classList.toggle("hidden")
  }

  const toggleSubMenu = (event: React.MouseEvent<HTMLLIElement>) => {
    // Prevent default behavior if any
    event.stopPropagation();

    // Get the clicked li element
    const clickedLi = event.currentTarget;
    console.log(clickedLi);
    

    // Find all first-level li elements within the same parent (ul)
    const allLi = clickedLi.parentElement.children;

    // Loop through all li elements
    Array.from(allLi).forEach(li => {
        // Get the dropdown of the current li
        const dropdownMenu = li.querySelector('.dropdown-menu');
        const categoryMenu = li.querySelector('.category-menu');
        console.log(dropdownMenu);
        
        // Check if the current li is the clicked one
        if (li === clickedLi) {
            // Toggle the visibility of the clicked li's dropdown
            dropdownMenu?.classList.add('hidden');
            dropdownMenu?.classList.add('opacity-0');

            dropdownMenu?.classList.add('border-t');
            categoryMenu?.classList.add('flex-row-reverse');
            categoryMenu?.classList.add('justify-between');
            categoryMenu?.classList.add('justify-end');
            categoryMenu?.classList.add('space-x-4');
            
        } else {
            // Hide the other li's dropdowns and the li elements themselves
            dropdownMenu?.classList.remove('hidden');
            dropdownMenu?.classList.remove('opacity-0');
            
            // Hide the li elements
            li.classList.remove('hidden');
        }
    });
}

const addEventListeners = () => {
    const isMobile = window.innerWidth < 1024
    const menuItems = document.querySelectorAll('nav ul > li.group')
    console.log(menuItems)
    

    menuItems.forEach(li => {
        li.removeEventListener('click', toggleSubMenu) // Ensure no duplicate listeners
        if (isMobile) li.addEventListener('click', toggleSubMenu)
    })
}

// Ensure event listeners are updated when resizing the screen
window.addEventListener('DOMContentLoaded', addEventListeners)
window.addEventListener('resize', addEventListeners)

  
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

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchAllCategories()
      setCategories(data)
    }
    getCategories()

    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;
      const menuItems = document.querySelectorAll('nav ul > li.group');

      menuItems.forEach(li => {
          li.removeEventListener('click', toggleSubMenu as EventListener);
          if (isMobile) {
              li.addEventListener('click', toggleSubMenu as EventListener);
          }
      });
  };

  handleResize(); // Run once on mount
  window.addEventListener('resize', handleResize);

  return () => {
      window.removeEventListener('resize', handleResize);
  };
  }, [])

  return (
    <>
    <div className="flex justify-between items-center h-[4.5rem] px-8 bg-white">
        <a href="/">
            <img src={hackettLogo} alt="Hackett Logo" />
        </a>
        <nav className="flex h-full items-center w-full lg:w-auto lg:block z-10">
            <div className="nav-links absolute lg:static lg:min-h-fit bg-white min-h-full left-0 top-[-100%] w-full md:w-1/2 flex items-start px-5 border-[#eee]">
                <div className="absolute right-5 -top-12 cursor-pointer" onClick={toggleMenu}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fil="currentColor" className="size-7">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
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
                          <svg className="block my-auto lg:hidden text-gray-800 dark:text-white size-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
                          </svg>
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
            <button data-collapse-toggle="navbar-default" onClick={toggleMenu} type="button" className="inline-flex items-center py-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                    <path fillRule="evenodd" d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    </div>
  </>
  )
}

export default Header