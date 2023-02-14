<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Order Confirmation</title>
    <style>
        .container {
            width: 80%;
            margin: 0 auto;
            text-align: center;
            font-family: Arial, sans-serif;
        }

        h1 {
            font-size: 36px;
            color: #333;
            margin-bottom: 20px;
        }

        .user-info {
            width: 100%;
            text-align: left;
            margin-bottom: 20px;
        }

        .user-info tr td {
            padding: 10px;
        }

        .products-table {
            width: 100%;
            text-align: left;
            margin-bottom: 20px;
        }

        .products-table tr th,
        .products-table tr td {
            padding: 10px;
        }

        .total-price {
            margin-top: 20px;
            font-size: 24px;
            color: #333;
        }
    </style>

</head>

<body>
    <div class="container">
        <h1>Order Confirmation</h1>
        <table class="user-info">
            <tr>
                <td><strong>First Name:</strong></td>
                <td>{{ $userData['first_name'] }}</td>
            </tr>
            <tr>
                <td><strong>Last Name:</strong></td>
                <td>{{ $userData['last_name'] }}</td>
            </tr>
            <tr>
                <td><strong>Mobile Number:</strong></td>
                <td>{{ $userData['mobile_num'] }}</td>
            </tr>
            <tr>
                <td><strong>Email:</strong></td>
                <td>{{ $userData['email'] }}</td>
            </tr>
            <tr>
                <td><strong>Address 1:</strong></td>
                <td>{{ $userData['address1'] }}</td>
            </tr>
            <tr>
                <td><strong>Address 2:</strong></td>
                <td>{{ $userData['address2'] }}</td>
            </tr>
            <tr>
                <td><strong>Country:</strong></td>
                <td>{{ $userData['country'] }}</td>
            </tr>
            <tr>
                <td><strong>State:</strong></td>
                <td>{{ $userData['state'] }}</td>
            </tr>
            <tr>
                <td><strong>City:</strong></td>
                <td>{{ $userData['city'] }}</td>
            </tr>
            <tr>
                <td><strong>Zip Code:</strong></td>
                <td>{{ $userData['zip_code'] }}</td>
            </tr>
        </table>
        <table class="products-table">
            <tr>
                <th>Name of Product</th>
                <th>Quantity</th>
            </tr>
            @foreach ($orderDetails as $product)
            <tr>
                <td>{{ $product->name }}</td>
                <td>{{ $product->quantity }}</td>
            </tr>
            @endforeach
        </table>
        <div class="total-price">
            <p><strong>Subtotal Price:</strong> ${{ number_format($orderData['subtotal']) }}</p>
            <p><strong>Shipping Price:</strong> ${{ $orderData['shippingPrice'] }}</p>
            <p><strong>Total Price:</strong> ${{ number_format($orderData['totalPrice']) }}</p>
        </div>
    </div>
</body>

</html>