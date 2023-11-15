import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import db from "../../config/firebase.js"
import { useEffect, useState } from "react";
import { ListItem, Icon } from '@rneui/themed';

import { Link, router } from 'expo-router';


export default function Page() {
    const params = useLocalSearchParams()
    const [data, setData] = useState([{ bookName: "" }])
    const branch = params.branchId

    const mcqsCollectionRef = collection(db, "branches", branch, "books")

    useEffect(() => {
        const getBranches = async () => {
            try {
                const data = await getDocs(mcqsCollectionRef)
                const filteredData = await data.docs.map((doc) => ({
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


            {data.map((book) => {
                return (
                    <Link key={book.id} href={{
                        pathname: "/chapters",
                        params: { branchId: branch, bookId: book.id }
                    }}>
                        <ListItem style={styles.listItem} bottomDivider={true}>
                            <Icon name="book-open-page-variant" type="material-community" color="grey" />
                            <ListItem.Content>
                                <ListItem.Title>{book.bookName}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>

                    </Link>

                )

            })}


        </View>

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