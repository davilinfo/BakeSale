import React from "react";
import PropTypes from 'prop-types';
import { StyleSheet, TextInput, View } from "react-native";
import debounce from 'lodash.debounce';

class SearchBar extends React.Component{
    static propTypes={
        searchDeals: PropTypes.func.isRequired
    }

    state ={
        searchTerm: '',
    }

    debouncedSearchDeals = debounce(this.props.searchDeals, 3000);

    handleChange = (searchTerm) =>{        
        this.setState({ searchTerm }, ()=>{
            this.debouncedSearchDeals(this.state.searchTerm);
        });
    }

    render(){
        return (
            <View>
                <TextInput 
                        style={styles.input} 
                        placeholder="Search all deals"
                        onChangeText={this.handleChange}>
                </TextInput>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    input:{
        height: 40,
        marginHorizontal: 12
    }
});

export default SearchBar;