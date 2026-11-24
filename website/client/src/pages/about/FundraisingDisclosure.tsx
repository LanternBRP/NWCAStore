/**
 * Fundraising Disclosure page
 * Design: Dark navy base, red accents, condensed display typography
 * The legacy page redirected to an annual report PDF — this page provides context and links
 */

import NavBar from "@/components/NavBar";
import { FileText, Download, ExternalLink, Phone, Mail } from "lucide-react";

const REPORTS = [
  { year: "2021–22", label: "Annual Report 2021–22", url: "https://nwcaonline.com/documents/2025/7/7/Annual_Report_2021-22.pdf" },
  { year: "2020–21", label: "Annual Report 2020–21", url: "https://nwcaonline.com" },
  { year: "2019–20", label: "Annual Report 2019–20", url: "https://nwcaonline.com" },
];

export default function FundraisingDisclosure() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <NavBar />
      <div className="pt-16" />

      {/* Hero */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ background: "radial-gradient(ellipse at 30% 50%, #17214B 0%, #0d1117 70%)" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-0.5 bg-[#C41E3A]" />
            <span className="font-condensed text-xs tracking-[0.2em] text-white uppercase">About the NWCA</span>
          </div>
          <h1 className="font-display text-6xl md:text-7xl font-black uppercase leading-none mb-4">
            FUNDRAISING<br /><span className="text-white">DISCLOSURE</span>
          </h1>
          <p className="text-white/80 text-lg max-w-xl">
            Financial transparency and annual reporting from the National Wrestling Coaches Association.
          </p>
        </div>
      </section>

      {/* Disclosure Statement */}
      <section className="py-16 max-w-4xl mx-auto px-6">
        <div className="border border-white/10 rounded-sm p-8 bg-white/2 mb-12">
          <h2 className="font-condensed text-2xl font-700 uppercase tracking-wide mb-5">Disclosure Statement</h2>
          <p className="text-white/85 leading-relaxed mb-4">
            The National Wrestling Coaches Association (NWCA) is a 501(c)(6) nonprofit organization dedicated to advancing the sport of wrestling through coaching development, advocacy, and student-athlete support.
          </p>
          <p className="text-white/85 leading-relaxed mb-4">
            In compliance with applicable state and federal laws, the NWCA provides the following fundraising disclosure information. A copy of the official registration and financial information may be obtained from the appropriate state agency at no cost by calling the toll-free number within the state.
          </p>
          <p className="text-white/85 leading-relaxed">
            Registration does not imply endorsement, approval, or recommendation by the state. For questions regarding our financial reporting, please contact us directly.
          </p>
        </div>

        {/* Annual Reports */}
        <h2 className="font-condensed text-2xl font-700 uppercase tracking-wide mb-6 flex items-center gap-3">
          <span className="w-6 h-0.5 bg-[#C41E3A]" />
          Annual Reports
        </h2>
        <div className="space-y-4 mb-12">
          {REPORTS.map((r) => (
            <a
              key={r.year}
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-5 border border-white/10 rounded-sm bg-white/2 hover:border-[#C41E3A]/40 hover:bg-[#C41E3A]/5 transition-all group"
            >
              <div className="flex items-center gap-4">
                <FileText className="w-5 h-5 text-white" />
                <div>
                  <div className="font-condensed font-700 uppercase tracking-wide group-hover:text-[#F5C842] transition-colors">{r.label}</div>
                  <div className="text-white/40 text-xs mt-0.5">PDF Document</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white/40 group-hover:text-[#F5C842] transition-colors">
                <Download className="w-4 h-4" />
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>
          ))}
        </div>

        {/* CMS Note */}
        <div className="border border-dashed border-[#C41E3A]/30 rounded-sm p-5 bg-[#C41E3A]/5 mb-12">
          <p className="text-white/80 text-sm">
            <span className="text-white font-condensed font-600 uppercase tracking-wide">CMS Integration Point:</span>{" "}
            Annual report documents will be managed and updated through the CMS. New reports can be uploaded and linked here without code changes.
          </p>
        </div>

        {/* Contact */}
        <h2 className="font-condensed text-2xl font-700 uppercase tracking-wide mb-6 flex items-center gap-3">
          <span className="w-6 h-0.5 bg-[#C41E3A]" />
          Contact
        </h2>
        <div className="flex flex-col sm:flex-row gap-6">
          <a href="tel:7176538009" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
            <Phone className="w-4 h-4 text-white" />
            <span>717-653-8009</span>
          </a>
          <a href="mailto:technology@nwca.cc" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
            <Mail className="w-4 h-4 text-white" />
            <span>technology@nwca.cc</span>
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-white/40 text-sm">
        © 2026 National Wrestling Coaches Association
      </footer>
    </div>
  );
}
