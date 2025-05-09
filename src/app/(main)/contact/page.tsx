import { ContactForm } from '@/components/contact-form';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import { CONTACT_EMAIL, CONTACT_PHONE, COMPANY_ADDRESS, SOCIAL_LINKS } from '@/lib/constants';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl rounded-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="shadow-xl rounded-lg">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 mr-3 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-primary">Our Office</h4>
                    <p className="text-sm text-muted-foreground">{COMPANY_ADDRESS}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-6 h-6 mr-3 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-primary">Call Us</h4>
                    <a href={`tel:${CONTACT_PHONE}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{CONTACT_PHONE}</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-6 h-6 mr-3 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-primary">Email Us</h4>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{CONTACT_EMAIL}</a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl rounded-lg">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Connect With Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Follow us on social media for the latest updates and listings.</p>
                <div className="flex space-x-3">
                  {SOCIAL_LINKS.map(link => (
                    <Button key={link.name} variant="outline" size="icon" asChild className="hover:border-accent hover:text-accent">
                      <Link href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                        <link.icon className="h-5 w-5" />
                      </Link>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-xl rounded-lg">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Find Us Here</CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Google Maps placeholder</p>
                 </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
