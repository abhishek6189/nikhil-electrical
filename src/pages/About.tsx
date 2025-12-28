import Layout from "@/components/layout/Layout";
import { Shield, Users, Award, Target, CheckCircle } from "lucide-react";
import panelImage from "@/assets/panel-image.jpg";

const milestones = [
  { year: "2008", event: "Company Founded" },
  { year: "2012", event: "Government Contractor License" },
  { year: "2015", event: "100+ Projects Milestone" },
  { year: "2018", event: "Panel Manufacturing Unit" },
  { year: "2023", event: "500+ Projects Completed" },
];

const values = [
  {
    icon: Shield,
    title: "Safety First",
    description: "We prioritize safety in every project, ensuring compliance with all electrical safety standards.",
  },
  {
    icon: Award,
    title: "Quality Excellence",
    description: "Using only premium materials and following best practices for lasting installations.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description: "Building long-term relationships through exceptional service and support.",
  },
  {
    icon: Target,
    title: "Precision",
    description: "Meticulous attention to detail in every project we undertake.",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="section-label mb-2">About Us</div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nikhil Electrical Sales & Services
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Government approved electrical contractors serving industries across Gujarat since 2003.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Nikhil Electrical Sales & Services was founded in 2003 with a vision to provide reliable and quality electrical solutions to the industrial sector in Gujarat.
              </p>
              <p className="text-muted-foreground mb-4">
                Over the years, we have grown from a small electrical contracting firm to a comprehensive electrical solutions provider, serving over 100 satisfied clients across various industries.
              </p>
              <p className="text-muted-foreground mb-6">
                Today, we are proud to be a government-approved contractor with a team of skilled professionals dedicated to delivering excellence in every project.
              </p>
              
              <div className="flex flex-wrap gap-4">
                {["20+ Years Experience", "500+ Projects", "100+ Clients"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="font-medium text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <img
                src={panelImage}
                alt="Our Work"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="section-label mb-2">Our Values</div>
            <h2 className="text-3xl font-bold text-foreground">What Drives Us</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="service-card text-center">
                <div className="service-icon mx-auto mb-4">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="section-label mb-2">Our Journey</div>
            <h2 className="text-3xl font-bold text-foreground">Company Milestones</h2>
          </div>
          
          <div className="max-w-2xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-4 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {milestone.year}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2" />
                  )}
                </div>
                <div className="pt-3">
                  <h4 className="font-semibold text-foreground">{milestone.event}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
