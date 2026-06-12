import Navbar from "@/components/Navbar";
import ScrollVideo from "@/components/ScrollVideo";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <main>
      <Navbar />
      <ScrollVideo />
      <Services />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
      <ChatWidget />
    </main>
  );
}
