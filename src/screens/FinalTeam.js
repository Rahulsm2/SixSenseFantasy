import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar, FlatList } from 'react-native';
import { HEIGHT, OpenSans_Medium, WIDTH, app_Bg } from '../components/Constants';
import { getData } from '../services/rootService';
import { connect } from 'react-redux';
import { showToast } from '../components/ShowToast';

const FinalTeam = (props) => {


    const renderFinalList = ({ item }) => (
        <View style={styles.finalListRow}>
            <Text style={[styles.finalListText, styles.tableCell, { fontWeight: 'bold', color: '#000' }]}>{item.name}</Text>
            <Text style={[styles.finalListText, styles.tableCell]}>{item.credit}</Text>
            <Text style={[styles.finalListText, styles.tableCell]}>{item.team}</Text>
            <Text style={[styles.finalListText, styles.tableCell]}>{item.role}</Text>
        </View>
    );
    return (
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