//funcoes js que atendem ao POST de login em login.html5shiv

$("#botaoLogin").click( function(){
  //verificar com o caio se essa estrutrura aqui ta correta.
  var vemail = $("#email").val();
  var vpassword = $("#password").val();
  var data = {email:vemail , password:vpassword}

  console.log(data)
  $.ajax({
    type: 'POST',
    url: 'https://api.ieu.caiorondon.com.br/as/auth/login',
    data: JSON.stringify(data),
    dataType: 'JSON',
    // beforeSend: function()
    success: function(response){
      Cookies.set('admin-ieu-token',response.data.token);
      window.location.replace("tables/data.html")
      //window.location= "tables/data.html";
    },//fim do success
    error: function(xhr, data){
      console.log(xhr.error);
      $('#modalErro').modal('show');

    }//fim do error
  });//fim do $.ajax
});
