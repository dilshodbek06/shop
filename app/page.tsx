import AdminFloatButton from "./_components/admin-float-button";
import Banner from "./_components/banner";
import Benefits from "./_components/benefits";
import CategoriesCircle from "./_components/categories-circle";
import Footer from "./_components/footer";
import Header from "./_components/header";
import NewProducts from "./_components/new-products";

export default function HomePage() {
  return (
    <div>
      {/* Header */}
      <Header />
      {/* Banner */}
      <div className="mt-3">
        <Banner />
      </div>
      {/* Categories */}
      <div className="mt-10">
        <CategoriesCircle />
      </div>
      {/* Benefits */}
      <div className="mt-10">
        <Benefits />
      </div>
      {/* New products */}
      <div className="mt-5">
        <NewProducts />
      </div>
      {/* Footer */}
      <hr className="my-4" />
      <AdminFloatButton />
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}
