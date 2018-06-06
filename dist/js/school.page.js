$("#botaoModalInst").click( function()
{
  $('#modalInstituicao').modal('show');
});

$(".pop").on("click", function() {
   $('#imagepreview').attr('src', $(this).attr('src'));
   $('#imagemodal').modal('show');
});
