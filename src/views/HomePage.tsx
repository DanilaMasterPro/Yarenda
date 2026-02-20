import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Categories } from "../components/Categories";
import { FeaturedListings } from "../components/FeaturedListings";
import { HowItWorks } from "../components/HowItWorks";
import { Benefits } from "../components/Benefits";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Categories />
        <FeaturedListings />
        <HowItWorks />
        <Benefits />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
