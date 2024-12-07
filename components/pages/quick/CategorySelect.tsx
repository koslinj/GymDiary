import { MyPicker } from "@/components/MyPicker";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const CategorySelect: FC<Props> = ({ setSelectedCategory, openModal, setOpenModal }) => {
  const { t } = useTranslation()
  
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
      title={t('choose_category')}
      options={categories}
      setOption={setSelectedCategory}
    />
  )
}