'use client';

// --- Sections: Terms header | Numbered terms sections ---

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4">
      {/* ==================== TERMS HEADER ==================== */}
      <section className="glass p-8 md:p-12 rounded-3xl mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms</h1>
        <p className="text-white/80 text-sm">Last updated: December 13, 2025</p>
      </section>

      {/* ==================== TERMS BODY ==================== */}
      <section className="glass p-8 md:p-12 rounded-3xl space-y-6 mb-12">
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">1. Agreement to Terms</h2>
          <p className="text-white/70">
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-3">2. Use License</h2>
          <p className="text-white/70 mb-2">Permission is granted to temporarily download one copy of the materials (information or software) on VULE ITS Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
          <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
            <li>Modifying or copying the materials</li>
            <li>Using the materials for any commercial purpose or for any public display</li>
            <li>Attempting to decompile or reverse engineer any software contained on the website</li>
            <li>Removing any copyright or other proprietary notations from the materials</li>
            <li>Transferring the materials to another person or &quot;mirroring&quot; the materials on any other server</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-3">3. Disclaimer</h2>
          <p className="text-white/70">
            The materials on VULE ITS Website are provided on an &apos;as is&apos; basis. VULE ITS makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-3">4. Limitations</h2>
          <p className="text-white/70">
            In no event shall VULE ITS or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on VULE ITS Website.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-3">5. Accuracy of Materials</h2>
          <p className="text-white/70">
            The materials appearing on VULE ITS Website could include technical, typographical, or photographic errors. VULE ITS does not warrant that any of the materials on the website are accurate, complete, or current. VULE ITS may make changes to the materials contained on the website at any time without notice.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-3">6. Links</h2>
          <p className="text-white/70">
            VULE ITS has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by VULE ITS of the site. Use of any such linked website is at the user&apos;s own risk.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-3">7. Modifications</h2>
          <p className="text-white/70">
            VULE ITS may revise these terms of service for the website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-3">8. Governing Law</h2>
          <p className="text-white/70">
            These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction where VULE ITS is located, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-3">9. Contact Information</h2>
          <p className="text-white/70">
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <p className="text-white mt-2">
            <span className="font-semibold">Email:</span> legal@vuleits.com<br/>
            <span className="font-semibold">Address:</span> 123 Design Street, Creative District, CD 12345
          </p>
        </div>
      </section>
    </div>
  );
}
