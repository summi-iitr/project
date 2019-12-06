//let 



let changePermission = (email, bAdmin)=>{
    $.ajax({url: "/upgradeuser",
        type: "post", //send it through get method
        data: {
            email:  email,
            admin: bAdmin 
        },
        success:(data=>{
            alert("User Permission Changed")
        })
    })
    console.log("called"+ email + bAdmin)

}
let getButtonHtml = (item)=>{
    return `<button onclick="changePermission('${item.email}', '${item.admin}')">Make ${item.admin? 'Staff': 'Admin'}</button>`
}


let getUserHtml = (data) =>{
    let html = ""
    $.each(data, (idx, item) =>{
        html += `<tr><td>${item.name} </td><td> ${item.email}</td><td> ${(item.admin)? 'Admin': 'Staff'}</td><td>${getButtonHtml(item)}</td></tr>`
    })
    return html
}

$( document ).ready(()=>{
    $.get('/userinfo', (data)=>{
        $('#user').text(data.user)
        if(!data.admin){        
            $('.admin-ui').hide()
        }
        else{
            $.get('/allusers', (data)=>{
                let html = getUserHtml(data)
                $('#user_table').html(html)
            })      
        }   
    })

    var frm = $('#searchform');

    frm.submit(function (e) {

        e.preventDefault();
        console.log(frm.code)
        $.ajax({
            type: frm.attr('method'),
            url: frm.attr('action'),
            data: frm.serialize(),
            success: function (data) {
                $(`#total_num_projects`).text(data.results.length.toString())
                let results = `${data.results.length.toString()} Result(s)`
                $('#count').text(results)
                let html = tableify(data.results)
                $("#results_table").html(html)
                populateNumberTable(data.queryString)
                
            },
            error: function (data) {
                console.log('An error occurred.');
                console.log(data);
            },
        });
    });
})