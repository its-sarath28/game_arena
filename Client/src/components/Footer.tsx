import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <div className="h-[10vh] flex items-center justify-center bg-[#eaeaea]">
      <p className="flex items-center justify-center">
        Made with{" "}
        <Heart className="mx-[5px] w-4 h-4 text-red-600 fill-red-600" /> by the
        developer
      </p>
    </div>
  );
};

export default Footer;
