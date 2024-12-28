// src/hooks/useFetchData.ts
import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://npiregistry.cms.hhs.gov/api/?version=2.1";

interface Address {
  country_code: string;
  country_name: string;
  address_purpose: string;
  address_type: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  postal_code: string;
  telephone_number: string;
  fax_number?: string;
}

// Basic information interface
interface Basic {
  first_name: string;
  last_name: string;
  authorized_official_first_name: string;
  authorized_official_last_name: string;
  credential: string;
  gender: string;
  status: string;
}

// Main result interface
interface Result {
  number: string;
  basic: Basic;
  addresses: Address[];
}

// Root API response interface
interface ApiResponse {
  result_count: number;
  results: Result[];
}

const useFetchData = (country: string) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BASE_URL, {
          params: { country_code: country, limit: 5 },
        });

        setData(response.data);
      } catch (error: any) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (country) {
      fetchData();
    }
  }, [country]);

  return { data, loading, error };
};

export default useFetchData;
