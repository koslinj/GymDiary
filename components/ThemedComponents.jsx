import { View as RNView, Text as RNText, useColorScheme } from 'react-native';

export const ThemedView = ({ className = '', lightClassName = '', darkClassName = '', ...props }) => {
  let colorScheme = useColorScheme();
  const themeClass = colorScheme === 'dark' ? `bg-slate-900 ${darkClassName}` : `bg-white ${lightClassName}`;

  return <RNView className={`${themeClass} ${className}`} {...props} />;
};

export const ThemedText = ({ className = '', lightClassName = '', darkClassName = '', ...props }) => {
  let colorScheme = useColorScheme();
  const themeClass = colorScheme === 'dark' ? `text-white ${darkClassName}` : `text-black ${lightClassName}`;

  return <RNText className={`${themeClass} ${className}`} {...props} />;
};
