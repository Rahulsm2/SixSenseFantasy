import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StatusBar, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, FlatList, ScrollView } from 'react-native';
import { WIDTH, HEIGHT, app_Bg } from './Constants';
import { gstyles } from './GlobalStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const PlayersPickingModal = (props) => {

    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [areConditionsMet, setAreConditionsMet] = useState(false);
    const [totalCount, setTotalCount] = useState(props.totalSelectedPlayersCount);

    useEffect(() => {
        props.updateSelectedPlayers(selectedPlayers);
    }, [selectedPlayers, props.updateSelectedPlayers]);

    useEffect(() => {
        setTotalCount(props.totalSelectedPlayersCount);
    }, [props.totalSelectedPlayersCount]);

    const TeamA = ({ item }) => {
        const teamSelectionCount = selectedPlayers.filter((p) => p.team === 'Melbourne Stars').length;
        return (<>
            <TouchableOpacity
                style={[
                    styles.list,
                    selectedPlayers.some((p) => p.name === item.name) && {
                        backgroundColor: 'yellow',
                    },
                    !selectedPlayers.some((p) => p.name === item.name) && (!isPlayerSelectable(item) || totalCount >= 11) && {
                        opacity: 0.4,
                    },
                ]}
                onPress={() => handlePlayerSelection(item)}
                disabled={!selectedPlayers.some((p) => p.name === item.name) && (!isPlayerSelectable(item) || totalCount >= 11)}
            >
                <Text style={[gstyles.OpenSans_SemiBold(14, '#000', gstyles.ms(15)), { opacity: 1, marginVertical: 7, maxWidth: WIDTH * 0.6 }]} numberOfLines={1}>
                    {item.name}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[gstyles.OpenSans_SemiBold(14, 'grey', gstyles.ms(15)), { opacity: 1, marginVertical: 7, }]}>
                        {'Credits: '}
                    </Text>
                    <Text style={[gstyles.OpenSans_SemiBold(14, '#000', gstyles.ms(15)), { opacity: 1, }]}>
                        {item.credit}
                    </Text>
                </View>
            </TouchableOpacity>
        </>)
    }

    const TeamB = ({ item }) => {
        return (<>
            <TouchableOpacity
                style={[
                    styles.list,
                    selectedPlayers.some((p) => p.name === item.name) && {
                        backgroundColor: 'yellow',
                    },
                    !selectedPlayers.some((p) => p.name === item.name) && (!isPlayerSelectable(item) || totalCount >= 11) && {
                        opacity: 0.4,
                    },
                ]}
                onPress={() => handlePlayerSelection(item)}
                disabled={!selectedPlayers.some((p) => p.name === item.name) && (!isPlayerSelectable(item) || totalCount >= 11)}
            >
                <Text style={[gstyles.OpenSans_SemiBold(14, '#000', gstyles.ms(15)), { opacity: 1, marginVertical: 7, maxWidth: WIDTH * 0.6 }]} numberOfLines={1}>
                    {item.name}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[gstyles.OpenSans_SemiBold(14, 'grey', gstyles.ms(15)), { opacity: 1, marginVertical: 7, }]}>
                        {'Credits: '}
                    </Text>
                    <Text style={[gstyles.OpenSans_SemiBold(14, '#000', gstyles.ms(15)), { opacity: 1, }]}>
                        {item.credit}
                    </Text>
                </View>
            </TouchableOpacity>
        </>)
    }

    const isPlayerSelectable = (player) => {
        const role = props.role;
        const selectedPlayersForRole = selectedPlayers.filter((p) => p.role === role);

        const selectedPlayersForTeam = selectedPlayersForRole.filter((p) => p.team === player.team_name);

        const conditions = {
            'Batsman': selectedPlayersForRole.length < 7,
            'Wicket-Keeper': selectedPlayersForRole.length < 5,
            'All-Rounder': selectedPlayersForRole.length < 4,
            'Bowler': selectedPlayersForRole.length < 7,
        };

        return conditions[role] && selectedPlayersForTeam.length < 7;
    };

    const handlePlayerSelection = (player) => {
        setSelectedPlayers((prevSelected) => {
            const isSelected = prevSelected.some((p) => p.name === player.name);

            if (isSelected) {
                const updatedSelectedPlayers = prevSelected.filter((p) => p.name !== player.name);

                setTotalCount((prevTotal) => {
                    const newTotal = prevTotal + 1;
                    console.log("setTotalCount", newTotal);
                    return newTotal;
                });

                const role = props.role;
                const selectedPlayersForRole = updatedSelectedPlayers.filter((p) => p.role === role);
                const areCurrentConditionsMet =
                    selectedPlayersForRole.length >= getMinCount(role) && selectedPlayersForRole.length <= getMaxCount(role);

                setAreConditionsMet(areCurrentConditionsMet);

                return updatedSelectedPlayers;
            } else {
                const updatedSelectedPlayers = [
                    ...prevSelected,
                    {
                        name: player.name,
                        credit: player.credit,
                        credit_points: player.credit_points,
                        role: props.role,
                        team: player.team_name,
                    },
                ];

                setTotalCount((prevTotal) => {
                    const newTotal = prevTotal - 1;
                    console.log("setTotalCount", newTotal);
                    return newTotal;
                });

                const role = props.role;
                const selectedPlayersForRole = updatedSelectedPlayers.filter((p) => p.role === role);
                const areCurrentConditionsMet =
                    selectedPlayersForRole.length >= getMinCount(role) && selectedPlayersForRole.length <= getMaxCount(role);

                setAreConditionsMet(areCurrentConditionsMet);

                return updatedSelectedPlayers;
            }
        });
    };

    const getMinCount = (role) => {
        return {
            'Batsman': 3,
            'Wicket-Keeper': 1,
            'All-Rounder': 0,
            'Bowler': 3,
        }[role];
    };

    const getMaxCount = (role) => {
        return {
            'Batsman': 7,
            'Wicket-Keeper': 5,
            'All-Rounder': 4,
            'Bowler': 7,
        }[role];
    };


    const continueButtonPressed = () => {
        if (areConditionsMet) {
            props.updateSelectedPlayer(selectedPlayers, props.role);
            console.log("selectedPlayers", selectedPlayers);
            console.log('Selected Players jhfvkhgbjbh:', props.playersSelected);
            props.setRole('');
        } else {
            showToast("Please select the correct number of players for the current role.");
        }
    };


    return (
        <Modal
            transparent
            visible={props.isVisible}
            animationType="fade"
            onRequestClose={() => { props.setRole('') }}>
            <StatusBar
                backgroundColor={'rgba(0,0,0,0.2)'}
                barStyle="light-content"
                animated
            />


            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <TouchableOpacity activeOpacity={0.6}
                        onPress={() => { props.setRole('') }}
                        style={styles.close}
                    >
                        <AntDesign name='closecircle' size={25} color='red' />
                    </TouchableOpacity>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[gstyles.OpenSans_SemiBold(18, '#4d51e4', gstyles.ms(15)), { opacity: 1, marginVertical: 15 }]}>
                                Melbourne Stars
                            </Text>
                            <FlatList
                                data={props.players['Melbourne Stars']?.[props.role] || []}
                                keyExtractor={(item) => item.id}
                                renderItem={TeamA}
                                showsVerticalScrollIndicator={false}
                            />

                            <Text style={[gstyles.OpenSans_SemiBold(18, '#4d51e4', gstyles.ms(15)), { opacity: 1, marginVertical: 15 }]}>
                                Perth Scorchers
                            </Text>
                            <FlatList
                                data={props.players['Perth Scorchers']?.[props.role] || []}
                                keyExtractor={(item) => item.id}
                                renderItem={TeamB}
                            />
                        </View>
                    </ScrollView>
                    <View style={styles.footer}>
                        <Text style={[gstyles.OpenSans_SemiBold(12, '#000'), { maxWidth: WIDTH * 0.5 }]} numberOfLines={2}>
                            {`Total ${props.role} selected: ${selectedPlayers.filter(player => player.role === props.role).length}`}
                        </Text>

                        <TouchableOpacity
                            style={[styles.btn, { opacity: !areConditionsMet ? 0.4 : 1 }]}
                            onPress={continueButtonPressed}
                            disabled={!areConditionsMet}
                        >
                            <Text style={[gstyles.OpenSans_Bold(14, '#FFFFFF')]}>
                                {'Continue'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default PlayersPickingModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
        width: WIDTH - 35,
        maxHeight: HEIGHT * 0.75,
        backgroundColor: '#FFFFFF',
        shadowColor: '#0000006',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        height: 70,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btn: {
        width: WIDTH * 0.3,
        height: 50,
        backgroundColor: app_Bg,
        elevation: 10,
        borderRadius: 5,
        marginLeft: 50,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00FF0F',
    },
    close: {
        position: 'absolute',
        right: 0,
        top: -15,
        backgroundColor: app_Bg,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    list: {
        width: WIDTH * 0.8,
        height: 'auto',
        margin: 5,
        elevation: 5,
        borderRadius: 4,
        backgroundColor: app_Bg
    },
    iconBg: {
        width: 20,
        height: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 100,
        elevation: 1,
        ...gstyles.centerXY,
        borderWidth: 0.3,
        borderColor: '#8338EC'
    },
    iconTouch: {
        ...gstyles.inRow,
        backgroundColor: '#FFFFFF',
        marginRight: 20,
        paddingVertical: 5,
        marginLeft: 20
    },
    hrLine: {
        width: '90%',
        height: 0.7,
        backgroundColor: '#0276E5',
        marginVertical: 9,
        alignSelf: 'center'
    }
});