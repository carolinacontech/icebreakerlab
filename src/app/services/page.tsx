import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ServicesPage from "@/components/ServicesPage";

export const metadata: Metadata = {
  title: "Services | Icebreaker Lab",
  description: "Websites built to transmit your brand's voice — and optimized to rank on Google, dominate local search, and get cited by AI.",
};

export default function Services() {
  return (
    <main>
      <Cursor />
      <Navbar />
      <ServicesPage />
      <Footer />
    </main>
  );
}
