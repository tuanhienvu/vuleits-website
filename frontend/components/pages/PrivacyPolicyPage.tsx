'use client';

// --- Sections: Policy header | Numbered policy sections ---

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4">
      {/* ==================== PRIVACY HEADER ==================== */}
      <section className="glass p-8 md:p-12 rounded-3xl mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy</h1>
        <p className="text-white/80 text-sm">Last updated: December 13, 2025</p>
      </section>

      {/* ==================== PRIVACY BODY ==================== */}
      <section className="glass p-8 md:p-12 rounded-3xl space-y-6 mb-12">
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">1. Introduction</h2>
          <p className="text-white/70">
            Welcome to VULE ITS Website. We are committed to protecting your privacy and ensuring you have a positive experience on our website. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-3">2. Information We Collect</h2>
          <p className="text-white/70 mb-2">We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
          <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
            <li><strong>Personal Data:</strong> Name, email address, phone number, and other contact information</li>
            <li><strong>Device Information:</strong> Browser type, IP address, and operating system</li>
            <li><strong>Usage Data:</strong> Pages visited, time spent on pages, and links clicked</li>
            <li><strong>Cookies:</strong> Small files stored on your device to enhance user experience</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-3">3. How We Use Your Information</h2>
          <p className="text-white/70 mb-2">We use the information we collect in the following ways:</p>
          <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
            <li>To operate and maintain our website</li>
            <li>To improve and optimize our website experience</li>
            <li>To respond to your inquiries and provide customer support</li>
            <li>To send periodic emails regarding updates and offers</li>
            <li>To analyze trends and gather demographic information</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-3">4. Data Security</h2>
          <p className="text-white/70">
            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is completely secure.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-3">5. Third-Party Services</h2>
          <p className="text-white/70">
            Our website may contain links to third-party websites. We are not responsible for the privacy practices of other websites. We encourage you to review the privacy policies of any third-party services before providing personal information.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-3">6. Your Rights</h2>
          <p className="text-white/70 mb-2">Depending on your location, you may have the following rights:</p>
          <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
            <li>Right to access your personal data</li>
            <li>Right to correct inaccurate data</li>
            <li>Right to request deletion of your data</li>
            <li>Right to opt-out of marketing communications</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-3">7. Contact Us</h2>
          <p className="text-white/70">
            If you have questions about this Privacy Policy or our privacy practices, please contact us at:
          </p>
          <p className="text-white mt-2">
            <span className="font-semibold">Email:</span> privacy@vuleits.com<br/>
            <span className="font-semibold">Address:</span> 123 Design Street, Creative District, CD 12345
          </p>
        </div>
      </section>
    </div>
  );
}
