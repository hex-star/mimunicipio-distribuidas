import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useStickyState(defaultValue, key) {
    const [value, setValue] = React.useState(async () => {
        const stickyValue = await AsyncStorage.getItem(key);
        console.log('AGUS', stickyValue);
        return stickyValue !== null
            ? JSON.parse(stickyValue)
            : defaultValue;
    });
    React.useEffect(() => {
        AsyncStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
}

export default useStickyState;
