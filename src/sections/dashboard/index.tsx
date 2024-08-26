import { SetStateAction, useState } from "react";
import { AllProject } from "@/types/Project";
import TableInfo from "./TableInfo";
import { BrowserView, MobileView } from "react-device-detect";
import CardInfo from "../input/CardInfo";

interface DashboardSectionsProps {
  data: AllProject[] | null;
  openModal?: (items: SetStateAction<null>) => void;
  setAdd?: (v: boolean) => void;
}

const DashboardSections = ({
  data
}: DashboardSectionsProps) => {
  const [open, setOpen] = useState<boolean[]>(Array(data?.length).fill(false));

  const handleClick = (index: number) => {
    setOpen((prevOpen) => {
      const newOpen = [...prevOpen];
      newOpen[index] = !newOpen[index];
      return newOpen;
    });
  };

  return (
    <>
      <MobileView>
        {data?.map((items, index) => {
          return (
            <CardInfo
              key={index}
              items={items}
              index={index}
              open={open}
              handleClick={handleClick}
            />
          );
        })}
      </MobileView>
      <BrowserView>
        <TableInfo
          data={data || []}
        />
      </BrowserView>
    </>
  );
};

export default DashboardSections;
