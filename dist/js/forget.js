$('input').keypress(function(e) {
    if(e.which == 13) {
        $('#botaoLogin').trigger('click');
    }
});


$('#btnEnviar').click(function(){
  var vemail = $('#email').val();
  var data = {email : vemail}
  console.log(data);
  $.LoadingOverlay("show");
  $('#modalErro').modal("show");

  $.ajax({
    type: 'POST',
    url: 'https://api.ieu.caiorondon.com.br/as/auth/recovery-password',
    data: JSON.stringify(data),
    dataType: 'JSON',
    // beforeSend: function()
    success: function(response){
      $.LoadingOverlay("hide");
      //window.location= "tables/data.html";
    },//fim do success
    error: function(xhr, data){
      console.log(xhr.error);
      $.LoadingOverlay("hide");
      $('#modalErro').modal('show');

    }//fim do error
  });//fim do $.ajax
});
