import { useEffect, useState } from "react";
import { AllProject } from "@/types/Project";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL, GET_ALL_PROJECT } from "@/contexts/JWTContext";
import DashboardSections from "@/sections/dashboard";
import axios from "axios";

const Input = () => {
  const [filteredData, setFilteredData] = useState<AllProject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { data: allProject = [] } = useQuery({
    queryKey: ["allProjects"],
    queryFn: async () => {
      try {
        const response = await axios.get(BASE_URL + GET_ALL_PROJECT);
        setLoading(false);
        return response?.data?.data;
      } catch (error) {
        setLoading(false);
        return [];
      } finally {
        setLoading(false);
      }
    },
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: true,
    refetchInterval: 500,
  });

  useEffect(() => {
    if (allProject) {
      setFilteredData(allProject);
    }

    // getAkreditasi();
    // getStandard();
    // getStatusPembayaran();
    // getTahapan();
  }, [allProject]);

  return (
    <div>
      <DashboardSections
        data={filteredData}
      />
    </div>
  )
}

export default Input