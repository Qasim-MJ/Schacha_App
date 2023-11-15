import { ScrollView, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import db from "../../config/firebase.js"
import { useEffect, useState } from "react";
import { Link, router } from 'expo-router';
import { ListItem, Icon } from '@rneui/themed';



export default function Page() {
    const params = useLocalSearchParams()
    const [data, setData] = useState([])
    const branch = params.branchId
    const book = params.bookId


    const mcqsCollectionRef = collection(db, "branches", branch, "books", book, "chapters")

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

    return (<ScrollView style={styles.container}>

        {data.map((chapter) => {
            return (
                <Link key={chapter.id} href={{
                    pathname: "/mcqs",
                    params: { branchId: branch, bookId: book, chapterId: chapter.id }
                }}>
                    <ListItem style={styles.listItem} bottomDivider={true}>
                        <Icon name="comment-question" type="material-community" color="grey" />
                        <ListItem.Content>
                            <ListItem.Title>{chapter.chapterNumber}. {chapter.chapterName}  ({chapter.chapterMcqsNumber})</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>

                </Link>
            )
        })}



    </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    listItem: {
        width: 400
    }
});