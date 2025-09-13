import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitch from "./LanguageSwitch";
import HomeButton from "./HomeButton";
interface ContactFormProps {
  onBack: () => void;
  assessmentData?: any;
}
export default function ContactForm({
  onBack,
  assessmentData
}: ContactFormProps) {
  const {
    t
  } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    toast
  } = useToast();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const downloadContactCSV = () => {
    let assessmentScore = 'N/A';
    if (assessmentData && Object.keys(assessmentData).length > 0) {
      try {
        const answers = Object.values(assessmentData) as Array<{
          weight?: number;
        }>;
        const totalWeight = answers.reduce((sum, answer) => {
          return sum + (answer?.weight || 0);
        }, 0);
        const maxScore = Object.keys(assessmentData).length * 5;
        if (maxScore > 0) {
          const percentage = Math.round(totalWeight / maxScore * 100);
          assessmentScore = `${percentage}%`;
        }
      } catch {
        assessmentScore = 'N/A';
      }
    }
    const csvData = [['Field', 'Value'], ['Timestamp', new Date().toISOString()], ['Name', formData.name], ['Email', formData.email], ['Company', formData.company], ['Phone', formData.phone], ['Message', formData.message], ['Assessment Score', assessmentScore]];
    const csvContent = csvData.map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;'
    });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `contact-request-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Download contact data as CSV
      downloadContactCSV();
      toast({
        title: "Contact Request Saved",
        description: "Your data has been downloaded as CSV. We'll contact you within 24 hours."
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save contact data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const isFormValid = formData.name && formData.email && formData.company;
  return <section className="min-h-screen bg-background py-12 relative">
      {/* Home Button */}
      <div className="absolute top-6 left-6 z-10">
        <HomeButton />
      </div>
      
      {/* Language Switch */}
      <div className="absolute top-6 right-6 z-10">
        <LanguageSwitch />
      </div>
      
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Results
          </Button>
          
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Contact Our Privacy Experts
          </h1>
          <p className="text-muted-foreground text-lg">
            Get personalized guidance for תיקון 17 compliance
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required className="mt-2" />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required className="mt-2" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="company">Company Name *</Label>
                    <Input id="company" name="company" value={formData.company} onChange={handleInputChange} required className="mt-2" />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} className="mt-2" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell us about your privacy compliance needs or any specific questions you have about תיקון 17..." className="mt-2 min-h-[120px]" />
                </div>

                <Button type="submit" disabled={!isFormValid || isSubmitting} variant="hero" size="lg" className="w-full">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:ciso@thedayafter.co.il" className="text-primary hover:underline">info@gdpr.co.il</a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">Available upon request</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">Israel</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-subtle">
              <h3 className="text-lg font-semibold mb-3">Why Choose Our Experts?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Deep expertise in Israeli privacy regulations</li>
                <li>• Practical compliance solutions</li>
                <li>• Fast response times</li>
                <li>• Tailored recommendations</li>
                <li>• Ongoing support available</li>
              </ul>
            </Card>

            {assessmentData && <Card className="p-6 border-primary/20">
                <h3 className="text-lg font-semibold mb-3 text-primary">Assessment Summary</h3>
                <p className="text-sm text-muted-foreground">
                  We have your assessment results and will provide personalized 
                  recommendations based on your responses.
                </p>
              </Card>}
          </div>
        </div>
      </div>
    </section>;
}