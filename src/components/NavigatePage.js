import { useNavigation } from '@react-navigation/native';

export function NavigatePage() {
    const navigation = useNavigation();
    return navigation.navigate('Home')
}