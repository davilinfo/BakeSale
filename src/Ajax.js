const apiHost = "https://bakesaleforgood.com";
const staticJson = [
    {
        cause: {name: "Education"},
        charity:{name:"Top Charity"},
        description:"To achieve a deal it is necessary a proposal, what is the proposal?",
        key: "3c8c082e47323c2858b0898b39c045b39b6f5874133f77d89f9fe9c8034b2e1d",
        media: ["https://th.bing.com/th/id/OIP.0AFBLdtmibIvX5Idk3DnIAHaE7?rs=1&pid=ImgDetMain",
            "https://www.tiedonportailla.fi/aitirunot/aitienpaiva5.jpg"
            ],
        title: "Bake",
        price: 60000,
        user:{
            avatar: "https://th.bing.com/th/id/OIP.gsHVjKq_pcE0T144pPQSAgAAAA?rs=1&pid=ImgDetMain",
            name: "Davi Alves"
        },
        url: "https://freedom750.godaddysites.com/"
    },
    {
        cause: {name: "Education"},
        charity:{name:"Top Charity"},
        description:"Negotiation can be an art with a professional",
        key: "1f7101fe71011ba0872a2e069e8f26c98d6af9ebf8e67bb0c1a559fa9569aa6b",
        media: ["https://image.freepik.com/free-photo/businessman-shaking-hands-deal-negotiation-success_33794-233.jpg",
        "https://www.fortunebuilders.com/wp-content/uploads/2016/03/wholesale-deal.jpg"
        ],
        title: "Sale",
        price: 90000,
        user:{
            avatar: "https://img.genial.ly/5c8275c407f8252a12ad4fca/3f9e321c-47ee-4c33-b9d8-11564d278388.png",
            name: "Other user"
        },
        url: "https://www.aa.com"
    },
]

export default {
    async fetchInitialsDeals(){
        try {
            let response = await fetch(apiHost + '/api/deals');
            let responseJson = await response.json();            
            return responseJson ?? staticJson;
        }catch(error){                        
            return staticJson;            
        }
        
    },
    async fetchDealDetail(dealId){
        try {
            let response = await fetch(apiHost + '/api/deals/' + dealId);
            let responseJson = await response.json();            
            return responseJson ?? staticJson;
        }catch(error){                        
            return staticJson.find((deal)=> deal.key === dealId);            
        }
        
    },
    async fetchDealsSearchResults(searchTerm){
        try {
            let response = await fetch(apiHost + '/api/deals?searchTerm=' + searchTerm);
            let responseJson = await response.json();               
            return responseJson ?? filtered;
        }catch(error){                     
            let filtered = staticJson.filter(deal=> deal.title.match(searchTerm));            
            return filtered;            
        }
        
    }
}