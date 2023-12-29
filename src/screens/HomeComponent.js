import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar, FlatList, ImageBackground } from 'react-native';
import { gstyles } from '../components/GlobalStyles';
import { HEIGHT, OpenSans_Medium, WIDTH, app_Bg } from '../components/Constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PlayersPickingModal from '../components/PlayersPickingModal';
import { showToast } from '../components/ShowToast';
import LoadingModel from '../components/Loading';
import LinearGradient from 'react-native-linear-gradient';

const HomeComponent = (props) => {
    const navigation = useNavigation();
    const [totalSelectedPlayersCount, setTotalSelectedPlayersCount] = useState(0);
    const [totalSelectedPlayersCredit, setTotalSelectedPlayersCredit] = useState(100);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [selectedPlayersCount, setSelectedPlayersCount] = useState({
        'Batsman': 0,
        'Bowler': 0,
        'Wicket-Keeper': 0,
        'All-Rounder': 0,
    });

    useEffect(() => {
        setTotalSelectedPlayersCredit((prevTotalCredits) => {
            const totalCredits = selectedPlayers.reduce((sum, player) => {
                const playerCredits = player.credit || 0;
                return sum + playerCredits;
            }, 0);
            return totalCredits;
        });
    }, [selectedPlayers]);

    useEffect(() => {
        const totalCount = Object.values(selectedPlayersCount).reduce((sum, count) => sum + count, 0);
        setTotalSelectedPlayersCount(totalCount);

    }, [selectedPlayersCount]);

    const updateSelectedPlayers = (selectedPlayers) => {
        setSelectedPlayers(selectedPlayers);
    };

    const renderRole = ({ item }) => (
        <TouchableOpacity style={styles.role} activeOpacity={0.9} onPress={() => { item.role != undefined ? props.setRole(item.role) : null }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[gstyles.OpenSans_Bold(14, '#000000'), { position: 'absolute', top: 10, left: 10 }]}>
                    {item.role}
                </Text>
                <MaterialIcons name='sports-cricket' size={20} color='#FFD700' style={{ position: 'absolute', top: 10, right: 10 }} />
            </View>
            <Text style={[gstyles.OpenSans_SemiBold(12, '#000000'), { position: 'absolute', top: 60, left: 10 }]}>
                {'Selected players: '} <Text style={[gstyles.OpenSans_Bold(14, '#000000'), { position: 'absolute', top: 60, left: 10 }]}>{selectedPlayersCount[item.role]}</Text>
            </Text>
            <Text style={[gstyles.OpenSans_SemiBold(12, '#000000'), { position: 'absolute', top: 85, left: 10 }]}>
                {'Minimum players: '}{item.role == 'Batsman' || item.role == 'Bowler' ? 3 : item.role == 'Wicket-Keeper' ? 1 : 0}
            </Text>
            <Text style={[gstyles.OpenSans_SemiBold(12, '#000000'), { position: 'absolute', top: 105, left: 10 }]}>
                {'Maximum players: '}{item.role == 'Batsman' || item.role == 'Bowler' ? 7 : item.role == 'Wicket-Keeper' ? 5 : 4}
            </Text>

        </TouchableOpacity>
    );

    const renderMatch = ({ item }) => (
        <TouchableOpacity style={[styles.matchCard, { opacity: item.id > 1 ? 0.4 : 1 }]} activeOpacity={0.6} onPress={() => { props.matches() }} disabled={item.id > 1}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                <Image source={item.imageUrl1} style={{ width: 40, height: 40 }} />
                <Text style={[gstyles.OpenSans_Bold(16, '#000000'), { marginHorizontal: 10, marginVertical: 20 }]}>
                    {item.team1}
                </Text>
            </View>
            <Text style={[gstyles.OpenSans_SemiBold(22, '#c2c2c2'), { marginLeft: 60 }]}>
                {'V/S'}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                <Image source={item.imageUrl2} style={{ width: 40, height: 40 }} />
                <Text style={[gstyles.OpenSans_Bold(16, '#000000'), { marginHorizontal: 10, marginVertical: 20 }]}>
                    {item.team2}
                </Text>
            </View>
            <Text style={[gstyles.OpenSans_Bold(12, item.id > 1 ? 'red' : 'green'), { position: 'absolute', right: 15, maxWidth: WIDTH * 0.5 }]}
                numberOfLines={2}>
                {item.id > 1 ? "Unleashing Soon!" : "Picks Unleashed!"}
            </Text>
        </TouchableOpacity>
    );

    const renderFinalList = ({ item }) => (
        <View style={styles.finalListRow}>
            <Text style={[styles.finalListText, styles.tableCell, { fontWeight: 'bold', color: '#000' }]}>{item.name}</Text>
            <Text style={[styles.finalListText, styles.tableCell]}>{item.credit}</Text>
            <Text style={[styles.finalListText, styles.tableCell]}>{item.team}</Text>
            <Text style={[styles.finalListText, styles.tableCell]}>{item.role}</Text>
        </View>
    );

    const updateSelectedPlayerCount = (role, selectedPlayers) => {
        setSelectedPlayersCount((prevCounts) => {
            const newCounts = { ...prevCounts };
            const selectedPlayersForRole = selectedPlayers.filter(player => player.role === role);
            newCounts[role] = selectedPlayersForRole.length;

            return newCounts;
        });
    };

    return (
        <>
            <StatusBar
                backgroundColor='#4d51e4'
                animated={true}
                barStyle="light-content"
            />
            <View style={[gstyles.container(app_Bg)]}>
                <View style={[styles.header]}>
                    {props.status != 1 ?
                        <TouchableOpacity style={{ left: 20, position: 'absolute', top: 30 }} onPress={() => {
                            props.setStatus(1);
                            setSelectedPlayers([]);
                            setSelectedPlayersCount({});
                            setTotalSelectedPlayersCredit(100);
                            setTotalSelectedPlayersCount(0);
                            props.updateSelectedPlayer([])

                        }}>
                            <Ionicons name='arrow-back-outline' size={30} color='#FFFFFF' />
                        </TouchableOpacity>
                        : null
                    }
                    <Text style={[gstyles.OpenSans_Bold(22, '#FFFFFF'), { position: 'absolute', right: WIDTH * 0.25, top: 30 }]}>
                        {'Six-Sense Fantasy'}
                    </Text>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginEnd: 25, marginStart: 25, marginTop: 15 }}>
                            {
                                props.status == 1 ?
                                    <FontAwesome5 name='question-circle' size={30} color='#00FF00' />
                                    : <FontAwesome5 name='check-circle' size={30} color='#00FF00' />
                            }

                            {
                                props.status > 2 ?
                                    <FontAwesome5 name='check-circle' size={30} color='#00FF00' />
                                    : props.status == 2 ? <FontAwesome5 name='question-circle' size={30} color='#00FF00' />
                                        : <FontAwesome5 name='circle' size={30} color='#FFFFFF' />
                            }

                            {
                                props.status > 3 ?
                                    <FontAwesome5 name='check-circle' size={30} color='#00FF00' />
                                    : props.status == 3 ? <TouchableOpacity>
                                        <FontAwesome5 name='question-circle' size={40} color='#ff8f00' />
                                    </TouchableOpacity>
                                        : <FontAwesome5 name='circle' size={30} color='#FFFFFF' />
                            }
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={[props.status >= 1 ? gstyles.OpenSans_Bold(12, '#00FF00') : gstyles.OpenSans_Regular(12, '#FFFFFF'), { marginLeft: 7 }]}>
                                Select Match
                            </Text>
                            <Text style={[props.status > 1 ? gstyles.OpenSans_Bold(12, '#00FF00') : gstyles.OpenSans_Regular(12, '#FFFFFF'), { marginLeft: 50 }]}>
                                Choose Team
                            </Text>
                            <Text style={[props.status > 3 ? gstyles.OpenSans_Bold(13, '#00FF00') : props.status > 2 && props.status <= 3 ? gstyles.OpenSans_Bold(13, '#ff8f00') : gstyles.OpenSans_Regular(12, '#FFFFFF'), { marginLeft: 50 }]}>
                                Finalize Team
                            </Text>
                        </View>
                    </View>
                </View>
                {props.status == 1 ?
                    <>
                        <Text style={[gstyles.OpenSans_Bold(18, '#000000'), { marginTop: 20, marginLeft: 25 }]}>
                            Upcoming Matches
                        </Text>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <FlatList
                                data={props.Matchdata}
                                keyExtractor={(item) => item.id}
                                renderItem={renderMatch}
                            />
                        </View>
                    </> : null}

                {props.status == 2 ?
                    <>
                        <View style={styles.transCardView}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={[gstyles.OpenSans_Bold(14, '#008000'), { marginVertical: 10, marginLeft: 10 }]}>
                                    MELBOURNE STARS
                                </Text>
                                <Text style={[gstyles.OpenSans_SemiBold(16, '#C2C2C2')]}>
                                    V/S
                                </Text>
                                <Text style={[gstyles.OpenSans_Bold(14, '#ff8c00'), { marginRight: 10 }]}>
                                    PERTH SCORCHERS
                                </Text>
                            </View>
                            <Text style={[gstyles.OpenSans_Bold(12, '#000000'), { marginTop: 20, marginLeft: 10 }]}>
                                {"Total Players Selected:"} <Text style={[gstyles.OpenSans_Bold(18, 'green')]}>{totalSelectedPlayersCount}<Text style={[gstyles.OpenSans_Bold(12, '#000')]}>{"/11"}</Text></Text>
                            </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={[gstyles.OpenSans_Bold(12, '#000000'), { marginVertical: 10, marginLeft: 10 }]}>
                                    {"Total Credits: "}<Text style={[gstyles.OpenSans_Bold(18, '#000000')]}>{"100"}</Text>
                                </Text>
                                <Text style={[gstyles.OpenSans_Bold(12, '#000000'), { marginVertical: 10, marginRight: 10 }]}>
                                    {"Credits Remaining: "}<Text style={[gstyles.OpenSans_Bold(18, '#000000')]}>{100 - totalSelectedPlayersCredit}</Text>
                                </Text>
                            </View>
                        </View>

                        <FlatList
                            data={props.data}
                            keyExtractor={(item) => item.id}
                            renderItem={renderRole}
                            numColumns={2}
                        />
                        <Text style={[gstyles.OpenSans_Bold(12, 'red'), { marginVertical: 10, marginLeft: WIDTH * 0.25 }]}>
                            {totalSelectedPlayersCount > 11 ? "***Exceeded Players Count Limit***" :
                                totalSelectedPlayersCredit > 100 ? "***Exceed Credits Limit***" :
                                    null}
                        </Text>

                        <LinearGradient
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            colors={['#8338EC', '#3A86FF']} style={styles.gradientTouch}>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={styles.btnTouch}
                                onPress={() => {
                                    const teamCounts = {};
                                    let isValidSelection = true;
                                    selectedPlayers.forEach((player) => {
                                        const teamName = player.team;
                                        if (!teamCounts[teamName]) {
                                            teamCounts[teamName] = 1;
                                        } else {
                                            teamCounts[teamName] += 1;
                                        }
                                        if (teamCounts[teamName] > 7) {
                                            showToast('Maximum 7 players allowed from one team');
                                            isValidSelection = false;
                                        }
                                    });
                                    if (isValidSelection) {
                                        if (totalSelectedPlayersCount === 11 && totalSelectedPlayersCredit <= 100) {
                                            props.setStatus(3);
                                        } else if (totalSelectedPlayersCount < 11) {
                                            showToast('Please Select Exactly 11 Players');
                                        } else if (totalSelectedPlayersCredit > 100) {
                                            showToast('Credit Points Exceeded Limit!!!')
                                        }
                                    }
                                }}
                            >
                                <Text style={gstyles.OpenSans_SemiBold(20, '#FFFFFF')}>
                                    {"Proceed"}
                                </Text>
                            </TouchableOpacity>
                        </LinearGradient>

                        <PlayersPickingModal
                            isVisible={props.role !== ''}
                            role={props.role}
                            setRole={props.setRole}
                            players={props.players}
                            updateSelectedPlayer={(selectedPlayers, role) => {
                                console.log("role", role)
                                props.updateSelectedPlayer(selectedPlayers);
                                updateSelectedPlayerCount(role, selectedPlayers);
                            }}
                            updateSelectedPlayers={updateSelectedPlayers}
                            totalSelectedPlayersCount={totalSelectedPlayersCount}
                        />
                    </> : null}

                {
                    props.status >= 3 ?
                        <>
                            <View style={[styles.finalListHeadlines, { flexDirection: 'row' }]}>
                                <Text style={styles.finalListHeadline}>Name</Text>
                                <Text style={styles.finalListHeadline}>Credits</Text>
                                <Text style={styles.finalListHeadline}>Team</Text>
                                <Text style={styles.finalListHeadline}>Role</Text>
                            </View>
                            <FlatList
                                data={props.playersSelected}
                                keyExtractor={(item) => item.id}
                                renderItem={renderFinalList}
                            />
                            <LinearGradient
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                colors={['#8338EC', '#3A86FF']} style={styles.gradientTouch}>
                                <TouchableOpacity
                                    activeOpacity={0.6}
                                    style={styles.btnTouch}
                                    onPress={() => {
                                        props.setStatus(4)
                                        navigation.navigate('FinalTeam')
                                    }}
                                >
                                    <Text style={gstyles.OpenSans_SemiBold(18, '#FFFFFF')}>
                                        {"Finalize TEAM"}
                                    </Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </>

                        : null}
                <LoadingModel loading={props.isLoading} />
            </View >
        </>
    );
}

export default HomeComponent;

const styles = StyleSheet.create({

    header: {
        width: WIDTH,
        justifyContent: 'center',
        backgroundColor: '#4d51e4',
        ...gstyles.inRowJSB,
        paddingHorizontal: 20,
        height: HEIGHT * 0.25,
        borderBottomEndRadius: 70,
        borderBottomLeftRadius: 70,
        elevation: 50
    },
    AddIcon: {
        position: 'absolute',
        right: 15,
        bottom: 30,
        backgroundColor: '#197bd9',
        borderRadius: 50,
        width: 35,
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        elevation: 30
    },
    finalListRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin: 7,
        elevation: 3,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E6EC',
    },
    tableCell: {
        flex: 1,
        fontSize: 13,
        color: '#555555',
        textAlign: 'center',
    },
    finalListHeadlines: {
        backgroundColor: app_Bg,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
        marginTop: 20,
        borderColor: '#000',
        borderWidth: 0.5
    },
    finalListHeadline: {
        flex: 1,
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
    },

    gradientTouch: {
        width: WIDTH - 35,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 15
    },
    btnTouch: {
        width: WIDTH - 35,
        height: 50,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    feature: {
        marginLeft: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    float: {
        position: 'absolute',
        tintColor: '#197bd9'
    },
    ImageContainer: {
        flex: 1,
        margin: 20,
        width: WIDTH - 70,
        height: HEIGHT * 0.55,
        overflow: 'hidden',
        borderRadius: 25,
        elevation: 10,
        backgroundColor: 'F2F2F1'
    },
    Image: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        resizeMode: 'cover',
        opacity: 1,
    },

    share: {
        width: 22,
        height: 22,
        borderWidth: 0.6,
        borderColor: "#8338EC",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        bottom: 150,
        left: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    matchCard: {
        width: WIDTH * 0.9,
        height: 'auto',
        backgroundColor: app_Bg,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E5E6EC',
        justifyContent: 'center',
        marginHorizontal: 25,
        marginVertical: 17,
        elevation: 15
    },
    role: {
        width: WIDTH * 0.4,
        height: HEIGHT * 0.17,
        backgroundColor: app_Bg,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E5E6EC',
        elevation: 3,
        marginHorizontal: 20,
        marginVertical: 15
    },
    transCardView: {
        width: WIDTH - 35,
        alignSelf: 'center',
        marginVertical: 20,
        backgroundColor: app_Bg,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E5E6EC',
        elevation: 2,
    },

});