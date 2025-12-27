import { Shield, Users, Award, Clock, DollarSign, Headphones } from "lucide-react";
import panelImage from "@/assets/panel-image.jpg";

const features = [
  {
    icon: Shield,
    title: "Government Approved",
    description: "Licensed and certified electrical contractors",
  },
  {
    icon: Users,
    title: "Experienced Team",
    description: "Skilled professionals with years of expertise",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "Premium quality materials and workmanship",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "Projects completed on schedule",
  },
  {
    icon: DollarSign,
    title: "Competitive Pricing",
    description: "Best rates without compromising quality",
  },
  {
    icon: Headphones,
    title: "After Sales Support",
    description: "Dedicated maintenance and support services",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="section-label mb-2">Why Choose Us</div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trusted by Industries Across Gujarat
            </h2>
            <p className="text-muted-foreground mb-8">
              With years of experience in industrial electrical services, we have built a reputation for quality, reliability, and customer satisfaction.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src={panelImage}
              alt="Electrical Control Panel"
              className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
            />
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-xl">
              <div className="text-3xl font-bold">15+</div>
              <div className="text-sm opacity-80">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
