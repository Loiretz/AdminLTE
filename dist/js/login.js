//funcoes js que atendem ao POST de login em login.html5shiv

$("#botaoLogin").click( function(){
  console.log("cliquei");

  //verificar com o caio se essa estrutrura aqui ta correta.
  var email = $("#email").val();
  var password = $("#password").val();
  var data = {email:email,password:password}

  if (email !== "" || password !== "")
  {
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
          window.location.replace= "tables/data.html";
          //inserir aqui redirecionamento de página,
          //indicar o token e guarda-lo (COMO???)
        }//fim do success
      }
    )//fim do $.ajax
    console.log("terminei e tu nao ta logado");
    //so pra testes
    window.location.replace= "tables/data.html";


  }// fim do if

})


// beforeSend: function()
// {
//   $("btn-login").html('Validando login...');
// }//fim do beforeSend,
