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
  "columnDefs": [
    { "width": "10%", "targets": 0 },
    { "width": "30%", "targets": 2 },
    { "width": "20%", "targets": 3 }
  ],
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
    var status_html;

    usuarios = result.data;
    $(result.data).each(function( index, value ) {
      if(value.status === "CONFIRMED"){
        status_html = "<span class='label label-success'>Confirmado</span>";
      }
      else{
        status_html = "<span class='label label-danger'>Não confirmado</span>";
      }
      table.row.add( [
        value.cpf, value.name, value.university, status_html
      ] ).draw(true);
    });

  },
  error: function (jqXHR, tranStatus, errorThrown) {
    alert('Status: ' + jqXHR.status + ' ' + jqXHR.statusText + '. ' +
    'Response: ' + jqXHR.responseText);
  }
});

$("#btnApprove").click(function(){
  // console.log(user_selected["_id"]);
  var data = {
    "user_id":user_selected["_id"]
  };
  $.ajax({
    type: 'POST',
    url: 'https://api.ieu.caiorondon.com.br/as/student/approve',
    data: JSON.stringify(data),
    dataType: 'JSON',
    // beforeSend: function()
    headers: {
      "Authorization":"Bearer " + Cookies.get('admin-ieu-token')
    },
    success: function(response){
      //console.log(response);
      location.reload();
    },//fim do success
    error: function(xhr, data){
      console.log(xhr.error);
      // $('#modalErro').modal('show');

    }//fim do error
  });//fim do $.ajax
});

$("#btnDecline").click( function(){
  $("#modalTexto").modal('show');
});

//Click no botão Enviar
$('#btnDeclineSend').click(function(){
  // console.log(user_selected["_id"]); -- captura aqui o id do usuario
  // console.log($("#textDeclineArea").val()); -- captura aqui o texto digitado
  var data = {
    "user_id":user_selected["_id"],
    "reason":$("#textDeclineArea").val()
  };
  $.ajax({
    type: 'POST',
    url: 'https://api.ieu.caiorondon.com.br/as/student/decline',
    data: JSON.stringify(data),
    dataType: 'JSON',
    // beforeSend: function()
    headers: {
      "Authorization":"Bearer " + Cookies.get('admin-ieu-token')
    },
    success: function(response){
      //console.log(response);
      location.reload();
    },//fim do success
    error: function(xhr, data){
      console.log(xhr.error);
      // $('#modalErro').modal('show');

    }//fim do error
  });//fim do $.ajax
});

//Captura as informações da linha
$('#users_table tbody').on( 'click', 'tr', function () {
  user_selected = search_user(table.row( this ).data()[0]);
  openUserModal(user_selected);
  $.LoadingOverlay("show");
} );

$('#users_table tbody').hover(function() {
        $(this).css('cursor','pointer');
    });

$('#btnDesconectar').hover(function() {
        $(this).css('cursor','pointer');
    });

$('#btnDesconectar').click(function(){
  Cookies.remove;
  window.location.replace('../login.html');
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
