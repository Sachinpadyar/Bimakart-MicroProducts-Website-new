// Field definition from API
export interface FieldId {
    _id: string;
    fieldName: string;
    dataType: string;
    options: string[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

// Product field structure
export interface ProductField {
    fieldId: FieldId;
    required: boolean;
    visible: boolean;
    _id: string;
}

// Main Product interface matching API response
export interface Product {
    _id: string;
    name: string;
    policyIcon: string;
    policyIconUrl: string;
    policyFlyer: string;
    shortDescription: string;
    detailedDescription: string;
    baseProduct: string;
    sellingPrice: number;
    fields: ProductField[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

// API Response wrapper
export interface ProductsResponse {
    status: string;
    statusCode: number;
    message: string;
    data: Product[];
}
