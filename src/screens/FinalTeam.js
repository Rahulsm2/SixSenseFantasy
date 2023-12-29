import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar, FlatList, TextInput } from 'react-native';
import { HEIGHT, OpenSans_Medium, WIDTH, app_Bg } from '../components/Constants';
import { getData } from '../services/rootService';
import { connect } from 'react-redux';
import { showToast } from '../components/ShowToast';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FinalTeam = (props) => {

    const [searchText, setSearchText] = useState('');
    const [filteredPlayers, setFilteredPlayers] = useState(props.playersSelected);
    const navigation = useNavigation();

    const renderFinalList = ({ item }) => {
        return (
            <View style={styles.finalListRow}>
                <Text style={[styles.finalListText, styles.tableCell, { fontWeight: 'bold', color: '#000' }]}>{item.name}</Text>
                <Text style={[styles.finalListText, styles.tableCell]}>{item.credit}</Text>
                <Text style={[styles.finalListText, styles.tableCell]}>{item.team}</Text>
                <Text style={[styles.finalListText, styles.tableCell]}>{item.role}</Text>
            </View>
        );
    };

    const handleSearch = () => {
        const lowerCaseSearchText = searchText.toLowerCase();
        const filteredList = props.playersSelected.filter(
            (player) =>
                player.name.toLowerCase().includes(lowerCaseSearchText) ||
                player.team.toLowerCase().includes(lowerCaseSearchText)
        );
        console.log("Filtered Players:", filteredList);
        setFilteredPlayers(filteredList);
    };


    const isSearchActive = searchText.trim().length > 0;
    const dataToRender = isSearchActive ? filteredPlayers : props.playersSelected;

    return (
        <>
            <View style={[styles.header, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
                <TouchableOpacity style={{ left: 20, position: 'absolute', top: 15 }} onPress={() => {
                    navigation.goBack();
                }}>
                    <Ionicons name='arrow-back-outline' size={30} color='#000000' />
                </TouchableOpacity>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search..."
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                    onSubmitEditing={handleSearch}
                />
            </View>
            <View style={[styles.finalListHeadlines, { flexDirection: 'row' }]}>
                <Text style={styles.finalListHeadline}>Name</Text>
                <Text style={styles.finalListHeadline}>Credits</Text>
                <Text style={styles.finalListHeadline}>Team</Text>
                <Text style={styles.finalListHeadline}>Role</Text>
            </View>
            <FlatList
                data={dataToRender}
                keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
                renderItem={renderFinalList}
            />
        </>
    )
}

const mapStateToProps = (state) => ({
    players: state.transactionsreducer.players,
    playersSelected: state.transactionsreducer.playersSelected,
});

const mapDispatchToProps = (dispatch) => ({
    updatePlayer: (players) => dispatch({ type: 'UPDATE_PLAYERS', payload: { players: players } }),
    updateSelectedPlayer: (playersSelected) => dispatch({ type: 'UPDATE_SELECTED_PLAYERS', payload: { playersSelected: playersSelected } })
});

export default connect(mapStateToProps, mapDispatchToProps)(FinalTeam);


const styles = StyleSheet.create({
    header: {
        padding: 10,
        backgroundColor: app_Bg,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backButton: {
        fontSize: 16,
        color: '#000',
    },
    searchBar: {
        flex: 1,
        marginLeft: 50,
        width: WIDTH * 0.7,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
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
})