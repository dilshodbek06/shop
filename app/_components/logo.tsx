import Image from "next/image";

import logo from "@/public/logo.svg";

const Logo = () => {
  return <Image src={logo} alt="Logo" width={140} height={140} />;
};

export default Logo;
