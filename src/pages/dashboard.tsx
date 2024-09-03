import { useEffect, useState } from "react";
import { AllProject } from "@/types/Project";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL, GET_ALL_PROJECT } from "@/contexts/JWTContext";
import DashboardSections from "@/sections/dashboard";
import axios from "axios";
import useAuth from "@/hooks/useAuth";

const Input = () => {
  const { user } = useAuth()
  let customer_id = user?.customer_id;
  let role = user?.role;
  /** ======== | ROLE
    1 : super_admin
    2 : customer
    3 : operator_iso
    4 : operator_ispo
    5 : operator_ict
    6 : crm
    7 : finance
    8 : sales
    9 : product_development
    10 : auditor
    11 : director
    12 :  monitor
    ======== | ROLE **/

  const [filteredData, setFilteredData] = useState<AllProject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { data: allProject = [] } = useQuery({
    queryKey: ["allProjects"],
    queryFn: async () => {
      const data = {
        customer_id
      }

      try {
        const response = role === "2" ? await axios.post(BASE_URL + GET_ALL_PROJECT, data) : await axios.post(BASE_URL + GET_ALL_PROJECT);
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
  }, [allProject]);

  return (
    <div>
      <DashboardSections data={filteredData} />
    </div>
  );
};

export default Input;
