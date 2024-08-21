import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Banner = () => {
  return (
    <div className="max-w-6xl mx-auto px-14">
      <Carousel className="sm:min-h-[230px] ">
        <CarouselContent>
          <CarouselItem>
            <div className="bg-gradient-to-r from-blue-700 to-[#B06AB3] font-sans px-2 py-4">
              <div className="container mx-auto flex flex-col justify-center items-center text-center">
                <h2 className="text-white sm:text-4xl text-3xl font-bold mb-4">
                  Discover Our New Collection
                </h2>
                <p className="text-white text-base text-center mb-8">
                  Elevate your style with our latest arrivals. Shop now and
                  enjoy exclusive discounts!
                </p>

                <button
                  type="button"
                  className="bg-white text-sm text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-slate-100"
                >
                  Shop now
                </button>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="bg-gradient-to-r from-green-700 to-[#B06AB3] font-sans px-2 py-4">
              <div className="container mx-auto flex flex-col justify-center items-center text-center">
                <h2 className="text-white sm:text-4xl text-3xl font-bold mb-4">
                  Discover Our New Collection
                </h2>
                <p className="text-white text-base text-center mb-8">
                  Elevate your style with our latest arrivals. Shop now and
                  enjoy exclusive discounts!
                </p>

                <button
                  type="button"
                  className="bg-white text-sm text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-slate-100"
                >
                  Shop now
                </button>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="bg-gradient-to-r from-orange-700 to-[#B06AB3] font-sans px-2 py-4">
              <div className="container mx-auto flex flex-col justify-center items-center text-center">
                <h2 className="text-white sm:text-4xl text-3xl font-bold mb-4">
                  Discover Our New Collection
                </h2>
                <p className="text-white text-base text-center mb-8">
                  Elevate your style with our latest arrivals. Shop now and
                  enjoy exclusive discounts!
                </p>

                <button
                  type="button"
                  className="bg-white text-sm text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-slate-100"
                >
                  Shop now
                </button>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Banner;
