import { Header } from "@/components/widgets/Header";
import { Hero } from "@/components/widgets/Hero";
import { Categories } from "@/components/widgets/Categories";
import { FeaturedListings } from "@/components/widgets/FeaturedListings";
import { HowItWorksV2 } from "@/components/widgets/HowItWorksV2";
import { Benefits } from "@/components/widgets/Benefits";
import { CTA } from "@/components/widgets/CTA";
import { Footer } from "@/components/widgets/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Categories backgroundVariant="gradient" />
        <FeaturedListings />
        <HowItWorksV2 />

        <Benefits />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
