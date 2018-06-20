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

var table = $('#users_table').DataTable({

  order: [[3, "desc"]],// ordenando pelo elemento 2
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
      // search_user('');
      $(result.data).each(function( index, value ) {
         table.row.add( [
           value.cpf, value.name, value.university, value.status
         ] ).draw(true);
      });

    },
    error: function (jqXHR, tranStatus, errorThrown) {
      alert('Status: ' + jqXHR.status + ' ' + jqXHR.statusText + '. ' +
      'Response: ' + jqXHR.responseText);
    }
});

$("#btnDecline").click( function(){
  $("#modalTexto").modal('show');
});

//Click no botão Enviar
$('#btnDeclineSend').click(function(){
  // console.log(user_selected["_id"]); -- captura aqui o id do usuario
  // console.log($("#textDeclineArea").val()); -- captura aqui o texto digitado
});

//Captura as informações da linha
$('#users_table tbody').on( 'click', 'tr', function () {
  user_selected = search_user(table.row( this ).data()[0]);
  openUserModal(user_selected);
} );

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
         console.log(result.data);
         var data = result.data;

         $('#nome-modal').html(data["name"]);
         $('#id-modal').html(data["student_id"]);
         $('#university-modal').html(data["university_id"]);
         $('#cpf-modal').html(data["cpf"]);
         $('#img-cpf-modal').attr('src', data["photo"]);
         $('#img-id-modal').attr('src', data["doc_2"]);
         $('#email-modal').html(data["email"]);
         $('#status-modal').html(data["status"]);

         var flag_hide = false;

         if (data["status"] == "CONFIRMED"){
           flag_hide = true;
         }

         $('#botaoTexto').hide(flag_hide);
         $('#botaoConfirma').hide(flag_hide);
         $('#modalUserInfo').modal('show');
      },
      error: function (jqXHR, tranStatus, errorThrown) {
        alert('Status: ' + jqXHR.status + ' ' + jqXHR.statusText + '. ' +
        'Response: ' + jqXHR.responseText);
      }
  });
}
