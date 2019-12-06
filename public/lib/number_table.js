var cells = [
    {
         id:"total_govt_sponsored",
         query:`type='Sponsored' AND govt_pvt='GOVT.'`

    },
    {
        id:"total_nongovt_sponsored",
        query:`type='Sponsored' AND govt_pvt='PVT.'`   
    },
    {
        id:"total_internal_sponsored",
        query:`type='Sponsored' AND govt_pvt='IITP'`   
    },

    {
        id:"completed_govt_sponsored",
        query:`type='Sponsored' AND govt_pvt='GOVT.' AND status='Completed' `   
    },
    {
        id:"completed_nongovt_sponsored",
        query:`type='Sponsored' AND govt_pvt='PVT.' AND status='Completed'`   
    },
    {
        id:"completed_internal_sponsored",
        query:`type='Sponsored' AND govt_pvt='IITP' AND status='Completed'`   
    },
    {
        id:"running_govt_sponsored",
        query:`type='Sponsored' AND govt_pvt='GOVT.' AND status='Ongoing' `   
    },
    {
        id:"running_nongovt_sponsored",
        query:`type='Sponsored' AND govt_pvt='PVT.' AND status='Ongoing'`   
    },
    {
        id:"running_internal_sponsored",
        query:`type='Sponsored' AND govt_pvt='IITP' AND status='Ongoing'`   
    },


{
    id:"total_govt_consultancy",
    query:`type='Consultancy' AND govt_pvt='GOVT.'`

},
{
   id:"total_nongovt_consultancy",
   query:`type='Consultancy' AND govt_pvt='PVT.'`   
},
{
   id:"total_internal_consultancy",
   query:`type='Consultancy' AND govt_pvt='IITP'`   
},

{
   id:"completed_govt_consultancy",
   query:`type='Consultancy' AND govt_pvt='GOVT.' AND status='Completed' `   
},
{
   id:"completed_nongovt_consultancy",
   query:`type='Consultancy' AND govt_pvt='PVT.' AND status='Completed'`   
},
{
   id:"completed_internal_consultancy",
   query:`type='Consultancy' AND govt_pvt='IITP' AND status='Completed'`   
},
{
   id:"running_govt_consultancy",
   query:`type='Consultancy' AND govt_pvt='GOVT.' AND status='Ongoing' `   
},
{
   id:"running_nongovt_consultancy",
   query:`type='Consultancy' AND govt_pvt='PVT.' AND status='Ongoing'`   
},
{
   id:"running_internal_consultancy",
   query:`type='Consultancy' AND govt_pvt='IITP' AND status='Ongoing'`   
},

{
    id:"total_govt_other",
    query:`type<>'Sponsored' AND type <> 'Consultancy' AND govt_pvt='GOVT.'`

},
{
   id:"total_nongovt_other",
   query:`type<>'Sponsored' AND type <> 'Consultancy' AND govt_pvt='PVT.'`   
},
{
   id:"total_internal_other",
   query:`type<>'Sponsored' AND type <> 'Consultancy' AND govt_pvt='IITP'`   
},

{
   id:"completed_govt_other",
   query:`type<>'Sponsored' AND type <> 'Consultancy'AND govt_pvt='GOVT.' AND status='Completed' `   
},
{
   id:"completed_nongovt_other",
   query:`type<>'Sponsored' AND type <> 'Consultancy' AND govt_pvt='PVT.' AND status='Completed'`   
},
{
   id:"completed_internal_other",
   query:`type<>'Sponsored' AND type <> 'Consultancy' AND govt_pvt='IITP' AND status='Completed'`   
},
{
   id:"running_govt_other",
   query:`type<>'Sponsored' AND type <> 'Consultancy' AND govt_pvt='GOVT.' AND status='Ongoing' `   
},
{
   id:"running_nongovt_other",
   query:`type<>'Sponsored' AND type <> 'Consultancy' AND govt_pvt='PVT.' AND status='Ongoing'`   
},
{
   id:"running_internal_other",
   query:`type<>'Sponsored' AND type <> 'Consultancy' AND govt_pvt='IITP' AND status='Ongoing'`   
},
{
   id:"running_num_projects",
   query:`status='Ongoing'`   
},
{
   id:"completed_num_projects",
   query:`status='Completed'`   
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