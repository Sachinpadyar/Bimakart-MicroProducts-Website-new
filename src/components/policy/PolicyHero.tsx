import { BuyPolicyForm } from "@/components/policy/BuyPolicyForm";
import { PolicyInfo } from "@/components/policy/PolicyInfo";

export function PolicyHero() {
  return (
    <section className="Container SectionPaddingBottom">
      <div
        className="BackgroundColorCard rounded-xl shadow-card
          p-4 sm:p-6 lg:p-8
          grid grid-cols-1 lg:grid-cols-2
          gap-6 lg:gap-8"
      >
        <PolicyInfo />
        <BuyPolicyForm />
      </div>
    </section>
  );
}
