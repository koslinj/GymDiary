import { FC } from 'react';
import { View as RNView, Text as RNText, useColorScheme, TextProps } from 'react-native';

export const ThemedView = ({ className = '', lightClassName = '', darkClassName = '', ...props }) => {
  let colorScheme = useColorScheme();
  const themeClass = colorScheme === 'dark' ? `bg-slate-900 ${darkClassName}` : `bg-white ${lightClassName}`;

  return <RNView className={`${themeClass} ${className}`} {...props} />;
};

interface ThemedTextProps extends TextProps { // Extending TextProps of RNText
  className?: string;
  lightClassName?: string;
  darkClassName?: string;
}

export const ThemedText: FC<ThemedTextProps> = ({ className = '', lightClassName = '', darkClassName = '', ...props }) => {
  let colorScheme = useColorScheme();
  const themeClass = colorScheme === 'dark' ? `text-white ${darkClassName}` : `text-black ${lightClassName}`;

  return <RNText className={`font-poppins ${themeClass} ${className}`} {...props} />;
};
