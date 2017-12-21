<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    function index(Request $request) {

        if($request->isJson()) {
            // Eloquent
            $product =  Product::with('type_product')->get();


            return response()->json($product, 200);
        }

        return response()->json(['error' => 'Unauthorized'], 401, []);
    }

    function createProduct(Request $request){
        if($request->isJson()) {
            $data = $request->json()->all();


            $product = Product::create([
                'name' => $data['name'],
                'price' => $data['price'],
                'description' => $data['description'],
                'id_type_product' => $data['id_type_product'],
            ]);
            return response()->json($product, 201);
        }

        return response()->json(['error' => 'Unauthorized'], 401, []);
    }

    function updateProduct(Request $request, $id) {
        if($request->isJson()) {
            $product = Product::find($id);

            if(!$product){
                return response()->json(['message' => "The user with {$id} doesn't exist"], 404);
            }

            $product->name = $request->get('name');
            $product->price = $request->get('price');
            $product->description = $request->get('description');
            $product->id_type_product = $request->get('id_type_product');

            $product->save();


            return response()->json($product, 200);
        }

        return response()->json(['error' => 'Unauthorized'], 401, []);
    }

    function deleteProduct(Request $request, $id) {
        if($request->isJson()) {
            $product = Product::find($id);

            if(!$product){
                return response()->json(['message' => "The user with {$id} doesn't exist"], 404);
            }


            $product->delete();


            return response()->json($product, 200);
        }

        return response()->json(['error' => 'Unauthorized'], 401, []);
    }
}
