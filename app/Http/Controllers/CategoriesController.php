<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\Products;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    //
    function getCategories() {
        $categories = Categories::leftJoin('products', 'categories.name', '=', 'products.category')
        ->selectRaw('categories.name, count(products.id) as count')
        ->groupBy('categories.name')
        ->get();
        return $categories;
    }
}
