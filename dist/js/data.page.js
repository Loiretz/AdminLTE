// carregarTabela();
$("#meuBotao").click( function()
{
  //chamando pelo id
  $('#myModal').modal('show');
  console.log("cliclado pelo Seletor");

  $.ajax({
    //aqui da certo
    url: 'https://api.ieu.caiorondon.com.br/us/system/status',
    type: 'GET',
    dataType: 'text',

    success: function (result) {
      var resultado = JSON.parse(result);
      $("#nomeusermodal").html(resultado.type);
      $("#cpfusermodal").html(resultado.type);
      $("#idususermodal").html(resultado.type);
      $
      //fim do aqui certo
    },
    error: function (jqXHR, tranStatus, errorThrown) {
      alert('Status: ' + jqXHR.status + ' ' + jqXHR.statusText + '. ' +
      'Response: ' + jqXHR.responseText);
    }
  });
 //
});

$(".minhaClasse").click( function()
{
  console.log("Clicado pela classe");
});

$("#botaoModalInst").click( function()
{
  $('#modalInstituicao').modal('show');
});

$(".pop").on("click", function() {
   $('#imagepreview').attr('src', $(this).attr('src')); // here asign the image to the modal when the user click the enlarge link
   $('#imagemodal').modal('show'); // imagemodal is the id attribute assigned to the bootstrap modal, then i use the show function
});

// DOM -> Html


// pegando da medicao de tempo só pelo vrau.
// url: 'http://samples.openweathermap.org/data/2.5/find?q=London&units=metric&appid=b6907d289e10d714a6e88b30761fae22'
// type: 'GET'
// dataType: 'text',
// success: function (result) {
//   $.each
// var resultado = JSON.parse(result);
// $("#nomeusermodal").html(resultado.message);
// $("#cpfusermodal").html(resultado.message);
// $("#idususermodal").html(resultado.message);
// // $("#schoolusermodal").html(resultado.cod);
// // $("#imgcpfusermodal").html(resultado.count);
// $("#imgidusermodal").html(resultado.list.0.coord.lat);
// $("#statususermodal").html(resultado.list.0.coord.lat);
