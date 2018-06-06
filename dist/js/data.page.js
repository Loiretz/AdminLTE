// Configuração da tabela

// $(document).ready(function() {
var table = $('#example1').DataTable({
  ajax:"colors.txt",
  columns: [
    { "data": "name" },
    { "data": "id" },
    { "data": "salary" }
  ],
  order: [[2, "desc"]],// ordenando pelo elemento 2 (data:salary)
});

$('#example1 tbody').on( 'click', 'tr', function () {
  // console.log(table.row( this ).data());
  abrirModal(table.row(this).data());
} );



function abrirModal(data){

//arrumar o argumento data[""] de acordo com o passado pelo json
  $('#nomeusermodal').val(data["id"]);
  $('#cpfusermodal').val(data["name"]);
  $('#idusermodal').val(data["position"]);

  conso


  $('modal').modal('show');
}

// Preenchimento da tabela via API

// carregarTabela();
$("#meuBotao").click( function()
{
  //chamando pelo id
  $('#myModal').modal('show');
  // console.log("cliclado pelo Seletor");

  // $.ajax({
  //   //aqui da certo
  //   url: 'https://api.ieu.caiorondon.com.br/us/system/status',
  //   type: 'GET',
  //   dataType: 'text',
  //
  //   success: function (result) {
  //     var resultado = JSON.parse(result);
  //     $("#nomeusermodal").html(resultado.type);
  //     $("#cpfusermodal").html(resultado.type);
  //     $("#idususermodal").html(resultado.type);
  //     $
  //     //fim do aqui certo
  //   },
  //   error: function (jqXHR, tranStatus, errorThrown) {
  //     alert('Status: ' + jqXHR.status + ' ' + jqXHR.statusText + '. ' +
  //     'Response: ' + jqXHR.responseText);
  //   }
  // });
 //
});

$("#botaoTexto").click( function(){
  $("#modalTexto").modal('show');
});
