<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductsController extends Controller
{
    //
    function getAllProducts() {
        $products = Products::all();
        return $products;
    }
    function getRecentProducts() {
        $products = Products::all()->where('category', 'smartphones');
        return $products;
    }
    function getFeaturedProducts() {
        $products = Products::all()->where('category', 'laptops');
        return $products;
    }
    function getProductByID(Request $request) {
        $id = $request->id;
        $product = Products::find($id);
        return $product;
    }
    function getProductsBySearch(Request $request) {
        $categoryName = $request->query('categoryname');
        $brandName = $request->query('brandName');
        $keyword = $request->query('keyword');
        $sort = $request->query('sort');

        $query = DB::table('products');

        if ($categoryName) {
            $query->where('category', $categoryName);
        }
        if ($brandName) {
            $query->where('brand', $brandName);
        }

        if ($keyword) {
            $query->where(function ($query) use ($keyword) {
                 $query->where('title', 'like', '%' . $keyword . '%')
                    ->orWhere('category', 'like', '%' . $keyword . '%');
             });
        }

        if ($sort === 'low_price') {
            $query->orderBy('price', 'asc');
        } else if ($sort === 'high_price') {
            $query->orderBy('price', 'desc');
        } else if ($sort === 'rating') {
            $query->orderBy('rating', 'desc');
        } else if ($sort === 'stock') {
            $query->orderBy('stock', 'desc');
        }

        $minPrice = $request->query('min_price');
        $maxPrice = $request->query('max_price');
        if ($minPrice && $maxPrice) {
            $query->where('price', '>=', $minPrice)->where('price', '<=', $maxPrice);
        }
        $products = $query->get();
        $sortCount = $products->count();
        if ($sortCount == 0){
            return response()->json("Sorry, No Products avaliable upon your selections. Maybe try another selection?", 200);
        }else{
            return response()->json(['products'=>$products, 'sortCount' =>$sortCount], 200);
        }
    }
}
