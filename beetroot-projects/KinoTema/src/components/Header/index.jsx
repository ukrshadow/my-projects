import { Link, NavLink } from 'react-router-dom';
import Searching from '../Searching';
import Toggle from '../ThemeSwitcher/index.jsx';
import { NAVITEMS } from './NavItems';
import kinotema from '../../assets/img/KinoTema.png'

const Header = () => {

    return (
        <header className='mb-20 dark:bg-[#222d33] bg-[#EAE8DD]'>
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center shadow-lg p-2 rounded-md">
                    <Link to='/'><img src={kinotema} alt="" className='w-44 mb-6 md:mb-0 dark:invert' /></Link>
                    <nav className="md:ml-auto">
                        <ul className="flex flex-between items-center "> {
                            NAVITEMS.map(nav =>
                                <li key={nav.text}>
                                    <NavLink to={nav.path} className={('px-3 text-xl font-mono hover:text-[#d092b2] dark:text-white dark:hover:text-[#d092b2] aria-[current=page]:text-[#d092b2]  dark:aria-[current=page]:text-[#d092b2]')}> {nav.text}</NavLink>
                                </li>
                            )}
                        </ul>
                    </nav>
                    <Toggle />
                    <Searching />
                </div>
            </div>
        </header>
    )
}

export default Header
