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
      console.log(response);
      //window.location= "tables/data.html";
      //inserir aqui redirecionamento de página,
      //indicar o token e guarda-lo (COMO???)
    },//fim do success
    error: function(xhr, data){
      console.log(data);
    }//fim do error
});//fim do $.ajax

//so pra testes
//window.location= "tables/data.html";


// console.log("terminei e nao ta logado");

});


// beforeSend: function()
// {
//   $("btn-login").html('Validando login...');
// }//fim do beforeSend,
