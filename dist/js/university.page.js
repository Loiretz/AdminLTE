var usuarios = null;
var user_selected = null;

function search_user(cpf){
  var i = 0;

  for(i = 0; i < usuarios.length; i++){
    if (usuarios[i].cpf == cpf){
      return usuarios[i];
    }
  };
  return null;
}

//Funções relacionadas ao botão Desconectar superior
$('#btnDesconectar').hover(function() {
  $(this).css('cursor','pointer');
});
$('#btnDesconectar').click(function(){
  Cookies.remove;
  window.location.replace('../login.html');
});
// --FIM btnDesconectar--

//Funções a Tabela

var table = $('#university_table').DataTable({
  oder:[[1, "desc"]]
});

$.ajax({
  //aqui da certo
  url: 'https://api.ieu.caiorondon.com.br/as/students',
  type: 'GET',
  headers: {
    "Authorization":"Bearer " + Cookies.get('admin-ieu-token')
  },
  success: function (result) {
    usuarios = result.data;
    $(result.data).each(function( index, value ) {
      table.row.add( [
        value.university, value.name
      ] ).draw(true);
    });

  },
  error: function (jqXHR, tranStatus, errorThrown) {
    alert('Status: ' + jqXHR.status + ' ' + jqXHR.statusText + '. ' +
    'Response: ' + jqXHR.responseText);
  }
});
//Captura as informações da linha
$('#university_table tbody').on( 'click', 'tr', function () {
  user_selected = search_user(table.row( this ).data()[0]);
  console.log(user_selected);
  openUserModal();
  $.LoadingOverlay("show");
} );


$('#university_table tbody').hover(function() {
  $(this).css('cursor','pointer');
});
// -- FIM Captura --

function openUserModal(){
  // $.ajax({
  //   //aqui da certo
  //   url: 'https://api.ieu.caiorondon.com.br/as/student/details?user_id=' + data["_id"] ,
  //   type: 'GET',
  //   headers: {
  //     "Authorization":"Bearer " + Cookies.get('admin-ieu-token')
  //   },
  //   success: function (result) {
  //     var data = result.data;
  //     console.log(result.data);
  //
  //
  //     $.LoadingOverlay("hide");
  //     $('#modalInstituicao').modal('show');
  //   },
  //   error: function (jqXHR, tranStatus, errorThrown) {
  //     alert('Status: ' + jqXHR.status + ' ' + jqXHR.statusText + '. ' +
  //     'Response: ' + jqXHR.responseText);
  //   }
  // });
      $.LoadingOverlay("hide");
      $('#modalInstituicao').modal('show');

}

//Funções do Modal
$("#botaoModalInst").click( function()
{
  $('#modalInstituicao').modal('show');
});

// --FIM modal --
