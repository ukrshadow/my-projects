import { NavLink } from "react-router-dom"
import { NAVITEMS } from "../Header/NavItems"

function Footer() {

  return (
    <footer className="py-20 border-t border-blue-gray-50 bg-[#EAE8DD] dark:bg-[#222d33]">
      <div className="container mx-auto ">
        <div className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12  py-6 text-center md:justify-between ">
          <p className="block font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased dark:text-white">
            © 2023 KinoTema
          </p>
          <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
            {NAVITEMS.map(nav => <li key={nav.text}>
              <NavLink to={nav.path} className="dark:text-white block font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased transition-colors hover:text-[#d092b2] focus:text-[#d092b2] dark:hover:text-[#d092b2]"> {nav.text}</NavLink>
            </li>
            )}
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer