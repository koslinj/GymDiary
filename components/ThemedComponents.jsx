import { View as RNView, Text as RNText, useColorScheme } from 'react-native';

export const ThemedView = ({ className = '', lightClassName = '', darkClassName = '', ...props }) => {
  let colorScheme = useColorScheme();
  const themeClass = colorScheme === 'dark' ? `bg-black ${darkClassName}` : `bg-white ${lightClassName}`;

  return <RNView className={`${themeClass} ${className}`} {...props} />;
};

export const ThemedText = ({ className = '', lightClassName = '', darkClassName = '', ...props }) => {
  let colorScheme = useColorScheme();
  const themeClass = colorScheme === 'dark' ? `text-black ${darkClassName}` : `text-white ${lightClassName}`;

  return <RNText className={`${themeClass} ${className}`} {...props} />;
};
