import React from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import PropTypes from 'prop-types';
import { priceDisplay } from "../util";
import ajax from '../Ajax';

class DealDetail extends React.Component{
    static propTypes = {
        initialDealData: PropTypes.object.isRequired,
        onBack: PropTypes.func.isRequired
    }

    state = {
        deal: this.props.initialDealData
    }

    async componentDidMount(){
        const fullDeal = await ajax.fetchDealDetail(this.state.deal.key);
        
        this.setState({
            deal: fullDeal
        });
    }

    render(){
        const { deal } = this.state;
        return (
            <View style={styles.deal}>
                <TouchableOpacity onPress={this.props.onBack} >
                    <Text style={[styles.detail, styles.backLink]}>Back</Text>
                </TouchableOpacity>
                <Image source={{uri: deal.media}} style={styles.Image}></Image>
                <View style={styles.info}>
                    <Text style={styles.title}>{deal.title}</Text>   
                    <View style={styles.footer}>
                        <Text style={styles.cause}>{deal.cause.name}</Text>
                        <Text style={styles.price}>{priceDisplay(deal.price)}</Text>                        
                    </View>                 
                </View>
                { deal.user && (
                <View style={styles.user}>
                    <Image source={{uri: deal.user.avatar}} style={styles.avatar}/>
                    <Text>{deal.user.name}</Text>
                </View>
                )}   
                <View style={styles.description}>
                    <Text>{deal.description}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deal: {
                   
    },
    Image:{
        width: "100%",
        height: 150,
        backgroundColor: "#ccc"
    },
    info: {
        alignItems: 'center'  
    },
    detail:{
        
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10,
        width: '100%',
        backgroundColor: 'rgba(237,149,45,0.4)'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop:15
    },
    cause: {
        flex: 2
    },
    price: {
        flex: 1,
        textAlign: 'right'
    },
    avatar:{
        width: 60,
        height:60
    },
    user:{

    },
    description:{

    },
    backLink: {
        marginLeft: 10,   
        marginBottom: 10,
        color: '#0645ad'     
    }
});

export default DealDetail;