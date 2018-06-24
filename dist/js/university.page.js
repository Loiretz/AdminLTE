var instituicao = null;
var instituicao_selected = null;

function search_university(instituicao){
  var i = 0;

  for(i = 0; i < instituicao.length; i++){
    if (instituicao[i].instituicao == instituicao){
      return instituicao[i];
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

var table = $('#university_table').DataTable({
  oder:[[1, "desc"]]
});

function openUserModal(data){
  $.ajax({
    //aqui da certo
    url: 'https://api.ieu.caiorondon.com.br/as/student/details?user_id=' + data["_id"] ,
    type: 'GET',
    headers: {
      "Authorization":"Bearer " + Cookies.get('admin-ieu-token')
    },
    success: function (result) {
      // console.log(result.data);
      var data = result.data;

      $('#nome-modal').html(data["name"]);
      $('#id-modal').html(data["student_id"]);
      $('#university-modal').html(data["university_id"]);
      $('#cpf-modal').html(data["cpf"]);
      $('#img-cpf-modal').attr('src', data["doc_1"]);
      $('#img-id-modal').attr('src', data["doc_2"]);
      $('#email-modal').html(data["email"]);
      $('#status-modal').html(data["status"]);

      if (data["status"] === "CONFIRMED"){
        $('#btnDecline').hide();
        $('#btnApprove').hide();
      }
      else{
        $('#btnDecline').show();
        $('#btnApprove').show();
      }

      $.LoadingOverlay("hide");
      $('#modalUserInfo').modal('show');
    },
    error: function (jqXHR, tranStatus, errorThrown) {
      alert('Status: ' + jqXHR.status + ' ' + jqXHR.statusText + '. ' +
      'Response: ' + jqXHR.responseText);
    }
  });
}


$('#university_table tbody').hover(function() {
        $(this).css('cursor','pointer');
    });

$('#university_table tbody').on( 'click', 'tr', function () {
  instituicao_selected = search_university(table.row( this ).data()[0]);
  openUserModal(instituicao_selected);
  $.LoadingOverlay("show");
} );



//-- FIM Tabela --

//Funções do Modal
$("#botaoModalInst").click( function()
{
  $('#modalInstituicao').modal('show');
});

// --FIM modal --

// $(".pop").on("click", function() {
//    $('#imagepreview').attr('src', $(this).attr('src'));
//    $('#imagemodal').modal('show');
// });
