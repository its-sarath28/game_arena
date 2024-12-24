import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <nav className="h-[10vh] flex w-full items-center justify-center py-3 px-[20px] bg-[#eaeaea]">
      <Link to="/" className="flex flex-1 items-center gap-2">
        <h1 className="text-lg font-medium">Game Arena</h1>
      </Link>
      <ul className="hidden items-center gap-10 lg:flex [&>*]:cursor-pointer">
        <li className="hover:text-primary">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-primary">
          <Link to="/">About</Link>
        </li>
      </ul>
      <div className="hidden flex-1 justify-end gap-3 lg:flex">
        <Link to="/auth/sign-in">
          <Button variant="ghost" className="px-8">
            Sign in
          </Button>
        </Link>
        <Link to="/auth/sign-up">
          <Button className="px-8">Sign Up</Button>
        </Link>
      </div>

      <MobileNav />
    </nav>
  );
};

export default Navbar;
