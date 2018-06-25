var instituicoes = null;
var row_selected = null;

function search_user(id){
  var i = 0;

  for(i = 0; i < instituicoes.length; i++){
    if (instituicoes[i].university_short_name == id){
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
  Cookies.remove();
  window.location.replace('../login.html');
});
// --FIM btnDesconectar--

//Funções da Tabela
var table = $('#university_table').DataTable({
  "columnDefs": [
    { "width": "10%", "targets": 0 },
    { "width": "90%", "targets": 1 }
  ],

  order: [[0, "desc"]],// ordenando pelo elemento 1
});

$.ajax({
  //aqui da certo
  url: 'https://api.ieu.caiorondon.com.br/as/universities ',
  type: 'GET',
  headers: {
    "Authorization":"Bearer " + Cookies.get('admin-ieu-token')
  },
  success: function (result) {
    var status_html;

    instituicoes = result.data;
    $(result.data).each(function( index, value ) {
      table.row.add( [
        value.university_short_name, value.university_name
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
  // console.log(row_selected);
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
    url: 'https://api.ieu.caiorondon.com.br/as/university/details?university_id=' + data["_id"] ,
    type: 'GET',
    headers: {
      "Authorization":"Bearer " + Cookies.get('admin-ieu-token')
    },
    success: function (result) {
      console.log(result.data);
      var data2 = result.data;
      // 
      // $('#university-name-modal').html(data["university_name"]);
      // $('#doc-modal').html(data["university_short_name"]);
      $('#img-doc-modal').attr('src', data2["doc"]);


      $.LoadingOverlay("hide");
      $('#modalInstituicao').modal('show');
    },
    error: function (jqXHR, tranStatus, errorThrown) {
      alert('Status: ' + jqXHR.status + ' ' + jqXHR.statusText + '. ' +
      'Response: ' + jqXHR.responseText);
      $.LoadingOverlay("hide");
    }
  });
}
