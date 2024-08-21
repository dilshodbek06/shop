import Image from "next/image";
import logo from "@/public/logo.svg";

const Logo = () => {
  return <Image src={logo} alt="logo" width={130} height={100} />;
};

export default Logo;
