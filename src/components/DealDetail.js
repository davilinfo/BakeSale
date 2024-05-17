import React from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, PanResponder, Animated, Dimensions, Button, Linking } from "react-native";
import PropTypes from 'prop-types';
import { priceDisplay } from "../util";
import ajax from '../Ajax';

class DealDetail extends React.Component{
    ImageXPos = new Animated.Value(0);
    imagePanResponder = PanResponder.create({
        onStartShouldSetPanResponder: ()=> true,
        onPanResponderMove: (evt, gs) => {
            this.ImageXPos.setValue(gs.dx);
        },
        onPanResponderRelease: (evt, gs) => {
            console.log('RELEASED');
            this.width = Dimensions.get('window').width;
            if (Math.abs(gs.dx) > this.width * 0.4){
                //swipe left or right based on signed
                const direction = Math.sign(gs.dx);
                Animated.timing(this.ImageXPos, {
                    toValue: direction * this.width,
                    duration: 250,
                    useNativeDriver: false
                }).start(()=> this.handleSwipe(-1 * direction));
            }else{
                Animated.spring(this.ImageXPos, {
                    toValue: 0,
                    useNativeDriver: false
                }).start();
            }
        }
    });

    handleSwipe = (indexDirection) => {
        if (!this.state.deal.media[this.state.imageIndex + indexDirection]){
            Animated.spring(this.ImageXPos, {
                toValue: 0,
                useNativeDriver: false
            }).start();
            return;
        }
        this.setState((prevState)=>({            
            imageIndex: prevState.imageIndex + indexDirection        
        }), ()=>{
            this.ImageXPos.setValue(indexDirection * this.width);
            Animated.spring(this.ImageXPos, {
                toValue: 0,
                useNativeDriver: false
            }).start();
        });
    }

    static propTypes = {
        initialDealData: PropTypes.object.isRequired,
        onBack: PropTypes.func.isRequired
    }

    state = {
        deal: this.props.initialDealData,
        imageIndex: 0
    }

    async componentDidMount(){
        const fullDeal = await ajax.fetchDealDetail(this.state.deal.key);
        
        this.setState({
            deal: fullDeal
        });
    }

    openDealUrl = () => {
        Linking.openURL(this.state.deal.url);
    }

    render(){
        const { deal } = this.state;          
        
        return (
            <View style={styles.deal}>
                <TouchableOpacity onPress={this.props.onBack} >
                    <Text style={[styles.detail, styles.backLink]}>Back</Text>
                </TouchableOpacity>                
                <Animated.Image 
                    {...this.imagePanResponder.panHandlers}
                    source={{uri: deal.media[this.state.imageIndex]}} 
                    style={[{left:this.ImageXPos}, styles.Image]}>
                </Animated.Image>
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
                <Button title="Buy this deal!" onPress={this.openDealUrl}>

                </Button>
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