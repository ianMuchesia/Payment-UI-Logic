// src/types.ts

export type Package ={
    id: number;
    name: string;
    durationDays: number;
}

export type Service ={
    id: number;
    name: string;
    unitPrice: number;
}

export type Item = {
    available: boolean;
    createdDate: string;
    description: string;
    durationDays: number;
    id: number;
    name: string;
    package: Package;
    packageId: number;
    price: number;
    service: Service;
    serviceId: number;
    updatedDate: string;
}


// src/types.ts

export type Error = {
    errorType: string | null;
    code: string | null;
    message: string | null;
    callBackUrl: string | null;
}

export type TypePayment = {
    amount: number;
    callBackUrl: string;
    confirmationCode: string;
    createdDate: string;
    currency: string;
    description: string | null;
    error: Error;
    merchantReference: string;
    message: string;
    paymentAccount: string;
    paymentMethod: string;
    paymentStatusDescription: string;
    status: string;
    statusCode: number;
}

// src/types.ts

export type PackageService = {
    id: number;
    packageId: number;
    serviceId: number;
    durationDays: number;
    price: number;
    name: string;
    description: string;
    createdDate: string;
    updatedDate: string;
    available: boolean;
    package: Package | null;
    service: Service | null;
}

export type ServiceBundle = {
    id: number;
    userId: number;
    packageServiceId: number;
    businessId: number | null;
    isAttachedToBusiness: boolean;
    packageService: PackageService;
    business: any | null; 
}

export type ServiceBundlesResponse = {
    data: ServiceBundle[];
    message: string;
}

export type CreateServiceBundleRequest = {
    packageServiceId: number;
    userId: number;
    businessId: string;
    id:number;
}

// src/types.ts

export type TypeBusiness = {
    businessID: string;
    name: string;
    description: string;
    address: string;
    addressDetails: string | null;
    city: string;
    country: string;
    phoneNumber: string;
    videoURL: string | null;
    email: string;
    website: string | null;
    rating: number;
    latitude: number;
    longitude: number;
    openingHours: string | null;
    businessStatus: number;
    createdDate: string;
    updatedDate: string;
    userID: number;
    categoryID: number;
    isVerified: boolean;
    businessSubCategories: any[]; 
    reviews: any[]; 
    businessHours: any[]; 
    businessAttributes: any[]; 
    businessPhotos: any[]; 
    businessTags: any[]; 
    businessProducts: any[]; 
    businessContacts: any[]; 
    menus: any[]; 
    businessPromotion: any | null; 
    childBusinesses: any | null; 
    businessBrands: any | null; 
    businessNotices: any[]; 
}


export type TypePackageServiceDetail = {
    id: number;
    packageId: number;
    serviceId: number;
    durationDays: number;
    price: number;
    name: string;
    description: string;
    createdDate: string;
    updatedDate: string;
    available: boolean;
    package: Package | null;
    service: Service | null;
  };
  
  export type TypePackageCardService = {
    id: number;
    packageCardId: number;
    packageServiceId: number;
    packageService: TypePackageServiceDetail;
  };
  
  export type TypePackageCard = {
    id: number;
    name: string;
    price: number;
    packageServices: TypePackageCardService[];
  };
  
  export type TypePackageCardResponse = {
    message: string;
    data: TypePackageCard[];
  };