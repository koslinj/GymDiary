import chestIcon from '@/assets/icons/chestIcon.jpg'
import backIcon from '@/assets/icons/backIcon.jpg';
import bicepsIcon from '@/assets/icons/bicepsIcon.jpg';
import tricepsIcon from '@/assets/icons/tricepsIcon.jpg';
import shouldersIcon from '@/assets/icons/shouldersIcon.jpg';
import absIcon from '@/assets/icons/absIcon.jpg';
import legsIcon from '@/assets/icons/legsIcon.jpg';
import { ThemedView } from './ThemedComponents';
import { Image } from 'react-native';
import { FC } from 'react';

const icons: Record<string, any> = {
  'chestIcon.jpg': chestIcon,
  'backIcon.jpg': backIcon,
  'bicepsIcon.jpg': bicepsIcon,
  'tricepsIcon.jpg': tricepsIcon,
  'shouldersIcon.jpg': shouldersIcon,
  'absIcon.jpg': absIcon,
  'legsIcon.jpg': legsIcon,
};

interface Props {
  exercise: Exercise
}

export const ExerciseIcon: FC<Props> = ({ exercise }) => {
  const iconPath = icons[exercise.photo_exercise];

  return (
    <ThemedView className='rounded-full overflow-hidden w-16 h-16'>
      <Image
      className='w-full h-full'
        source={iconPath}
        alt={`${exercise.name_exercise} icon`}
      />
    </ThemedView>
  );
};
