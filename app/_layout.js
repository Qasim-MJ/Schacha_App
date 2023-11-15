import { Slot } from 'expo-router';
import { Header as HeaderRNE, HeaderProps, Icon } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';


export default function HomeLayout() {
    return (
        <SafeAreaProvider>
            <HeaderRNE

                leftComponent={<Icon onPress={() => { router.back() }} style={{ padding: 5 }} color={"white"} size={30} name="angle-left" type='font-awesome' />}
                centerComponent={{ text: 'Schacha', style: styles.heading }}
            />
            <Slot />
        </SafeAreaProvider>


    );
}

const styles = StyleSheet.create({

    heading: {
        fontSize: 20,
        color: "white"
    }
})