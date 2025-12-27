import { Link } from "react-router-dom";
import { Phone, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="cta-section text-primary-foreground">
      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="badge-primary bg-primary/20 text-primary-foreground border-primary-foreground/20 mb-4 inline-flex">
            <span className="w-2 h-2 bg-primary-foreground rounded-full"></span>
            Certified
          </div>
          <h2 className="text-lg font-semibold text-primary-foreground/80 mb-2">Government Approved</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h3>
          <p className="text-primary-foreground/70 mb-8">
            Get in touch with us today for a free consultation and quote.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/book-appointment">
              <Button variant="hero" size="lg">
                Book Appointment
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="heroOutline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-primary-foreground/10 pt-12">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm text-primary-foreground/60">Call Us</div>
                <a href="tel:09825014775" className="font-semibold hover:text-primary transition-colors">
                  098250 14775
                </a>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm text-primary-foreground/60">Contact Person</div>
                <div className="font-semibold">Rajesh Patel / Amit Chaudhari</div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm text-primary-foreground/60">Working Hours</div>
                <div className="font-semibold">Mon - Sat: 9 AM - 5 PM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
