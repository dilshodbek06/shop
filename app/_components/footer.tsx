import Image from "next/image";

const Footer = () => {
  return (
    <div className="pb-4">
      <footer className="bg-white dark:bg-gray-900 max-w-6xl container px-3 sm:px-8">
        <div className="mx-auto w-full">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <b className="flex items-center gap-3">
                <Image
                  src="/logo.svg"
                  className=""
                  alt="FlowBite Logo"
                  width={140}
                  height={100}
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  ZD Shop
                </span>
              </b>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Pages
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">Home</li>
                  <li>Products</li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Follow us
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">Github</li>
                  <li>Discord</li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Legal
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">Privacy Policy</li>
                  <li>Terms &amp; Conditions</li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2024 ZD . All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
