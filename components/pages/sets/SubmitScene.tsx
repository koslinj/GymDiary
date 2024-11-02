import { ThemedText, ThemedView } from "@/components/ThemedComponents";
import { useSets } from "@/hooks/useSets";
import { memo, useCallback, useState } from "react";
import { DurationWheelPicker } from "./submit/DurationWheelPicker";
import { PageModal } from "@/components/PageModal";
import { ScrollView, TouchableOpacity } from "react-native";
import { MyToast } from "@/components/MyToast";
import { transformToAddGymWorkoutDetail } from "@/utils/formating";
import { addWorkoutSubmit } from "@/api/forms";
import { DurationInput } from "./submit/DurationInput";
import { RatingInput } from "./submit/RatingInput";
import { NoteInput } from "./submit/NoteInput";
import { DateInput } from "./submit/DateInput";
import { TimeInput } from "./submit/TimeInput";

const MemoizedDurationWheelPicker = memo(DurationWheelPicker);

export const SubmitScene = () => {
  const { setsData } = useSets();

  const [note, setNote] = useState('')
  const [duration, setDuration] = useState({ hour: 1, minute: 0, second: 0 });
  const [rating, setRating] = useState(4);
  const [date, setDate] = useState(new Date())

  const [openPageModal, setOpenPageModal] = useState(false)
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleChange = useCallback((type: Duration, value: number) => {
    setDuration((prev) => ({ ...prev, [type]: value }));
  }, []);

  const handleSubmit = async () => {
    if (duration.hour === 0 && duration.minute === 0 && duration.second === 0) {
      setToastMessage('Please check all inputs, because one of them is invalid!')
      setShowToast(true)
      return
    }

    const payload: AddGymWorkout = {
      date: date,
      duration: duration.hour.toString().padStart(2, '0') + ':' + duration.minute.toString().padStart(2, '0') + ':' + duration.second.toString().padStart(2, '0'),
      note: note,
      rating: rating,
      plan_name: "QUICK WORKOUT",
      workout_details: transformToAddGymWorkoutDetail(setsData),
    };
    await addWorkoutSubmit(payload)
  }

  return (
    <>
      <ThemedView className="flex-1">
        <PageModal
          openModal={openPageModal}
          setOpenModal={setOpenPageModal}
        >
          <MemoizedDurationWheelPicker duration={duration} onChange={handleChange} setOpenPageModal={setOpenPageModal} />
        </PageModal>

        <ScrollView contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 20 }}>
          <DurationInput duration={duration} setOpenPageModal={setOpenPageModal} />
          <RatingInput rating={rating} setRating={setRating} />
          <NoteInput note={note} setNote={setNote} />
          <DateInput date={date} setDate={setDate} />
          <TimeInput date={date} setDate={setDate} />
          <TouchableOpacity
            className='my-4 p-4 rounded-xl bg-secondary-400 dark:bg-secondary-700'
            onPress={handleSubmit}
          >
            <ThemedText className='text-2xl text-center font-poppinsBold'>Submit</ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </ThemedView>

      <MyToast
        openToast={showToast}
        setOpenToast={setShowToast}
        duration={4000}
      >
        <>
          <ThemedText className="text-2xl mb-2 font-poppinsBold text-center">Error</ThemedText>
          <ThemedText className="text-2xl mt-3 text-center">{toastMessage}</ThemedText>
        </>
      </MyToast>
    </>
  );
};
