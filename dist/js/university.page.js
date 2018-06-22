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

var table = $('#university_table').UniversityTable({

  order: [[3, "desc"]],// ordenando pelo elemento 2 (como fazer?)
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

    instituicao = result.data;
    // search_user('');
  },
  error: function (jqXHR, tranStatus, errorThrown) {
    alert('Status: ' + jqXHR.status + ' ' + jqXHR.statusText + '. ' +
    'Response: ' + jqXHR.responseText);
  }
});

$('#university_table tbody').on( 'click', 'tr', function () {
  university_selected = search_university(table.row( this ).data()[0]);
  openUniversityModal(instit_selected);
  $.LoadingOverlay("show");


} );

$('#university_table tbody').hover(function() {
        $(this).css('cursor','pointer');
    });

function openUniversityModal(data){
  $.ajax({
    url: 'https://api.ieu.caiorondon.com.br/as/student/details?user_id=' + data["_instituicao"] , // ver como vai ficar no documento
    type: 'GET',
    headers: {
      "Authorization":"Bearer " + Cookies.get('admin-ieu-token')
    },
    success: function (result) {
      var data = result.data;

      $('#university-modal').html(data["university_id"]); // (ver como vai ficar)
      $('#img-university-modal').attr('src', data["doc_2"]); // (ver como vai ficar)

      }

      $.LoadingOverlay("hide");
      $('#modalUniversityInfo').modal('show');
    },
    error: function (jqXHR, tranStatus, errorThrown) {
      alert('Status: ' + jqXHR.status + ' ' + jqXHR.statusText + '. ' +
      'Response: ' + jqXHR.responseText);
    }
  });
}
