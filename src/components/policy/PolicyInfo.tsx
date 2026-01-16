// @ts-nocheck
import { ShieldCheck } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Collapse } from "antd";
import { useState, useEffect } from "react";
import "./PolicyInfo.css"
import type { Product } from "@/types/product.types";

interface Props {
  product?: Product | null;
}

export function PolicyInfo({ product }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 489px)");
    const handleValueChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    handleValueChange(mediaQuery);
    mediaQuery.addEventListener("change", handleValueChange);
    return () => mediaQuery.removeEventListener("change", handleValueChange);
  }, []);

  const content = (
    <>
      {/* Paragraph 1 */}
      {/* Paragraph 1 */}
      <p className="text-sm leading-relaxed text-gray-300 mb-4 desktop-text-change">
        {product?.shortDescription}
      </p>

      {/* Paragraph 2 */}
      <p className="text-sm leading-relaxed text-gray-300 mb-6 desktop-text-change">
        {product?.detailedDescription}
      </p>
      <button className="mt-8 inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orangeHover px-4 py-2 rounded-md text-sm font-medium desktop-text-change OnlyMobile">
        <button className="mt-0.5" />
        Buy Now
      </button>
      {/* <br /> */}
      {/* Coverage heading */}
      <h4 className="text-sm font-semibold mb-3 desktop-text-change">Coverage includes:</h4>

      {/* Coverage list */}
      <ul className="space-y-2 text-sm text-gray-200">
        <li className="flex items-start gap-2 desktop-text-change">
          <ShieldCheck size={16} className="text-brand-orange mt-1" />
          Workplace Accident Protection
        </li>
        <li className="flex items-start gap-2 desktop-text-change">
          <ShieldCheck size={16} className="text-brand-orange mt-1" />
          Medical &amp; Hospitalization Expenses
        </li>
        <li className="flex items-start gap-2 desktop-text-change">
          <ShieldCheck size={16} className="text-brand-orange mt-1" />
          Disability &amp; Death Benefits
        </li>
        <li className="flex items-start gap-2 desktop-text-change">
          <ShieldCheck size={16} className="text-brand-orange mt-1" />
          Covers Employees &amp; Workers Together
        </li>
      </ul>

      <div className="OnlyMobileImage">
        <img src="/AccordionMobileImage.jpg" alt="" />
      </div>


      {/* WhatsApp button */}
      <button className=" inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orangeHover px-4 py-2 rounded-md text-sm font-medium desktop-text-change WhatsappBtn">
        <FaWhatsapp size={18} className="mt-0.5" />
        Chat on Whatsapp
      </button>
    </>
  );

  return (
    <div className=" ContentColorChange">
      {isMobile ? (
        <div className="mobile-policy-accordion">
          <Collapse
            defaultActiveKey={["1"]}
            ghost
            expandIconPosition="end"
            className="custom-policy-collapse"
            items={[
              {
                key: "1",
                label: (
                  <h2 className="text-[20px] font-semibold text-black m-0">
                    {product?.name || "Kartavya Policy"}
                  </h2>
                ),
                children: content,
              },
            ]}
          />
        </div>
      ) : (
        <div className="text-white">
          {/* Title */}
          <h2 className="text-[26px] font-semibold mb-4">{product?.name || "Kartavya Policy"}</h2>
          {content}
        </div>
      )}
    </div>
  );
}
