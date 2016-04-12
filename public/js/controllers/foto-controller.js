/**
 * Created by mfirm on 05/04/2016.
 */
angular.module('alurapic').controller('FotoController', function ($scope, $http, cadastroDeFotos, $routeParams) {
    
    $scope.foto = {};
    $scope.mensagem = '';

    if ($routeParams.fotoId) {
        $http.get('v1/fotos/' + $routeParams.fotoId)
            .success(function (foto) {
                $scope.foto = foto;
            })
            .error(function (erro) {
                $scope.mensagem = 'Não foi possível obter a foto de ID ' + $routeParams.fotoId;
                console.log(erro);
            });
    }

    $scope.submeter = function () {
        if($scope.formulario.$valid){
            cadastroDeFotos.cadastrar($scope.foto)
                .then( function (dados) {
                    $scope.mensagem = dados.mensagem;
                    if (dados.inclusao) {
                        $scope.foto = {};
                    }
                }).catch(function (dados) {
                    $scope.mensagem = dados.mensagem;
                });
        }
    };

/* COM HTTP:

 $http.put('v1/fotos/' + $scope.foto._id, $scope.foto)
 .success(function () {
 $scope.mensagem = 'Foto alterada com sucesso.';
 })
 .error(function (erro) {
 $scope.mensagem = 'Não foi possível alterar a Foto ' + $scope.foto.titulo;
 console.log(erro);
 });

 */


});