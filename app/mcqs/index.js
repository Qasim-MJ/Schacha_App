import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import db from "../../config/firebase.js"
import { useEffect, useState } from "react";
import { Link, router } from 'expo-router';
import { Audio } from 'expo-av';

import { ListItem, Icon, Text, Button, LinearProgress } from '@rneui/themed';
import { gray } from 'color-name';
import { async } from '@firebase/util';

export default function Page() {
    const params = useLocalSearchParams()
    const [data, setData] = useState([{ question: "", optA: "", optB: "", optC: "", optD: "", optE: "", correctAnswer: "", explenation: "" }])
    const [currentMcqNumber, setCurrentMcqNumber] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState("")
    const [isLastQuestion, setIsLastQuestion] = useState(false)
    const [sound, setSound] = useState();


    const [optsBackgroundColor, setOptsBackgroundColor] = useState({ A: "white", B: "white", C: "white", D: "white", E: "white" })

    const [isAnswered, setIsAnswered] = useState(false)
    const branch = params.branchId
    const book = params.bookId
    const chapter = params.chapterId


    const mcqsCollectionRef = collection(db, "branches", branch, "books", book, "chapters", chapter, "MCQs")
    useEffect(() => {
        const getBranches = async () => {
            try {
                const data = await getDocs((query(mcqsCollectionRef, orderBy("questionNumber"))))
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

    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(require('../../assets/correct.mp3')
        );
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
    }
    const nextQuestion = () => {
        setCurrentMcqNumber(currentMcqNumber + 1)
        setIsAnswered(false)
        setOptsBackgroundColor({ A: "white", B: "white", C: "white", D: "white", E: "white" })
        setSelectedAnswer("")
    }

    const answer = () => {

        const correctAnswer = data[currentMcqNumber].correctAnswer
        if (selectedAnswer == "") {
            alert("Please Select An Option")
        }
        else if (selectedAnswer == correctAnswer) {
            if (data[currentMcqNumber].questionNumber == data.length) {
                setIsLastQuestion(true)
            }
            setOptsBackgroundColor({ ...optsBackgroundColor, [selectedAnswer]: "#d9fadd" })
            //playSound()
            setIsAnswered(true)


        } else if (selectedAnswer != correctAnswer) {
            if (currentMcqNumber + 1 == data.length) {
                setIsLastQuestion(true)
            }
            setOptsBackgroundColor({ ...optsBackgroundColor, [selectedAnswer]: "#fad9d9", [correctAnswer]: "#d9fadd" })
            setIsAnswered(true)

        }
    }

    const typeOfButton = () => {
        if (isLastQuestion) {
            return (
                <Button style={{ marginTop: 1 }} onPress={() => { router.back() }}>Finish</Button>
            )
        }
        else if (isAnswered === false) {
            return <Button style={{ marginTop: 20 }} onPress={() => { answer() }}>Answer</Button>
        }
        else {
            return (<Button style={{ marginTop: 20 }} onPress={() => { nextQuestion() }}>Next</Button>)
        }
    }

    const showExplenation = () => {
        if (isAnswered === true) {
            return <Text style={{ fontSize: 18, padding: 15, color: 'gray' }}>{data[currentMcqNumber].explination}</Text>
        }
    }


    return (
        <ScrollView>
            <View>
                <Text style={{ fontSize: 16, color: "gray", padding: 5, paddingBottom: 0 }}>{book} / {chapter}</Text>


                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    {data[currentMcqNumber].questionNumber == 1 ? ("") : (
                        <View><TouchableOpacity style={{ alignSelf: "flex-end" }} onPress={() => { setCurrentMcqNumber(currentMcqNumber - 1) }}><Icon style={{ padding: 5 }} color={"#2593cf"} size={40} name="angle-left" type='font-awesome' /></TouchableOpacity></View>

                    )}
                    <View style={{ flex: 1 }}>
                        <LinearProgress
                            style={{ marginVertical: 10, height: 10 }}
                            value={currentMcqNumber / data.length}
                            variant="determinate"
                            animation={{ duration: 1000 }}
                            color='#c0eafc'
                            trackColor='white'
                        />
                    </View>
                    {data[currentMcqNumber].questionNumber == data.length ? ("") : (
                        <View><TouchableOpacity style={{ alignSelf: "flex-end" }} onPress={() => { setCurrentMcqNumber(currentMcqNumber + 1) }}><Icon style={{ padding: 5 }} color={"#2593cf"} size={40} name="angle-right" type='font-awesome' /></TouchableOpacity></View>

                    )}
                </View>
                <Text style={{ fontSize: 18, color: "black", padding: 15, paddingBottom: 0 }}>{data[currentMcqNumber].questionNumber} / {data.length}</Text>

                <View>
                    <Text style={{ padding: 15 }} h4 h4Style={{ color: "black", paddingBottom: 40 }}>{data[currentMcqNumber].question}</Text>
                    <ListItem containerStyle={{ backgroundColor: optsBackgroundColor.A }} bottomDivider onPress={() => { setSelectedAnswer("A"); setOptsBackgroundColor({ A: "#d9f0fa" }) }}>
                        <ListItem.Content>
                            <ListItem.Title> <Text style={{ color: "gray", fontSize: 17 }}>A. {data[currentMcqNumber].optA}</Text></ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    <ListItem bottomDivider containerStyle={{ backgroundColor: optsBackgroundColor.B }} onPress={() => { setSelectedAnswer("B"); setOptsBackgroundColor({ B: "#d9f0fa" }) }}>
                        <ListItem.Content>
                            <ListItem.Title> <Text style={{ color: "gray", fontSize: 17 }}>B. {data[currentMcqNumber].optB}</Text></ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    <ListItem bottomDivider containerStyle={{ backgroundColor: optsBackgroundColor.C }} onPress={() => { setSelectedAnswer("C"); setOptsBackgroundColor({ C: "#d9f0fa" }) }}>
                        <ListItem.Content>
                            <ListItem.Title> <Text style={{ color: "gray", fontSize: 17 }}>C. {data[currentMcqNumber].optC}</Text></ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    <ListItem bottomDivider containerStyle={{ backgroundColor: optsBackgroundColor.D }} onPress={() => { setSelectedAnswer("D"); setOptsBackgroundColor({ D: "#d9f0fa" }) }}>
                        <ListItem.Content>
                            <ListItem.Title> <Text style={{ color: "gray", fontSize: 17 }}>D. {data[currentMcqNumber].optD}</Text></ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    {data[currentMcqNumber].optE === "" ? (
                        ""

                    ) : (<ListItem bottomDivider containerStyle={{ backgroundColor: optsBackgroundColor.E }} onPress={() => { setSelectedAnswer("E"); setOptsBackgroundColor({ E: "#d9f0fa" }) }}>
                        <ListItem.Content>
                            <ListItem.Title> <Text style={{ color: "gray", fontSize: 17 }}>E. {data[currentMcqNumber].optE}</Text></ListItem.Title>
                        </ListItem.Content>
                    </ListItem>)}


                    {typeOfButton()}
                    {showExplenation()}
                </View>



            </View>
        </ScrollView>
    )
}