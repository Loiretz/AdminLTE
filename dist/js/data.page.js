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
  var data = table.row( this ).data();
  // console.log(table.row( this ).data());
  abrirModal(table.row(this).data());
} );



function abrirModal(data){
  // $('#nomeusermodal').html(data["name"]);
  // $('#idusermodal').html(data["id"]);
  // $('#schoolusermodal').html(data["university"]);
  // $('#imgidusermodal').attr('src', data["doc_1"]);
  // $('#cpfusermodal').html(data["cpf"]);
  // $('#imgcpfusermodal').attr('src', data["doc_2"]);
  // $('#emailusermodal').html(data["email"]);
  // $('#statususermodal').html(data["status"]);

  $('#nomeusermodal').html(data["name"]);
  $('#idusermodal').html(data["id"]);
  $('#schoolusermodal').html(data["position"]);
  $('#imgidusermodal').attr('src', data["img_1"]);
  $('#cpfusermodal').html(data["start_date"]);
  $('#imgcpfusermodal').attr('src', data["img_2"]);
  $('#emailusermodal').html(data["office"]);
  $('#statususermodal').html(data["extn"]);




  // document.getElementById("nomeusermodal").innerHTML = data["id"];
  $('#myModal').modal('show');
}

// Preenchimento da tabela via API

// carregarTabela();
// $("#meuBotao").click( function()
// {
//   //chamando pelo id
//   $('#myModal').modal('show');
//   // console.log("cliclado pelo Seletor");
//
//   $.ajax({
//     //aqui da certo
//     url: 'https://api.ieu.caiorondon.com.br/us/system/status',
//     type: 'GET',
//     dataType: 'text',
//
//     success: function (result) {
//       var resultado = JSON.parse(result);
//       $("#nomeusermodal").html(resultado.data);
//       $("#cpfusermodal").html(resultado.type);
//       $("#idususermodal").html(resultado.info);
//       $
//       //fim do aqui certo
//     },
//     error: function (jqXHR, tranStatus, errorThrown) {
//       alert('Status: ' + jqXHR.status + ' ' + jqXHR.statusText + '. ' +
//       'Response: ' + jqXHR.responseText);
//     }
//   });
//  //
// });

$("#botaoTexto").click( function(){
  $("#modalTexto").modal('show');
});
