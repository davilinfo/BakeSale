import React from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import PropTypes from 'prop-types';
import { priceDisplay } from "../util";

class DealItem extends React.Component{
    static propTypes = {
        deal: PropTypes.object.isRequired,
        onPress: PropTypes.func.isRequired
    }
    
    handlePress =(e)=>{
        this.props.onPress(this.props.deal.key)
    }

    render(){
        const { deal } = this.props;
        return (
            <TouchableOpacity style={styles.deal} onPress={this.handlePress}>
                <Image source={{uri: deal.media[0]}} style={styles.Image}></Image>
                <View style={styles.info}>
                    <Text style={styles.title}>{deal.title}</Text>   
                    <View style={styles.footer}>
                        <Text style={styles.cause}>{deal.cause.name}</Text>
                        <Text style={styles.price}>{priceDisplay(deal.price)}</Text>                        
                    </View>                 
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    deal: {
        marginHorizontal: 12,
        marginTop: 12
    },
    Image:{
        width: "100%",
        height: 150,
        backgroundColor: "#ccc"
    },
    info: {
        padding: 10,
        backgroundColor: '#fff',
        borderColor: '#bbb',    
        borderWidth: 1,
        borderTopWidth: 0    
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5
    },
    footer: {
        flexDirection: 'row'
    },
    cause: {
        flex: 2
    },
    price: {
        flex: 1,
        textAlign: 'right'
    }
});

export default DealItem;