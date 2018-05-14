// carregarTabela();



$("#meuBotao").click( function()
{
  $('#myModal').modal('show');
//
  $.ajax({
    url: 'https://api.ieu.caiorondon.com.br/us/system/status',
    type: 'GET',
    dataType: 'text',
    success: function (result) {
      var resultado = JSON.parse(result);
      console.log(resultado.type);
      $("#nomeusuariomodal").html(resultado.type);
    },
    error: function (jqXHR, tranStatus, errorThrown) {
      alert('Status: ' + jqXHR.status + ' ' + jqXHR.statusText + '. ' +
      'Response: ' + jqXHR.responseText);
    }
  });
// }

  console.log({'chave': 'valor', 'chave2': 'valor2'});
});

$(".minhaClasse").click( function()
{
  console.log("Clicado pela classe");
});

// DOM -> Html
