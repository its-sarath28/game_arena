import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Routers from "@/routers/Routers";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="h-[80vh]">
        <Routers />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
