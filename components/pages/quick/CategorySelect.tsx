import { MyPicker } from "@/components/MyPicker";
import { FC, useState } from "react";

interface Props {
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const CategorySelect: FC<Props> = ({ setSelectedCategory, openModal, setOpenModal }) => {
  const categories = [
    "All",
    "Chest",
    "Back",
    "Biceps",
    "Triceps",
    "Shoulders",
    "Abs",
    "Legs",
  ];

  return (
    <MyPicker
      openModal={openModal}
      setOpenModal={setOpenModal}
      title={'Choose category'}
      options={categories}
      setOption={setSelectedCategory}
    />
  )
}