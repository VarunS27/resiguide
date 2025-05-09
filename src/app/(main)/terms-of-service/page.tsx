import { PageHeader } from '@/components/ui/page-header';

export default function TermsOfServicePage() {
  return (
    <div className="bg-background min-h-screen">
      <PageHeader
        title="Terms of Service"
        description={`Please read these terms carefully before using ResiGuide.`}
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: 'Terms of Service' },
        ]}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto bg-card p-8 rounded-lg shadow-lg">
          <h2>1. Agreement to Terms</h2>
          <p>
            By using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, then you do not have permission to access the service.
          </p>
          
          <h2>2. Use of Our Service</h2>
          <p>
            ResiGuide provides a platform for browsing real estate listings and connecting with agents. You agree to use our service lawfully and in accordance with these terms.
          </p>
          <p>
            You may not use our site:
          </p>
          <ul>
            <li>In any way that breaches any applicable local, national or international law or regulation.</li>
            <li>In any way that is unlawful or fraudulent, or has any unlawful or fraudulent purpose or effect.</li>
            <li>To transmit, or procure the sending of, any unsolicited or unauthorised advertising or promotional material or any other form of similar solicitation (spam).</li>
          </ul>

          <h2>3. Intellectual Property</h2>
          <p>
            The Service and its original content, features and functionality are and will remain the exclusive property of ResiGuide and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of ResiGuide.
          </p>

          <h2>4. User Content</h2>
          <p>
            If you submit content (e.g. inquiries, reviews), you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display such content in connection with the service. You are responsible for the legality, reliability, and appropriateness of the content you submit.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            In no event shall ResiGuide, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>

          <h2>6. Disclaimer</h2>
          <p>
            Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
          </p>
          <p>
            ResiGuide does not warrant that a) the Service will function uninterrupted, secure or available at any particular time or location; b) any errors or defects will be corrected; c) the Service is free of viruses or other harmful components; or d) the results of using the Service will meet your requirements.
          </p>
          
          <h2>7. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which ResiGuide operates, without regard to its conflict of law provisions.
          </p>

          <h2>8. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at contact@resiguide.com.
          </p>
          <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
