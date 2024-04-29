const apiHost = "https://bakesaleforgood.com";
const staticJson = [
    {
        cause: {name: "Education"},
        key: "3c8c082e47323c2858b0898b39c045b39b6f5874133f77d89f9fe9c8034b2e1d",
        media: "https://th.bing.com/th/id/OIP.0AFBLdtmibIvX5Idk3DnIAHaE7?rs=1&pid=ImgDetMain",
        title: "Bake",
        price: 500
    },
    {
        cause: {name: "Education"},
        key: "1f7101fe71011ba0872a2e069e8f26c98d6af9ebf8e67bb0c1a559fa9569aa6b",
        media: "https://image.freepik.com/free-photo/businessman-shaking-hands-deal-negotiation-success_33794-233.jpg",
        title: "Sale",
        price: 900
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
        
    }
}