import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import HomeComponent from '../screens/HomeComponent';
import { getData } from '../services/rootService';
import { connect } from 'react-redux';
import { showToast } from '../components/ShowToast';

const HomeContainer = (props) => {
    const [status, setStatus] = useState(1);
    const [role, setRole] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log('Updated Players jhfvkhgbjbh:', props.players);
    }, [props.players]);

    const Matchdata = [
        { id: '1', team1: 'Melbourne Stars', team2: 'Perth Scorchers', imageUrl1: require('../assets/images/MLSW.png'), imageUrl2: require('../assets/images/PERW.png') },
        { id: '2', team1: 'Hobart Hurricanes', team2: 'Brisbane Heat', imageUrl1: require('../assets/images/HH.png'), imageUrl2: require('../assets/images/PERW.png') },
        { id: '3', team1: 'Sydney Thunder', team2: 'Adelaide Strikers', imageUrl1: require('../assets/images/MLSW.png'), imageUrl2: require('../assets/images/AS.jpg') },

    ];

    const data = [
        { id: '1', role: 'Batsman' },
        { id: '2', role: 'Bowler' },
        { id: '3', role: 'Wicket-Keeper' },
        { id: '4', role: 'All-Rounder' }

    ];

    const matches = async () => {
        setIsLoading(true);
        try {
            const response = await getData('fantasy-sports/Get_All_Players_of_match.json');
            console.log(response.length);

            if (response.statusCode === 200) {
                console.log("node response", response);
                if (response.errors) {
                    showToast(response.message);
                    setIsLoading(false);
                    return;
                } else {
                    setStatus(2);
                    const updatedPlayers = {};
                    for (const playerId in response) {
                        const player = response[playerId];
                        const { team_name, role, event_player_credit, name, event_total_points, team_id } = player;

                        if (team_name === 'Melbourne Stars' || team_name === 'Perth Scorchers') {
                            if (!updatedPlayers[team_name]) {
                                updatedPlayers[team_name] = {};
                            }

                            if (!updatedPlayers[team_name][role]) {
                                updatedPlayers[team_name][role] = [];
                            }

                            updatedPlayers[team_name][role].push({
                                team_id: team_id,
                                team_name: team_name,
                                credit: event_player_credit,
                                name: name,
                                credit_points: event_total_points,
                            });
                        }
                    }
                    setIsLoading(false);
                    setStatus(2);
                    props.updatePlayer(updatedPlayers);
                    console.log("updatedPlayers", updatedPlayers);
                }
            }
            else {
                setIsLoading(false);
                showToast('Network Error, Please Check your Network')
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error fetching data:", error);
            showToast("Error fetching data");
        }
    };

    return (
        <HomeComponent
            status={status}
            setStatus={setStatus}
            matches={matches}
            players={props.players}
            role={role}
            setRole={setRole}
            playersSelected={props.playersSelected}
            updateSelectedPlayer={props.updateSelectedPlayer}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            Matchdata={Matchdata}
            data={data} />
    );
};

const mapStateToProps = (state) => ({
    players: state.transactionsreducer.players,
    playersSelected: state.transactionsreducer.playersSelected,
});

const mapDispatchToProps = (dispatch) => ({
    updatePlayer: (players) => dispatch({ type: 'UPDATE_PLAYERS', payload: { players: players } }),
    updateSelectedPlayer: (playersSelected) => dispatch({ type: 'UPDATE_SELECTED_PLAYERS', payload: { playersSelected: playersSelected } })
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
