import HomeBlog from "@/components/Blogs/HomeBlog";
import Footer from "@/components/Home/Footer";
import HomeMain from "@/components/Home/HomeMain";

export default function Home() {
  return (
    <div>
      <HomeMain />
      <HomeBlog />
      <Footer />
    </div>
  );
}
