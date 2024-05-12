import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ajax from '../Ajax';
import DealList from './DealList';
import DealDetail from "./DealDetail";
import SearchBar from "./SearchBar";

class App extends React.Component{

    state = {
        deals: [],
        dealsFromSearch: [],
        currentDealId: null
    }

    async componentDidMount(){
        const deals = await ajax.fetchInitialsDeals();        
        this.setState((prevState)=>{
            return { deals };
        })
    }

    searchDeals = async (searchTerm) =>{
        let dealsFromSearch = [];

        if (searchTerm){
            dealsFromSearch = await ajax.fetchDealsSearchResults(searchTerm);
            console.log("dealsFromSearch", dealsFromSearch);
        }
        this.setState( { dealsFromSearch });
    }    

    setCurrentDealId = (dealId) =>{
        this.setState({
            currentDealId: dealId
        })
    }

    unSetCurrentDealId = () =>{
        this.setState({
            currentDealId: null
        })
    }

    currentDeal = () =>{
        return this.state.deals.find(
            (deal) => deal.key === this.state.currentDealId
        )
    }

    render(){
        
        if (this.state.currentDealId){
            return (
                <View style={styles.main}>
                    <DealDetail initialDealData={this.currentDeal()} onBack={this.unSetCurrentDealId}/>
                </View>
            )
        }
        const dealsToDisplay = this.state.dealsFromSearch.length > 0 ? this.state.dealsFromSearch : this.state.deals;
        if (dealsToDisplay.length > 0){
            return (
                <View style={styles.main}>
                    <SearchBar searchDeals={this.searchDeals}/>
                    <DealList deals={dealsToDisplay} onItemPress={this.setCurrentDealId} />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Text style={styles.header}>Bake Sale</Text> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }, 
    header: {
      fontSize: 40
    },
    main:{
        marginTop: 30
    }
  });

export default App;