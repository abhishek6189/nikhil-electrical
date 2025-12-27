import { Link } from "react-router-dom";
import { Zap, Building2, PanelTop, Power } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Building2,
    title: "Industrial Electrical Works",
    description: "Complete electrical solutions for factories and industrial units.",
  },
  {
    icon: Zap,
    title: "HT/LT Installation",
    description: "High Tension and Low Tension installations with safety compliance.",
  },
  {
    icon: PanelTop,
    title: "Panel Manufacturing",
    description: "Custom electrical panels including control panels and MCC panels.",
  },
  {
    icon: Power,
    title: "Generators & Transformers",
    description: "Supply and installation of AC generators and transformers.",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="section-label mb-2">What We Offer</div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Expert Services
          </h2>
          <p className="text-muted-foreground">
            Comprehensive electrical solutions for industries with quality assurance and timely delivery.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/services">
            <Button variant="default" size="lg">
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
