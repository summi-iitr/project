 var cells = [
    {
         id:"total_govt_sponsored",
         query:`type='Sponsored' AND govt_pvt='GOVT.'`

    },
    {
        id:"total_govt_sponsored",
        query:`type='Sponsored' AND govt_pvt='GOVT.'`   
    }

 ]
 let populateNumberTable = (searchQuery)=>{
    console.log("searchQuery= ", + searchQuery)
    $.each(cells, (idx, cellData) =>{
        $.ajax({url: "/numberquery",
            type: "get", //send it through get method
            data: {
                q:  `${searchQuery} AND ${cellData.query}` 
            },
            success:(data=>{
                $(`#${cellData.id}`).text(data.length.toString())
            })
        })
    })
 }