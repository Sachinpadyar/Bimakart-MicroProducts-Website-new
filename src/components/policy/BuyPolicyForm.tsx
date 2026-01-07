// @ts-nocheck
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

export function BuyPolicyForm() {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-card border border-gray-100">
      <h3 className="text-xl font-bold mb-2 text-gray-800">Buy Kartavya Policy</h3>
      <p className="text-sm text-gray-500 mb-6">
        Fill in the details to proceed with Kartavya Policy. Our team will contact you shortly to assist you
      </p>

      <form className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="First Name*" placeholder="" />
          <Input label="Last Name*" placeholder="" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Email*" placeholder="" />
          <Input label="Mobile Number*" placeholder="" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="w-full">
            <Select label="Number of People*" options={[{ value: "1", label: "1" }]} placeholder="Select an option" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Payment Option*</label>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentOption"
                id="myself"
                className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                defaultChecked
              />
              <label htmlFor="myself" className="text-sm text-gray-700 cursor-pointer">Myself</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentOption"
                id="customer"
                className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300"
              />
              <label htmlFor="customer" className="text-sm text-gray-700 cursor-pointer">Customer</label>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="selfPurchase"
            className="w-4 h-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500"
          />
          <label htmlFor="selfPurchase" className="text-sm text-gray-600 cursor-pointer">
            I am purchasing this policy for myself
          </label>
        </div>

        {/* Person 1 Details Card */}
        <div className="border border-gray-200 rounded-lg overflow-hidden mt-4">
          <div className="bg-[#FD7E14] px-4 py-2">
            <h4 className="text-white font-medium text-center">Person 1 Details</h4>
          </div>
          <div className="p-4 space-y-4 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Age*" placeholder="" />
              <Input label="Vehicle Number*" placeholder="" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Accident Date*" placeholder="" />
              <Input label="Hospital Name*" placeholder="" />
            </div>
          </div>
        </div>

        <button className="w-full bg-[#FD7E14] hover:bg-orange-600 text-white py-3 rounded-md font-semibold text-base transition-colors duration-200 mt-2">
          Submit
        </button>
      </form>
    </div>
  );
}
