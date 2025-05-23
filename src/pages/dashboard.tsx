import { useQuery } from "@tanstack/react-query";
import { AllProject, Standar } from "@/types/Project";
import DashboardSections from "@/sections/dashboard";
import {
  BASE_API,
  BASE_URL,
  GET_ALL_PROJECT,
  GET_ALL_STANDARD,
} from "@/contexts/JWTContext";
import useAuth from "@/hooks/useAuth";
import { useMemo, useState } from "react";

const fetchProjects = async (token: string | null): Promise<AllProject[]> => {
  const response = await fetch(BASE_URL + BASE_API + GET_ALL_PROJECT, {
    method: "GET",
    headers: {
      Authorization: token || "",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  const data = await response.json();
  return data;
};

const fetchStandards = async (token: string | null): Promise<any[]> => {
  const response = await fetch(BASE_URL + BASE_API + GET_ALL_STANDARD, {
    method: "GET",
    headers: {
      Authorization: token || "",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch standards");
  }

  const data = await response.json();
  return data;
};

const Dashboard = () => {
  const { user } = useAuth();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("serviceToken") : null;
  const [selectedStandard, setSelectedStandard] = useState<string | null>(null);

  const {
    data: projects = [],
    isLoading: isProjectsLoading,
    isError: isProjectsError,
  } = useQuery<AllProject[]>({
    queryKey: ["projects", user?.user_id],
    queryFn: () => fetchProjects(token),
    enabled: !!token,
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: true,
    refetchInterval: 500,
  });

  const {
    data: standards = [],
    isLoading: isStandardsLoading,
    isError: isStandardsError,
  } = useQuery({
    queryKey: ["standards"],
    queryFn: () => fetchStandards(token),
    enabled: !!token,
  });

  const uniqueStandards = useMemo(() => {
    const allStandards = standards.flatMap((item) => item.standard_name || []);
    return Array.from(new Set(allStandards));
  }, [standards]);

  if (isProjectsLoading || isStandardsLoading) return <div>Loading...</div>;
  if (isProjectsError || isStandardsError) return <div>Error loading data</div>;

  return (
    <div>
      <DashboardSections
        data={projects}
        standards={standards}
        uniqueStandards={uniqueStandards as unknown as Standar}
        selectedStandard={selectedStandard}
        setSelectedStandard={setSelectedStandard}
      />
    </div>
  );
};

export default Dashboard;
