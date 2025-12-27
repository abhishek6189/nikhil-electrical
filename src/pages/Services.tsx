import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { 
  Zap, Building2, PanelTop, Power, Wrench, Cable, 
  Lightbulb, Gauge, Shield, Cog 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const allServices = [
  {
    icon: Building2,
    title: "Industrial Electrical Works",
    description: "Complete electrical solutions for factories and industrial units including wiring, power distribution, and automation systems.",
    features: ["Factory Wiring", "Power Distribution", "Automation Systems", "Maintenance"],
  },
  {
    icon: Zap,
    title: "HT/LT Installation",
    description: "High Tension and Low Tension installations with full safety compliance and government approvals.",
    features: ["HT Panels", "LT Panels", "Switchgear", "Protection Systems"],
  },
  {
    icon: PanelTop,
    title: "Panel Manufacturing",
    description: "Custom electrical panels including control panels, MCC panels, PCC panels, and APFC panels.",
    features: ["Control Panels", "MCC Panels", "PCC Panels", "APFC Panels"],
  },
  {
    icon: Power,
    title: "Generators & Transformers",
    description: "Supply, installation, and maintenance of AC generators and power transformers of all capacities.",
    features: ["AC Generators", "Power Transformers", "Installation", "AMC Services"],
  },
  {
    icon: Cable,
    title: "Cable Laying & Termination",
    description: "Professional cable laying services including HT/LT cable termination and jointing works.",
    features: ["HT Cable Laying", "LT Cable Laying", "Termination", "Jointing"],
  },
  {
    icon: Gauge,
    title: "Metering & Protection",
    description: "Installation of energy meters, protection relays, and monitoring systems for industrial applications.",
    features: ["Energy Meters", "Protection Relays", "SCADA Systems", "Monitoring"],
  },
  {
    icon: Lightbulb,
    title: "Industrial Lighting",
    description: "Complete industrial lighting solutions including LED retrofitting and energy-efficient systems.",
    features: ["LED Lighting", "Flood Lights", "Street Lights", "Emergency Lighting"],
  },
  {
    icon: Wrench,
    title: "Maintenance Services",
    description: "Annual maintenance contracts and breakdown services for all electrical equipment.",
    features: ["AMC Services", "Breakdown Support", "Preventive Maintenance", "Testing"],
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="section-label mb-2">What We Offer</div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Services
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive industrial electrical solutions with quality assurance, safety compliance, and timely delivery.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {allServices.map((service, index) => (
              <div key={index} className="service-card">
                <div className="flex items-start gap-4">
                  <div className="service-icon flex-shrink-0">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, idx) => (
                        <span 
                          key={idx} 
                          className="text-xs px-3 py-1 bg-secondary rounded-full text-muted-foreground"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Contact us today to discuss your specific requirements. We provide tailored solutions for every project.
          </p>
          <Link to="/book-appointment">
            <Button variant="default" size="lg">
              Book Consultation
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
