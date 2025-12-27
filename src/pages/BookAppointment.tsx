import Layout from "@/components/layout/Layout";
import { useState } from "react";
import { Calendar, User, FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const services = [
  "Industrial Electrical Works",
  "HT/LT Installation",
  "Panel Manufacturing",
  "Generators & Transformers",
  "Cable Laying & Termination",
  "Metering & Protection",
  "Industrial Lighting",
  "Maintenance Services",
  "Other",
];

const timeSlots = [
  "09:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 01:00 PM",
  "02:00 PM - 03:00 PM",
  "03:00 PM - 04:00 PM",
  "04:00 PM - 05:00 PM",
];

const appointmentSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(15, "Phone number is too long"),
  company: z.string().trim().max(100, "Company name must be less than 100 characters").optional(),
  service: z.string().min(1, "Please select a service"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time slot"),
  description: z.string().trim().max(1000, "Description must be less than 1000 characters").optional(),
});

const BookAppointment = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    date: "",
    time: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validate form data
    const result = appointmentSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast({
        title: "Validation Error",
        description: "Please check the form for errors.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('appointments')
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          company: formData.company.trim() || null,
          service: formData.service,
          preferred_date: formData.date,
          preferred_time: formData.time,
          description: formData.description.trim() || null,
        });

      if (error) throw error;

      // Send email notification (fire and forget)
      supabase.functions.invoke('send-notification', {
        body: {
          type: 'appointment',
          data: {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            company: formData.company.trim() || undefined,
            service: formData.service,
            preferred_date: formData.date,
            preferred_time: formData.time,
            description: formData.description.trim() || undefined,
          }
        }
      }).catch(err => console.error('Email notification failed:', err));
      
      toast({
        title: "Appointment Booked!",
        description: "We'll confirm your appointment shortly via phone or email.",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        date: "",
        time: "",
        description: "",
      });
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast({
        title: "Error",
        description: "Failed to book appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="section-label mb-2">Schedule a Visit</div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Book an Appointment
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Schedule a free consultation with our experts. We'll visit your site and provide a detailed quote.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-4 mb-12">
              {[
                { icon: CheckCircle, text: "Free Site Visit" },
                { icon: CheckCircle, text: "Detailed Quote" },
                { icon: CheckCircle, text: "Expert Consultation" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                  <span className="font-medium text-foreground">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="contact-card">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`form-input ${errors.name ? 'border-destructive' : ''}`}
                        placeholder="Your full name"
                      />
                      {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Your company"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`form-input ${errors.email ? 'border-destructive' : ''}`}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className={`form-input ${errors.phone ? 'border-destructive' : ''}`}
                        placeholder="+91 98765 43210"
                      />
                      {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                </div>

                {/* Service Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Service Required
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Select Service *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className={`form-input ${errors.service ? 'border-destructive' : ''}`}
                    >
                      <option value="">Choose a service</option>
                      {services.map((service, idx) => (
                        <option key={idx} value={service}>{service}</option>
                      ))}
                    </select>
                    {errors.service && <p className="text-sm text-destructive mt-1">{errors.service}</p>}
                  </div>
                </div>

                {/* Date & Time */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Preferred Date & Time
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={today}
                        required
                        className={`form-input ${errors.date ? 'border-destructive' : ''}`}
                      />
                      {errors.date && <p className="text-sm text-destructive mt-1">{errors.date}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Preferred Time *
                      </label>
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className={`form-input ${errors.time ? 'border-destructive' : ''}`}
                      >
                        <option value="">Select time slot</option>
                        {timeSlots.map((slot, idx) => (
                          <option key={idx} value={slot}>{slot}</option>
                        ))}
                      </select>
                      {errors.time && <p className="text-sm text-destructive mt-1">{errors.time}</p>}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Project Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="form-input resize-none"
                    placeholder="Tell us about your project requirements..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Booking..." : "Book Appointment"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BookAppointment;
