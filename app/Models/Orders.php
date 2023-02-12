<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    use HasFactory;
    protected $table = 'orders';
    protected $guarded = [];
    
    function orderDetails() {
        return $this->hasMany(OrderDetails::class, 'order_id');
    }
}
