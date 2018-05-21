$ ( document ).ready(function() {
$.ajax({
    type: 'GET',
    url: 'http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22',
    dataType: 'json',
    success: function(data) {
        $.each(data, function(i, data) {
            var body = "<tr>";
            body    += "<td>" + data.id + "</td>";
            body    += "<td>" + data.name + "</td>";
            body    += "<td>" + data.cod + "</td>";
            body    += "</tr>";
            $( "#summary-table tbody" ).append(body);
        });
        /*DataTables instantiation.*/
        $( "#summary-table" ).DataTable();
    },
    error: function() {
         alert('Fail!');
    }
});
});
