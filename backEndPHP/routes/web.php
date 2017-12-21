<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/


$router->options(
    '/{any:.*}',
    [
        'middleware' => ['cors'],
        function (){
            return response(['status' => 'success']);
        }
    ]
);

// Route::get('/users/login', 'UsersController@getToken');

// postman

$router->group(['middleware' => ['cors']], function () use ($router) {
    $router->post('/users/login', ['uses' => 'UsersController@getToken']);

    $router->get('/', function () use ($router) {
        return $router->app->version();
    });

    $router->get('/key', function() {
        return str_random(32);
    });

    $router->post('/users', ['uses' => 'UsersController@createUser']);

    $router->group(['middleware' => ['auth']], function () use ($router) {
        $router->get('/users', ['uses' => 'UsersController@index']);


        $router->get('/products', ['uses' => 'ProductsController@index']);
        $router->post('/products', ['uses' => 'ProductsController@createProduct']);
        $router->put('/products/{product_id}', ['uses' => 'ProductsController@updateProduct']);
        $router->delete('/products/{product_id}', ['uses' => 'ProductsController@deleteProduct']);

        $router->get('/typeproduct', ['uses' => 'TypeProductsController@index']);
    });


});








