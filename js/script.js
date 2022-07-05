function validarCPF(inputCPF){
    let soma = 0;
    let resto;
    
    inputCPF = inputCPF.replaceAll('.','').replaceAll('-','');

    if(inputCPF == '00000000000') return false;
    for(i=1; i<=9; i++) soma = soma + parseInt(inputCPF.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if((resto == 10) || (resto == 11)) resto = 0;
    if(resto != parseInt(inputCPF.substring(9, 10))) return false;
    soma = 0;
    
    for(i = 1; i <= 10; i++) soma = soma + parseInt(inputCPF.substring(i-1, i))*(12-i);
    resto = (soma * 10) % 11;

    if((resto == 10) || (resto == 11)) resto = 0;
    if(resto != parseInt(inputCPF.substring(10, 11))) return false;
    return true;
}
$(function(){
    
    jQuery.validator.addMethod("cpf", function(value, element) {
        return this.optional(element) || validarCPF(value);
    }, "CPF Inválido");

    const formValidator = $('#formCadastro').validate({
        rules: {
            cpf: {
                required: true,
                cpf: true,
            },
            dataNascimento: {
                required: true,
                date: true,
            },
            password: "required",
            email: {
                required: true,
                email: true,
                minlength: 10,
            },
            passwordConfirm: {
                equalTo: "#password"
            }
        },
        messages: {
            passwordConfirm: {
                equalTo: "As senhas devem ser iguais",
            }
        },
        submitHandler: function(form) {
            $('#formCadastro .container-alert').append('<div class="alert alert-success">Cadastro enviado</div>');
          },
    });

    $('#btnCancelar').on('click', function(){
        if(formValidator) {
            formValidator.resetForm();
        }
    });
});