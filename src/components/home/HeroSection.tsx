import { Link } from "react-router-dom";
import { Phone, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground mb-6">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Government Approved Contractors</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-2">
            NIKHIL ELECTRICAL
          </h1>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            SALES & SERVICES
          </h2>

          {/* Description */}
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl">
            Your trusted partner for complete industrial electrical solutions. From HT/LT installations to panel manufacturing, we deliver excellence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Link to="/book-appointment">
              <Button variant="hero" size="lg" className="group">
                Book Appointment
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="heroOutline" size="lg">
                Our Services
              </Button>
            </Link>
          </div>

          {/* Phone */}
<div className="flex items-center gap-4">
  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
    <Phone className="w-5 h-5 text-primary-foreground" />
  </div>

  <div>
    <div className="text-sm text-primary-foreground/60">Call us anytime</div>

    <a
      href="tel:09825014775"
      className="block text-xl font-bold text-primary-foreground hover:text-primary transition-colors"
    >
      098250 14775
    </a>

    <a
      href="tel:09723533047"
      className="block text-xl font-bold text-primary-foreground hover:text-primary transition-colors"
    >
      097235 33047
    </a>
  </div>
</div>


        </div>
      </div>
    </section>
  );
};

export default HeroSection;
