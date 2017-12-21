<?php

namespace App\Http\Controllers;

use App\Type_product;
use Illuminate\Http\Request;

class TypeProductsController extends Controller
{
    function index(Request $request) {

        if($request->isJson()) {
            // Eloquent
            $product =  Type_product::all();


            return response()->json($product, 200);
        }

        return response()->json(['error' => 'Unauthorized'], 401, []);
    }
}
