import { SetStateAction } from "react";
import { AllProject } from "@/types/Project";
import TableInfo from "./TableInfo";

interface DashboardSectionsProps {
  data: AllProject[] | null;
  openModal?: (items: SetStateAction<null>) => void;
  setAdd?: (v: boolean) => void;
}

const DashboardSections = ({
  data
}: DashboardSectionsProps) => {

  return (
    <TableInfo
      data={data || []}
    />
  );
};

export default DashboardSections;
