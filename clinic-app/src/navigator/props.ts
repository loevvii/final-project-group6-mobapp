import { NavigationProp } from '@react-navigation/native';

export interface Props {
    navigation: NavigationProp<any>;
    route: { params: { 
        selectedDate: any 
    } };
}