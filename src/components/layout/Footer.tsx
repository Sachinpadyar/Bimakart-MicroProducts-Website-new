import { Mail, MapPin, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import "./HeaderFooter.css"
export function Footer() {
  return (
    <footer className="bg-[#1c1f26] text-gray-300" id="Footer">
      <div>
        <div className="FooterRedShape">
          <img src="/Images/FooterRedShape.png" alt="" />
        </div>
        <div className="FooterBlackShape">
          <img src="/Images/BlackFooterGradient.png" alt="" />
        </div>
      </div>
      <div className="Container" id="FooterContent">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand + Hours */}
          <div className="col-span-4">
            <div className="mb-4">
              <img src="/logo.png" alt="Bimakart" className="h-10 w-auto mb-2" />
              <p className="text-gray-400 leading-relaxed">
                "Insure Today, Drive Safe Tomorrow." – Bimakart Center
              </p>
            </div>

            <div className="mt-6">
              <p className="text-white font-semibold mb-2">OPENING HOURS</p>

              <div className="space-y-2 text-gray-400">
                <div className="flex justify-between border-b border-gray-700 pb-1">
                  <span>Mon - Fri</span>
                  <span>10AM - 7PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10AM - 5PM</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-white font-semibold mb-2">Social Media</p>

              <div className="flex items-center gap-3">
                <div
                  className="
                    w-8 h-8
                    rounded
                  bg-[#2a2e36]
                    flex items-center justify-center
                  text-white
                "
                >
                  <FaWhatsapp size={18} />
                </div>
              </div>
            </div>
          </div>

          {/* Insurance Products */}
          <div className="col-span-2">
            <p className="text-white font-semibold mb-4">Insurance Products</p>
            <ul className="space-y-2 text-gray-400">
              <li>Car Insurance</li>
              <li>Bike Insurance</li>
              <li>Health Insurance</li>
              <li>Life Insurance</li>
              <li>Commercial Insurance</li>
            </ul>
          </div>

          {/* About Bimakart */}
          <div className="col-span-2">
            <p className="text-white font-semibold mb-4">About Bimakart</p>
            <ul className="space-y-2 text-gray-400">
              <li>Contact</li>
              <li>Privacy &amp; Policy</li>
              <li>Refund &amp; Cancellation</li>
              <li>Terms &amp; Conditions</li>
              <li>Testimonial</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-4">
            <p className="text-white font-semibold mb-4">Contact Info</p>

            <ul className="space-y-3 text-gray-400 leading-relaxed">
              {/* Phone */}
              <li className="flex items-center gap-3">
                <Phone size={14} className="mt-0.5" />
                <a href="tel:+917770007179">+91 7770007179</a>
              </li>

              {/* Email */}
              <li className="flex items-center gap-3">
                <Mail size={16} className="mt-1" />
                <a href="mailto:support@bimakart.in">support@bimakart.in</a>
              </li>

              {/* Address */}
              <li className="flex items-start gap-3">
                <MapPin size={20} className="mt-1" />
                <span>
                  1st Floor, Suman Education Society Campus,
                  <br />
                  Near General Karipappa Bridge, Moghdoot,
                  <br />
                  Rajendra Nagar, Borivali, Mumbai, Maharashtra 400066
                </span>
              </li>

              {/* Company info (no icon needed) */}
              <li>Incio Fintech Pvt. Ltd.</li>
              <li>CIN No. U82990MH2023PTC412314</li>
              <li>GSTIN No. 27AAHCS5688D1ZI</li>
              <li>IRDAI Registration No: CA018</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
