import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import PropTypes from 'prop-types';
import { priceDisplay } from "../util";
import ajax from '../Ajax';

class DealDetail extends React.Component{
    static propTypes = {
        initialDealData: PropTypes.object.isRequired
    }

    state = {
        deal: this.props.initialDealData
    }

    async componentDidMount(){
        const fullDeal = await ajax.fetchDealDetail(this.state.deal.key);
        console.log("deal ", fullDeal);
        this.setState({
            deal: fullDeal
        });
    }

    render(){
        const { deal } = this.state;
        return (
            <View style={styles.deal}>
                <Image source={{uri: deal.media}} style={styles.Image}></Image>
                <View style={styles.info}>
                    <Text style={styles.title}>{deal.title}</Text>   
                    <View style={styles.footer}>
                        <Text style={styles.cause}>{deal.cause.name}</Text>
                        <Text style={styles.price}>{priceDisplay(deal.price)}</Text>                        
                    </View>                 
                </View>
                <Text>...</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deal: {
        marginHorizontal: 12,
        marginTop: 50
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

export default DealDetail;