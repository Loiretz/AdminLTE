//funcoes js que atendem ao POST de login em login.html5shiv

$("#botaoLogin").click( function(){
  //verificar com o caio se essa estrutrura aqui ta correta.
  var vemail = $("#email").val();
  var vpassword = $("#password").val();
  var data = {email:vemail , password:vpassword}

  if (email !== "" || password !== "")
  {
    console.log("TO RODANDO O IF");
    $.ajax({
        type: 'POST',
        url: 'https://api.ieu.caiorondon.com.br/as/auth/login',
        data: data,
        dataType: 'JSON',
        // beforeSend: function()
        success: function(response){
          var msg = "";
          if(response == 1)
          console.log("terminei, tu ta logado e vou te mandar pra outra pagina");
          //window.location= "tables/data.html";
          //inserir aqui redirecionamento de página,
          //indicar o token e guarda-lo (COMO???)
        }//fim do success
      }
    )//fim do $.ajax

    //so pra testes
    //window.location= "tables/data.html";


  }// fim do if
  else {
    console.log("terminei e nao ta logado");
  }

});


// beforeSend: function()
// {
//   $("btn-login").html('Validando login...');
// }//fim do beforeSend,
