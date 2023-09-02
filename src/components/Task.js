import React from "react";
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import moment from 'moment';
import 'moment/locale/pt-br';
import doneIcon from '../../assets/doneIcon.png';
import trash from '../../assets/trash.png';
import commonStyles from "../commonStyles";

export default props => {

    const doneOrNotStyle = props.doneAt != null ?
        { textDecorationLine: 'line-through' } : {};

    const date = props.doneAt ? props.doneAt : props.estimateAt;
    const formattedDate = moment(date).locale('pt-br')
        .format('ddd, D [de] MMMM');

    const getRightContent = () => {
        return (
            <TouchableOpacity style={styles.right}>
                <Image source={trash} style={{ width: 50, height: 50 }} />
            </TouchableOpacity>
        );
    };

    return (
        <GestureHandlerRootView>
            <Swipeable renderRightActions={getRightContent}>
                <View style={styles.container}>
                    <TouchableWithoutFeedback
                        onPress={() => props.toggleTask(props.id)}>
                        <View style={styles.checkContainer}>
                            {getCheckView(props.doneAt)}
                        </View>
                    </TouchableWithoutFeedback>
                    <View>
                        <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                        <Text style={styles.data}>{formattedDate}</Text>
                    </View>
                </View>
            </Swipeable>
        </GestureHandlerRootView>
    )
}

function getCheckView(doneAt) {
    if (doneAt != null) {
        return (
            <View style={styles.done}>
                <Image source={doneIcon} />
            </View>
        )
    } else {
        return (
            <View style={styles.pending}></View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555',
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center',
    },
    desc: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15,
    },
    data: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12,
    },
    right: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    }
})
