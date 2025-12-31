import { Input } from "@/components/ui/Input";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { Select } from "@/components/ui/Select";

export function BuyPolicyForm() {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-card ">
      <h3 className="text-lg font-semibold mb-1">Buy Kartavya Policy</h3>
      <p className="text-sm text-gray-500 mb-6">
        Fill in the details to proceed with Kartavya Policy.
      </p>

      <form className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="First Name*" />
          <Input label="Last Name*" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Email*" />
          <Select label="Number of People*" />
        </div>

        <Select label="Type of Coverage*" />

        <RadioGroup />

        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-medium">
          Submit
        </button>
      </form>
    </div>
  );
}
