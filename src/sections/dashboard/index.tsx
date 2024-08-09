import React, { SetStateAction, useState } from "react";
import { MobileView, BrowserView } from 'react-device-detect'
import { AllProject } from "@/types/Project";
import CardInfo from "./CardInfo";
import TableInfo from "./TableInfo";
import useAuth from "@/hooks/useAuth";

interface DashboardSectionsProps {
  data: AllProject[] | null;
  openModal: (items: SetStateAction<null>) => void;
  setAdd: (v: boolean) => void;
}

const DashboardSections = ({
  data,
  openModal,
  setAdd,
}: DashboardSectionsProps) => {
  const { isLoggedIn } = useAuth();
  const [open, setOpen] = useState<boolean[]>(Array(data?.length).fill(false));

  const handleClick = (index: number) => {
    setOpen((prevOpen) => {
      const newOpen = [...prevOpen];
      newOpen[index] = !newOpen[index];
      return newOpen;
    });
  };

  return (
    <React.Fragment>
      <MobileView>
        {data?.map((items, index) => {
          return (
            <CardInfo
              key={index}
              onEdit={() => {
                setAdd(false);
                openModal(items as SetStateAction<null>);
              }}
              items={items}
              open={open}
              handleClick={handleClick}
              index={index}
            />
          );
        })}
      </MobileView>
      {isLoggedIn ? data?.map((items, index) => {
        return (
          <CardInfo
            key={index}
            onEdit={() => {
              setAdd(false);
              openModal(items as SetStateAction<null>);
            }}
            items={items}
            open={open}
            handleClick={handleClick}
            index={index}
          />
        );
      })
        : (
          <BrowserView>
            <TableInfo
              data={data || []}
            />
          </BrowserView>
        )}
    </React.Fragment>
  );
};

export default DashboardSections;
