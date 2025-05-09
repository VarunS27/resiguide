
import { ContactForm } from '@/components/contact-form';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import { CONTACT_EMAIL, CONTACT_PHONE, COMPANY_ADDRESS, SOCIAL_LINKS, APP_NAME } from '@/lib/constants';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const encodedAddress = encodeURIComponent(COMPANY_ADDRESS);
  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="bg-background min-h-screen">
      <PageHeader
        title="Get in Touch"
        description="We're here to help with all your real estate needs. Reach out to us through any of the channels below, or use our contact form."
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: 'Contact Us' },
        ]}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2 animate-fade-in-left animation-delay-0">
            <Card className="shadow-xl rounded-lg">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-xl sm:text-2xl text-primary">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <ContactForm />
              </CardContent>
            </Card>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-1 space-y-6 md:space-y-8">
            <Card className="shadow-xl rounded-lg animate-fade-in-right animation-delay-100">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl text-primary">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-primary text-sm sm:text-base">Our Office</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">{COMPANY_ADDRESS}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-primary text-sm sm:text-base">Call Us</h4>
                    <a href={`tel:${CONTACT_PHONE}`} className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">{CONTACT_PHONE}</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-primary text-sm sm:text-base">Email Us</h4>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">{CONTACT_EMAIL}</a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl rounded-lg animate-fade-in-right animation-delay-200">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl text-primary">Connect With Us</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <p className="text-xs sm:text-sm text-muted-foreground mb-4">Follow us on social media for the latest updates and listings from {APP_NAME}.</p>
                <div className="flex space-x-2 sm:space-x-3">
                  {SOCIAL_LINKS.map(link => (
                    <Button key={link.name} variant="outline" size="icon" asChild className="hover:border-accent hover:text-accent transition-all hover:scale-110 w-9 h-9 sm:w-10 sm:h-10">
                      <Link href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                        <link.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </Link>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-xl rounded-lg animate-fade-in-right animation-delay-300">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl text-primary">Find Us Here</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                 <div className="aspect-video rounded-md overflow-hidden border border-border">
                    <iframe
                        src={googleMapsEmbedUrl}
                        width="100%"
                        height="100%"
                        style={{ border:0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Location of ${APP_NAME} office`}
                    ></iframe>
                 </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

