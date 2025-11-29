import axios from 'axios';

const API_BASE_URL = 'https://backbin.colaber.in';
const ACCOUNT_TYPE_ID = '6852b4af195dd0d3c0a9a370';

const userAxios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Catalogue {
  _id: string;
  name: string;
  image: string;
  type: string;
  slug: string;
  totalProducts: number;
  maxSalePrice: number;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  images: string[];
  pricing: {
    basePrice: number;
    salePrice: number;
    discountPercentage: number;
  };
  inventory: {
    stockStatus: string;
  };
  variants?: Array<{
    _id: string;
    name: string;
    basePrice: number;
    salePrice: number;
    stock: number;
  }>;
}

export interface ProductDetail extends Product {
  description: string;
  categoryId: {
    _id: string;
    name: string;
  };
  video: string;
  tags: string[];
  variantTitle: string;
  inventory: {
    stockStatus: string;
    totalQuantity: number;
  };
}

export const getPublishedWebCatalogueByAccountTypeId = async () => {
  const response = await userAxios.get(
    '/business_website/catalogue/get_catalogue_by_account_type_id',
    {
      params: {
        accountTypeId: ACCOUNT_TYPE_ID,
      },
    }
  );
  return response.data;
};

export const getPublishedWebProductsByCatalogueId = async (params: {
  catalogId: string;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  try {
    const response = await userAxios.get(
      '/business_website/catalogue/product/get_catalogue_product_items_for_public',
      {
        params: {
          accountTypeId: ACCOUNT_TYPE_ID,
          status: 'Published',
          page: params.page || 1,
          limit: params.limit || 20,
          catalogId: params.catalogId,
          search: params.search || '',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getCatalogueProductDetailsApi = async (productSlug: string) => {
  const response = await userAxios.get(
    '/business_website/catalogue/product/get_catalogue_product_details_for_public',
    {
      params: {
        productSlug,
      },
    }
  );
  return response.data;
};
