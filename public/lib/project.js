//let 





$( document ).ready(()=>{
    $.get('/userinfo', (data)=>{
        $('#user').text(data.user)
        if(!data.admin){        
            $('.admin-ui').hide()
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