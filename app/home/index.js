import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { collection, getDocs } from "firebase/firestore";
import db from "../../config/firebase.js"
import { useEffect, useState } from "react";
import { ListItem, Icon } from '@rneui/themed';





export default function Home() {

    const [data, setData] = useState([])

    const mcqsCollectionRef = collection(db, "branches")

    useEffect(() => {
        const getBranches = async () => {
            try {
                const data = await getDocs(mcqsCollectionRef)
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }))
                setData(filteredData)

            } catch (err) {
                console.error(err)
            }

        }
        getBranches()
    }, [])


    return (
        <View style={styles.container}>



            {data.map((branch) => {
                return (
                    <>
                        <Link key={branch.id} href={{
                            pathname: "/books",
                            params: { branchId: branch.id }
                        }}>

                            <ListItem key={branch.id} style={styles.listItem} bottomDivider={true}>
                                <Icon name="doctor" type="material-community" color="grey" />
                                <ListItem.Content>
                                    <ListItem.Title>{branch.branchName}</ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                        </Link>


                    </>

                )
            })}

            <StatusBar style="auto" />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listItem: {
        width: 300
    }
});
