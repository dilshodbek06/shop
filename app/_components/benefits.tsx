import { BadgePercent, DollarSign, Headset, Truck } from "lucide-react";

const Benefits = () => {
  return (
    <div className="max-w-6xl container px-3 sm:px-8 gap-4 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-3">
      <div className="px-2 py-4 gap-4 flex justify-center items-center bg-gray-100 rounded-md">
        <Truck className="w-8 h-8 text-sky-600" />
        <div>
          <h2 className="font-bold">Free delivery</h2>
          <p className="text-sm">Lorem ipsum dolor sit</p>
        </div>
      </div>
      <div className="px-2 py-4 gap-4 flex justify-center items-center bg-gray-100 rounded-md">
        <DollarSign className="w-8 h-8 text-sky-600" />
        <div>
          <h2 className="font-bold">Free delivery</h2>
          <p className="text-sm">Lorem ipsum dolor sit</p>
        </div>
      </div>
      <div className="px-2 py-4 gap-4 flex justify-center items-center bg-gray-100 rounded-md">
        <BadgePercent className="w-8 h-8 text-sky-600" />
        <div>
          <h2 className="font-bold">Free delivery</h2>
          <p className="text-sm">Lorem ipsum dolor sit</p>
        </div>
      </div>
      <div className="px-2 py-4 gap-4 flex justify-center items-center bg-gray-100 rounded-md">
        <Headset className="w-8 h-8 text-sky-600" />
        <div>
          <h2 className="font-bold">Free delivery</h2>
          <p className="text-sm">Lorem ipsum dolor sit</p>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
