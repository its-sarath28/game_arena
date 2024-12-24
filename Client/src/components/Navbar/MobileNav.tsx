import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Link } from "react-router-dom";

const MobileNav = () => {
  return (
    <div className=" lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button size={"icon"} variant={"ghost"}>
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent className="border-none bg-[#111111] text-white">
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-medium">Game Arena</h1>
            </div>
            <ul className="mt-10 space-y-5 ps-3 [&>*]:cursor-pointer">
              <li className="hover:text-primary text-center">Home</li>
              <li className="hover:text-primary text-center">About</li>
            </ul>
            <div className="flex flex-1 flex-col justify-end">
              <Link to="/auth/sign-in">
                <Button variant="ghost" className="px-8">
                  Log In
                </Button>
              </Link>
              <Link to="/auth/sign-up">
                <Button className="px-8">Register</Button>
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
