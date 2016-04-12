/**
 * Created by mfirm on 11/04/2016.
 */
angular.module('meusServicos', ['ngResource'])
.factory('recursoFoto', function ($resource) {
    return $resource('v1/fotos/:fotoId', null, {
        update : {
            method: 'PUT'
        }
    });
})
.factory('cadastroDeFotos', function (recursoFoto, $q, $rootScope) {
    var servico = {};

    servico.cadastrar = function (foto) {
        return $q(function (resolve, reject) {
            if(foto._id){
                recursoFoto.update({fotoId : foto._id}, foto, function () {
                    $rootScope.$broadcast('fotoCadastrada');
                    resolve({
                        mensagem : 'Foto alterada com sucesso.',
                        inclusao : false
                    });
                }, function (erro) {
                    reject({
                        mensagem : 'Não foi possível alterar a Foto ' + foto.titulo
                    });
                    console.log(erro);
                });
            } else {
                recursoFoto.save(foto, function () {
                    $rootScope.$broadcast('fotoCadastrada');
                    resolve({
                        mensagem : 'Foto incluída com sucesso.',
                        inclusao : true
                    });
                }, function (erro) {
                    reject({
                        mensagem : 'Foto não foi cadastrada.'
                    });
                    console.log(erro);
                });
            }
        });
    };

    return servico;
});