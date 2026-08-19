import Navbar from "@/components/Navbar";
import ScrollVideo from "@/components/ScrollVideo";
import MarqueeStrip from "@/components/MarqueeStrip";
import StatsStrip from "@/components/StatsStrip";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

export default function Home() {
  return (
    <main>
      <Cursor />
      <Navbar />
      <ScrollVideo />
      <MarqueeStrip />
      <StatsStrip />
      <Services />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
