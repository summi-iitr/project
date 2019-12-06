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

        $.ajax({
            type: frm.attr('method'),
            url: frm.attr('action'),
            data: frm.serialize(),
            success: function (data) {
                let results = `${data.length.toString()} Result(s)`
                $('#count').text(results)
                let html = tableify(data)
                $("#results_table").html(html)
                
            },
            error: function (data) {
                console.log('An error occurred.');
                console.log(data);
            },
        });
    });
})