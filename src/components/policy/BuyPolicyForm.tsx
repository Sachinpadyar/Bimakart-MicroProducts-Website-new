// @ts-nocheck
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { DatePicker, Modal } from "antd";
import dayjs from "dayjs";
import { CheckCircle2 } from "lucide-react";

import { useState } from "react";
import { useCreatePaymentLinkMutation } from "@/api/paymentApi";

const peopleOptions = Array.from({ length: 10 }, (_, i) => ({
  value: (i + 1).toString(),
  label: (i + 1).toString(),
}));

import type { Product } from "@/types/product.types";

interface Props {
  product: Product | null;
  isLoading: boolean;
}

export function BuyPolicyForm({ product, isLoading }: Props) {
  const [createPaymentLink, { isLoading: isProcessingPayment }] = useCreatePaymentLinkMutation();
  const [numPeople, setNumPeople] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    persons: Array.from({ length: 10 }, () => ({ fieldData: {} }))
  });
  const [isSelfPurchase, setIsSelfPurchase] = useState(false);
  const [paymentOption, setPaymentOption] = useState<"myself" | "customer">("myself");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = (name: string, value: string, label: string) => {
    const fieldLabel = label.toLowerCase();

    if (fieldLabel.includes("adhar") || fieldLabel.includes("adhaar")) {
      const adhaarRegex = /^[2-9]{1}[0-9]{11}$/;
      if (!value) return "Aadhaar number is required";
      if (!adhaarRegex.test(value)) return "Invalid Aadhaar number (12 digits required)";
    }

    if (fieldLabel.includes("pan")) {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!value) return "PAN number is required";
      if (!panRegex.test(value.toUpperCase())) return "Invalid PAN number (e.g. ABCDE1234F)";
    }

    if (fieldLabel.includes("email")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) return "Invalid email address";
    }

    if (fieldLabel.includes("mobile") || fieldLabel.includes("phone")) {
      const mobileRegex = /^[6-9]\d{9}$/;
      if (value && !mobileRegex.test(value)) return "Invalid mobile number";
    }

    return "";
  };

  const handleInputChange = (field: string, value: string, personIndex?: number, fieldId?: string) => {
    if (personIndex !== undefined && fieldId) {
      setFormData(prev => {
        const newPersons = [...prev.persons];
        newPersons[personIndex] = {
          ...newPersons[personIndex],
          fieldData: {
            ...newPersons[personIndex].fieldData,
            [fieldId]: value
          }
        };
        return { ...prev, persons: newPersons };
      });

      // Clear error on change if any
      const errorKey = `person-${personIndex}-${fieldId}`;
      if (errors[errorKey]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[errorKey];
          return newErrors;
        });
      }
    } else {
      setFormData(prev => {
        const newData = { ...prev, [field]: value };

        // If self purchase is checked, sync Person 1 data
        if (isSelfPurchase && (field === "firstName" || field === "lastName" || field === "email" || field === "mobile")) {
          const newPersons = [...prev.persons];
          const person1 = { ...newPersons[0] };
          const person1FieldData = { ...person1.fieldData };

          // Map top-level fields to dynamic fields for Person 1
          product?.fields.filter(f => f.visible).forEach(f => {
            const fieldName = f.fieldId.fieldName.toLowerCase();
            const fieldId = f.fieldId._id;

            if (field === "firstName" && (fieldName.includes("first name") || fieldName === "name")) {
              person1FieldData[fieldId] = value;
            } else if (field === "lastName" && fieldName.includes("last name")) {
              person1FieldData[fieldId] = value;
            } else if (field === "email" && fieldName.includes("email")) {
              person1FieldData[fieldId] = value;
            } else if (field === "mobile" && (fieldName.includes("mobile") || fieldName.includes("phone"))) {
              person1FieldData[fieldId] = value;
            }
          });

          newPersons[0] = { ...person1, fieldData: person1FieldData };
          newData.persons = newPersons;
        }

        return newData;
      });
      if (errors[field]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    }
  };

  const handleSelfPurchaseChange = (checked: boolean) => {
    setIsSelfPurchase(checked);
    setFormData(prev => {
      const newPersons = [...prev.persons];
      const person1 = { ...newPersons[0] };
      const person1FieldData = { ...person1.fieldData };

      // Sync or clear all applicable fields to Person 1
      product?.fields.filter(f => f.visible).forEach(f => {
        const fieldName = f.fieldId.fieldName.toLowerCase();
        const fieldId = f.fieldId._id;

        if (checked) {
          if (fieldName.includes("first name") || fieldName === "name") {
            person1FieldData[fieldId] = prev.firstName;
          } else if (fieldName.includes("last name")) {
            person1FieldData[fieldId] = prev.lastName;
          } else if (fieldName.includes("email")) {
            person1FieldData[fieldId] = prev.email;
          } else if (fieldName.includes("mobile") || fieldName.includes("phone")) {
            person1FieldData[fieldId] = prev.mobile;
          } else if (fieldName === "full name") {
            person1FieldData[fieldId] = `${prev.firstName || ""} ${prev.lastName || ""}`.trim();
          }
        } else {
          // Clear only if it matches the sync criteria
          if (fieldName.includes("first name") ||
            fieldName === "name" ||
            fieldName.includes("last name") ||
            fieldName.includes("email") ||
            fieldName.includes("mobile") ||
            fieldName.includes("phone") ||
            fieldName === "full name") {
            person1FieldData[fieldId] = "";
          }
        }
      });

      newPersons[0] = { ...person1, fieldData: person1FieldData };
      return { ...prev, persons: newPersons };
    });
  };

  const handleBlur = (field: string, value: string, label: string, personIndex?: number, fieldId?: string) => {
    const error = validateField(field, value, label);
    const errorKey = personIndex !== undefined && fieldId ? `person-${personIndex}-${fieldId}` : field;

    setErrors(prev => ({
      ...prev,
      [errorKey]: error
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    // Validate static fields
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";

    const emailError = validateField("email", formData.email, "Email");
    if (emailError) newErrors.email = emailError;
    else if (!formData.email) newErrors.email = "Email is required";

    const mobileError = validateField("mobile", formData.mobile, "Mobile Number");
    if (mobileError) newErrors.mobile = mobileError;
    else if (!formData.mobile) newErrors.mobile = "Mobile number is required";

    // Validate dynamic fields for each person
    Array.from({ length: numPeople }).forEach((_, personIndex) => {
      product?.fields.filter(f => f.visible).forEach(field => {
        const { fieldId, required } = field;
        const value = formData.persons[personIndex].fieldData[fieldId._id] || "";

        if (required && !value && fieldId.dataType !== 'checkbox') {
          newErrors[`person-${personIndex}-${fieldId._id}`] = `${fieldId.fieldName} is required`;
        } else if (value) {
          const fieldError = validateField(fieldId._id, value, fieldId.fieldName);
          if (fieldError) {
            newErrors[`person-${personIndex}-${fieldId._id}`] = fieldError;
          }
        }
      });
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form Validation Passed. Preparing API Request...");

      const basePrice = product?.sellingPrice || 0;

      const totalAmount =
        paymentOption === "myself"
          ? basePrice * numPeople
          : basePrice;

      const productDescription = product?.shortDescription || "Insurance Premium";

      try {
        if (paymentOption === "myself") {
          const payload = {
            amount: totalAmount,
            phone: formData.mobile,
            description: `${productDescription} (${numPeople} person${numPeople > 1 ? "s" : ""})`,
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            callbackUrl: "https://your-frontend.com/payment/status"
          };

          console.log("Hiting Payment API (Myself):", payload);
          const response = await createPaymentLink(payload).unwrap();
          console.log("Payment API Response:", response);
          if (response.data?.paymentUrl) {
            window.location.href = response.data.paymentUrl;
          }
        } else {
          // Customer option - Send individual request for each person
          const promises = Array.from({ length: numPeople }).map(async (_, index) => {
            const pData = formData.persons[index].fieldData;

            // Helper to find value by field name keywords
            const findValue = (keywords: string[]) => {
              const field = product?.fields.find(f =>
                keywords.some(kw => f.fieldId.fieldName.toLowerCase().includes(kw))
              );
              return field ? pData[field.fieldId._id] : "";
            };

            const personFirstName = findValue(["first name", "name"]);
            const personLastName = findValue(["last name"]);
            const personName = `${personFirstName} ${personLastName}`.trim() || `Person ${index + 1}`;
            const personEmail = findValue(["email"]) || formData.email;
            const personPhone = findValue(["mobile", "phone"]) || formData.mobile;

            const payload = {
              amount: sellingPrice,
              phone: personPhone,
              description: `${productDescription} - ${personName}`,
              name: personName,
              email: personEmail,
              callbackUrl: "https://your-frontend.com/payment/status"
            };

            console.log(`Hiting Payment API (Customer - Person ${index + 1}):`, payload);
            const response = await createPaymentLink(payload).unwrap();
            console.log(`Payment API Response (Person ${index + 1}):`, response);
            return response;
          });

          await Promise.all(promises);
        }

        // Add 2 second artificial delay to show loading state as requested
        await new Promise(resolve => setTimeout(resolve, 2000));

        setShowSuccessModal(true);
      } catch (err) {
        console.error("Payment API Error:", err);
        alert("Failed to create payment link. Please check console.");
      }
    } else {
      console.log("Form has errors", newErrors);
      // Find the first error and scroll to it if possible
      const firstErrorKey = Object.keys(newErrors)[0];
      const element = document.getElementsByName(firstErrorKey)[0];
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (isLoading) {
    return <div className="bg-white rounded-xl p-6 shadow-card border border-gray-100 text-center">Loading form...</div>;
  }

  // Helper to render dynamic fields
  const renderField = (field: any, personIndex: number) => {
    const { fieldId, required } = field;
    const { fieldName, dataType, options, _id } = fieldId;
    const label = `${fieldName}${required ? '*' : ''}`;
    const errorKey = `person-${personIndex}-${_id}`;
    const value = formData.persons[personIndex].fieldData[_id] || "";

    if (dataType === 'dropdown') {
      const selectOptions = options.map((opt: string) => ({ value: opt, label: opt }));
      return (
        <div key={_id} className="w-full">
          <Select
            label={label}
            options={selectOptions}
            value={value}
            onChange={(e) => handleInputChange(_id, e.target.value, personIndex, _id)}
            onBlur={(e) => handleBlur(_id, e.target.value, fieldName, personIndex, _id)}
            placeholder={`Select ${fieldName}`}
            error={errors[errorKey]}
            name={errorKey}
          />
        </div>
      );
    }

    if (dataType === 'radio') {
      return (
        <div key={_id} className="space-y-1">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          <div className="flex flex-wrap gap-4">
            {options.map((opt: string) => (
              <div key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`${personIndex}-${_id}`}
                  id={`${personIndex}-${_id}-${opt}`}
                  checked={value === opt}
                  onChange={() => handleInputChange(_id, opt, personIndex, _id)}
                  className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                />
                <label htmlFor={`${personIndex}-${_id}-${opt}`} className="text-sm text-gray-700 cursor-pointer">{opt}</label>
              </div>
            ))}
          </div>
          {errors[errorKey] && <p className="text-[10px] text-red-500">{errors[errorKey]}</p>}
        </div>
      );
    }

    if (dataType === 'checkbox') {
      return (
        <div key={_id} className="w-full">
          <div className="flex items-center gap-2 mt-6">
            <input
              type="checkbox"
              id={`${personIndex}-${_id}`}
              name={errorKey}
              checked={!!value}
              onChange={(e) => handleInputChange(_id, e.target.checked ? "true" : "", personIndex, _id)}
              className="w-4 h-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500"
            />
            <label htmlFor={`${personIndex}-${_id}`} className="text-sm font-medium text-gray-700 cursor-pointer">{label}</label>
          </div>
          {errors[errorKey] && <p className="text-[10px] text-red-500 mt-1">{errors[errorKey]}</p>}
        </div>
      );
    }

    // Calendar/Date field
    if (dataType === 'calendar' || dataType === 'date') {
      return (
        <div key={_id} className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
          <DatePicker
            placeholder={`Select ${fieldName}`}
            value={value ? dayjs(value) : null}
            onChange={(date) => {
              const dateValue = date ? date.toISOString() : "";
              handleInputChange(_id, dateValue, personIndex, _id);
            }}
            onBlur={() => handleBlur(_id, value, fieldName, personIndex, _id)}
            style={{ width: '100%', height: '42px' }}
            className={`${errors[errorKey] ? 'border-red-500' : ''}`}
            format="DD/MM/YYYY"
          />
          {errors[errorKey] && <p className="text-[10px] text-red-500 mt-1">{errors[errorKey]}</p>}
        </div>
      );
    }

    // Default text/number/etc
    return (
      <Input
        key={_id}
        label={label}
        placeholder={`Enter ${fieldName}`}
        value={value}
        onChange={(e) => handleInputChange(_id, e.target.value, personIndex, _id)}
        onBlur={(e) => handleBlur(_id, e.target.value, fieldName, personIndex, _id)}
        error={errors[errorKey]}
        name={errorKey}
      />
    );
  };

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-card border border-gray-100">
      <h3 className="text-xl font-bold mb-2 text-gray-800">Buy {product?.name || "Kartavya Policy"}</h3>
      <p className="text-sm text-gray-500 mb-6">
        Fill in the details to proceed with {product?.name || "Kartavya Policy"}. Our team will contact you shortly to assist you
      </p>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="First Name*"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            onBlur={(e) => handleBlur("firstName", e.target.value, "First Name")}
            error={errors.firstName}
          />
          <Input
            label="Last Name*"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            onBlur={(e) => handleBlur("lastName", e.target.value, "Last Name")}
            error={errors.lastName}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Email*"
            placeholder="Enter email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            onBlur={(e) => handleBlur("email", e.target.value, "Email")}
            error={errors.email}
          />
          <Input
            label="Mobile Number*"
            placeholder="Enter mobile number"
            value={formData.mobile}
            onChange={(e) => handleInputChange("mobile", e.target.value)}
            onBlur={(e) => handleBlur("mobile", e.target.value, "Mobile Number")}
            error={errors.mobile}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="w-full">
            <Select
              label="Number of People*"
              options={peopleOptions}
              value={numPeople.toString()}
              onChange={(e) => setNumPeople(Number(e.target.value))}
              placeholder="Select number of people"
            />
          </div>
        </div>

        {/* Scrollable Container for Person Details */}

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="selfPurchase"
            checked={isSelfPurchase}
            onChange={(e) => handleSelfPurchaseChange(e.target.checked)}
            className="w-4 h-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500"
          />
          <label htmlFor="selfPurchase" className="text-sm text-gray-600 cursor-pointer">
            I am purchasing this policy for myself
          </label>
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
                checked={paymentOption === "myself"}
                onChange={() => setPaymentOption("myself")}
              />
              <label htmlFor="myself" className="text-sm text-gray-700 cursor-pointer">Myself</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentOption"
                id="customer"
                className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                checked={paymentOption === "customer"}
                onChange={() => setPaymentOption("customer")}
              />
              <label htmlFor="customer" className="text-sm text-gray-700 cursor-pointer">Customer</label>
            </div>
          </div>
        </div>

        <div className={`space-y-4 ${numPeople > 1 ? 'max-h-[300px] overflow-y-auto pr-2 custom-scrollbar' : ''}`}>
          {Array.from({ length: numPeople }).map((_, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-[#FD7E14] px-4 py-2">
                <h4 className="text-white font-medium text-center">Person {index + 1} Details</h4>
              </div>
              <div className="p-4 bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* <Input label="Age*" placeholder="" />
                   <Input label="Vehicle Number*" placeholder="" />
                   <Input label="Accident Date*" placeholder="" />
                   <Input label="Hospital Name*" placeholder="" /> */}
                  {product?.fields.filter(f => f.visible).map(field => renderField(field, index))}
                </div>
              </div>
            </div>
          ))}
        </div>




        <button
          disabled={isProcessingPayment}
          className="w-full bg-[#FD7E14] hover:bg-orange-600 disabled:bg-gray-400 text-white py-3 rounded-md font-semibold text-base transition-colors duration-200 mt-2"
        >
          {isProcessingPayment ? "Processing..." : "Submit"}
        </button>
      </form >

      <Modal
        open={showSuccessModal}
        onCancel={() => setShowSuccessModal(false)}
        footer={null}
        centered
        closable={false}
        width={400}
      >
        <div className="py-6 text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <CheckCircle2 size={40} />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900">Request Sent Successfully!</h3>
            <p className="text-gray-600">
              {paymentOption === "myself" ? (
                <>Your payment request has been sent to <span className="font-semibold text-gray-900">{formData.mobile}</span>.</>
              ) : (
                <>Payment requests have been sent to <span className="font-semibold text-gray-900">{numPeople} persons</span> according to their provided mobile numbers.</>
              )}
              <br />
              The link is valid for <span className="font-semibold text-gray-900">24 hours</span>.
              Please confirm the payment to proceed.
            </p>
          </div>
          <button
            onClick={() => setShowSuccessModal(false)}
            className="w-full bg-[#FD7E14] hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Okay
          </button>
        </div>
      </Modal>
    </div >

  );
}
