import { useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

export const useThemeColors = () => {
    const theme = useColorScheme();
    return Colors[theme === 'dark' ? 'dark' : 'light'];
};
