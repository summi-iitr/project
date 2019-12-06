 var cells = [
     {
         id:"",
         query:""

    }
 ]
 let populateNumberTable = (searchQuery, frm)=>{
    $.each(cells, (idx, cellData) =>{
        $.ajax({url: "/numberquery",
            type: "post", //send it through get method
            data: {
                q:  `SELECT * FROM project_users WHERE ${(searchQuery)?`searchQuery} AND ${cellData.query}`: cellData.query}` 
            },
            success:(data=>{
                $(`#${cellData.id}`).text(data.length.toString())
            })
        })
    })
 }