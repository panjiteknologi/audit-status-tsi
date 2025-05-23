import React, { SetStateAction, useState } from "react";
import { AllProject } from "@/types/Project";
import CardInfo from "./CardInfo";

interface CardSectionsProps {
  data: AllProject[] | null;
  openModal?: (items: SetStateAction<null>) => void;
  setAdd?: (v: boolean) => void;
}

const CardSections = ({ data, openModal, setAdd }: CardSectionsProps) => {
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
      {data?.map((items, index) => {
        return (
          <CardInfo
            key={index}
            onEdit={() => {
              setAdd && setAdd(false);
              openModal && openModal(items as unknown as SetStateAction<null>);
            }}
            items={items}
            open={open}
            handleClick={handleClick}
            index={index}
          />
        );
      })}
    </React.Fragment>
  );
};

export default CardSections;
