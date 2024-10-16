"use client"; // Ensure this is a client component

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useOptimizelyOne } from "@remkoj/optimizely-one-nextjs/client";

interface Client {
  _id: string;
  company: string;
  industry: string;
  currentProducts: string[];
  interest: string;
}

declare global {
  interface Window {
    optimizely: any[];
  }
}

const ClientComponent = () => {
  const searchParams = useSearchParams();
  const companyName = searchParams.get("company");
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const opti = useOptimizelyOne();
  const [spinnerLoading, setSpinnerLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSpinnerLoading(false);
    }, 1000); // 1 second delay

    const fetchData = async () => {
      if (!companyName) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/company?company=${encodeURIComponent(companyName.trim())}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        if (data && typeof data === "object" && !Array.isArray(data)) {
          setClient(data);

          //opti.getService("experimentation")?.trackEvent("user", {});
          window.optimizely = window.optimizely || [];

          window.optimizely.push({
            type: "user",
            attributes: {
              company: data.company,
              industry: data.industry,
              currentProducts: data.currentProducts,
              interest: data.interest,
            },
          });

          window.optimizely.push({
            type: "activate",
          });
        } else {
          window.optimizely.push({
            type: "user",
            attributes: {
              company: "Dear Customer",
              industry: "",
              currentProducts: "",
              interest: "",
            },
          });
          setError("Unexpected data format received");
        }
      } catch (err) {
        console.log("error ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [companyName]);

  // Render the data
  return (
    <div>
      {/* Fullscreen Loading Spinner */}
      {spinnerLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg">
          <div className="w-16 h-16 border-t-4 border-white rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default ClientComponent;
