$( document ).ready(()=>{
    $.get('/userinfo', (data)=>{
        $('#user').text(data.user)
        if(!data.admin){
            
            $('.admin-ui').hide()

        }
        
    })
})