import React,{useState} from 'react';
import EditProfileComponent from '../../components/Profile/EditProfileComponent';
import { useNavigation } from '@react-navigation/core';
import { connect } from 'react-redux';
import { postData } from '../../services/rootService';
import {getToken} from '../../services/persistData';
import { showToast } from '../../components/common/ShowToast';

const EditProfileContainer = (props) => {
    
    const [name, setName] = useState(props.userData.first_name);
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();

    const onClickBack = () => {
        navigation.goBack();
    }

    return (
        <EditProfileComponent
            onClickBack={onClickBack}
            name={name}
            setName={setName}
            isLoading={isLoading}
            userData={props.userData}
        />
    );
}

// export default EditProfileContainer;
const mapStateToProps = state => ({
    userData: state.userreducer.userData
  });
  
  
  const mapDispatchToProps = dispatch => ({
    updateuser:(userData) => dispatch({type: 'UPDATE_USERDATA', payload: {userData:userData}})
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(EditProfileContainer)