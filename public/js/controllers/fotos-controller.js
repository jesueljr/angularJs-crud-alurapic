/**
 * Created by mfirm on 31/03/2016.
 */
angular.module('alurapic').controller('FotosController', function ($scope, recursoFoto) {

    $scope.fotos = [];
    $scope.filtro = '';
    $scope.mensagem = '';

    recursoFoto.query(function (fotos) {
        $scope.fotos = fotos;
    }, function (erro) {
        console.log(erro);
    });

    $scope.remover = function (foto) {
        recursoFoto.delete({fotoId: foto._id}, function () {
            var indiceFoto = $scope.fotos.indexOf(foto);
            $scope.fotos.splice(indiceFoto, 1);
            $scope.mensagem = 'Foto '+ foto.titulo + ' excluída com sucesso.';
        }, function (erro) {
            $scope.mensagem = 'Foto não foi excluída.';
            console.log(erro);
        });
    };

/*  com HTTP
   $http.get('v1/fotos')
    .success(function (fotos) {
        $scope.fotos = fotos;
    })
    .error(function (error) {
        console.log(error);
    });

    $scope.remover = function (foto) {
        $http.delete('v1/fotos/' + foto._id)
        .success(function (fotos) {
            var indiceFoto = $scope.fotos.indexOf(foto);
            $scope.fotos.splice(indiceFoto, 1);
            $scope.mensagem = 'Foto '+ foto.titulo + ' excluída com sucesso.';
        })
        .error(function (error) {
            $scope.mensagem = 'Foto não foi excluída.';
            console.log(erro);
        });
    };
 */
    /*promise.then(function (retorno) {
        $scope.fotos = retorno.data;
    }).catch(function (error) {
        console.log(error);
    });*/

});