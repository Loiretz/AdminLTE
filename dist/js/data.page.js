// Configuração da tabela

// $(document).ready(function() {
var table = $('#example1').DataTable({
  ajax:"json.txt",
  columns: [
    { "data": "nome" },
    { "data": "instituicao" },
    { "data": "situacao" }
  ],
  order: [[2, "desc"]],// ordenando pelo elemento 2 (data:salary)

  "createdRow": function ( row, data, index ) {
    if ( data['situacao'].replace(/[\$,]/g, '') == 'Pendente ') {
      $('td', row).eq(2).addClass('highlight');
    }
  }
});

$('#example1 tbody').on( 'click', 'tr', function () {
  var data = table.row( this ).data();
  //console.log(table.row( this ).data());
  console.log(data['situacao']);
  abrirModal(table.row(this).data());
} );

$(document).ready(function() {
  var data = table.row( this ).data();
  console.log("eu existo");
  //style.color = 'red';
});

function abrirModal(data){
  $('#nomeusermodal').html(data["nome"]);
  $('#idusermodal').html(data["matricula"]);
  $('#schoolusermodal').html(data["instituicao"]);
  $('#imgidusermodal').attr('src', data["foto_comprovante_matricula"]);
  $('#cpfusermodal').html(data["cpf"]);
  $('#imgcpfusermodal').attr('src', data["foto_cpf"]);
  $('#emailusermodal').html(data["email"]);
  $('#statususermodal').html(data["situacao"]);

  // document.getElementById("nomeusermodal").innerHTML = data["id"];
  $('#myModal').modal('show');
  // $('.modal-content').resizable({
  //     //alsoResize: ".modal-dialog",
  //     minHeight: 300,
  //     minWidth: 300
  // });
  // $('.modal-dialog').draggable();
  //
  // $('#myModal').on('show.bs.modal', function () {
  //     $(this).find('.modal-body').css({
  //         'max-height':'100%'
  //     });
  // });

}

//https://bootsnipp.com/snippets/PaoDr

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
