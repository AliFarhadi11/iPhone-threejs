import { navLists } from "../constants";
import { appleImg, bagImg, searchImg } from "../utils";

const Navbar = () => {
  return (
    <header className="flex w-full items-center justify-between px-5 py-5 sm:px-10">
      <nav className="screen-max-width flex w-full">
        <img src={appleImg} alt="Apple" width={14} height={18} />

        <ul className="flex flex-1 justify-center gap-5 max-sm:hidden">
          {navLists.map((nav) => (
            <li
              key={nav}
              className="text-gray cursor-pointer text-sm transition-all hover:text-white"
            >
              {nav}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-7 max-sm:flex-1 max-sm:justify-end">
          <img src={searchImg} alt="search" width={18} height={18} />
          <img src={bagImg} alt="bag" width={18} height={18} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
