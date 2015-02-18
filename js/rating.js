$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var nome = $("input#nome").val();
            var opniao = $("input#opniao").val();
            var informativo = $("textarea#informativo").val();
            var incentivo = $("textarea#incentivo").val();
            var mensagem = $("textarea#mensagem").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "././mail/rating.php",
                type: "POST",
                data: {
                    nome: nome,
                    opniao: opniao,
                    informativo: informativo,
                    incentivo: incentivo,
                    mensagem: mensagem
                },
                cache: false,
                success: function() {
                    // Success message
                    $('#ratingSuccess').html("<div class='alert alert-success'>");
                    $('#ratingSuccess > .alert-success').html("<button type='button' class='close' data-dismiss='modal' data-toggle='modal' href='#complete' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#ratingSuccess > .alert-success')
                        .append("<strong>Sua mensagem foi enviada.</strong>");
                    $('#ratingSuccess > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#ratingForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#ratingSuccess').html("<div class='alert alert-danger'>");
                    $('#ratingSuccess > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#ratingSuccess > .alert-danger').append("<strong>Desculpe " + firstName + ", mas meu servidor não está respondendo. Por favor, tente novamente mais tarde!");
                    $('#ratingSuccess > .alert-danger').append('</div>');
                    //clear all fields
                    $('#ratingForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#ratingSuccess').html('');
});
