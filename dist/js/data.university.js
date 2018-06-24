var instituicoes = null;
var row_selected = null;

function search_user(cpf){
  var i = 0;

  for(i = 0; i < instituicoes.length; i++){
    if (instituicoes[i].cpf == cpf){
      return instituicoes[i];
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

//Funções da Tabela
var table = $('#university_table').DataTable({
  order: [[0, "desc"]],// ordenando pelo elemento 2
});

$.ajax({
  //aqui da certo
  url: 'https://api.ieu.caiorondon.com.br/as/students',
  type: 'GET',
  headers: {
    "Authorization":"Bearer " + Cookies.get('admin-ieu-token')
  },
  success: function (result) {
    var status_html;

    instituicoes = result.data;
    $(result.data).each(function( index, value ) {
      // if(value.doc_1 !== null){
      //   status_html = "<span class='label label-success'>Confirmado</span>";
      // }
      table.row.add( [
        value.cpf, value.name//status_html//value.name
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
  row_selected = search_user(table.row( this ).data()[0]);
  //console.log(row_selected);
  openUserModal(row_selected);
  $.LoadingOverlay("show");
} );

$('#university_table tbody').hover(function() {
  $(this).css('cursor','pointer');
});


//
function openUserModal(data){
  $.ajax({
    //aqui da certo
    url: 'https://api.ieu.caiorondon.com.br/as/student/details?user_id=' + data["_id"] ,
    type: 'GET',
    headers: {
      "Authorization":"Bearer " + Cookies.get('admin-ieu-token')
    },
    success: function (result) {
      //console.log(result.data);
      var data = result.data;

      $('#university-name-modal').html(data["cpf"]);
      $('#doc-modal').html(data["name"]);
      $('#img-doc-modal').attr('src', data["doc_1"]);


      $.LoadingOverlay("hide");
      $('#modalInstituicao').modal('show');
    },
    error: function (jqXHR, tranStatus, errorThrown) {
      alert('Status: ' + jqXHR.status + ' ' + jqXHR.statusText + '. ' +
      'Response: ' + jqXHR.responseText);
    }
  });
}
