// Configuração da tabela
// console.log(Cookies.get('admin-ieu-token'));
// $(document).ready(function() {

var usuarios = null;

function search_user(cpf){
  var i = 0;

  for(i = 0; i < usuarios.length; i++){
    if (usuarios[i].cpf == cpf){
      return usuarios[i];
    }
  };

  return null;
}


var table = $('#example1').DataTable({

  order: [[3, "desc"]],// ordenando pelo elemento 2 (data:salary)
  //
  // "createdRow": function ( row, data, index ) {
  //   if ( data['situacao'].replace(/[\$,]/g, '') == 'Pendente ') {
  //     //nao funciona $('td', row).eq(2).addClass('highlight');
  //   }
  // }
});

$.ajax({
    //aqui da certo
    url: 'https://api.ieu.caiorondon.com.br/as/students',
    type: 'GET',
    headers: {
     "Authorization":"Bearer " + Cookies.get('admin-ieu-token')
   },
    success: function (result) {
      console.log(result)
      usuarios = result.data;
      search_user('');
      $(result.data).each(function( index, value ) {
         table.row.add( [
           value.cpf, value.name, value.university_id, value.status
         ] ).draw(true);
      });

    },
    error: function (jqXHR, tranStatus, errorThrown) {
      alert('Status: ' + jqXHR.status + ' ' + jqXHR.statusText + '. ' +
      'Response: ' + jqXHR.responseText);
    }
});


$('#example1 tbody').on( 'click', 'tr', function () {
  // var user = table.row( this );
  //console.log();
  var user = search_user(table.row( this ).data()[0])
  abrirModal(user);

  // $('#botaoConfirma').on('click',function(){
  //   data = "kct de agulha";
  //   console.log(data);
  //
  //   var ajax = new XMLLHttpRequest();
  //   ajax.open("POST","json.txt",true);
  //   ajax.setRe
} );


$(document).ready(function() {
  var data = table.row( this ).data();
  console.log("eu existo");
});

function abrirModal(data){
  $('#nomeusermodal').html(data["name"]);
  $('#idusermodal').html(data["student_id"]);
  $('#schoolusermodal').html(data["university_id"]);
  $('#imgidusermodal').attr('src', data["photo"]);
  $('#cpfusermodal').html(data["cpf"]);
  $('#imgcpfusermodal').attr('src', data["photo"]);
  $('#emailusermodal').html(data["email"]);
  $('#statususermodal').html(data["status"]);

  $('#myModal').modal('show');

  var flag_hide = false;

  if (data['status'] == "CONFIRMED"){
    flag_hide = true;
  }

  $('#botaoTexto').hide(flag_hide);
  $('#botaoConfirma').hide(flag_hide);
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

$("#botaoTexto").click( function(){
  $("#modalTexto").modal('show');
});
