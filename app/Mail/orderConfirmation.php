<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class orderConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public $userData;
    public $orderDetails;
    public $orderData;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($userData, $orderDetails, $orderData)
    {
        //
        $this->userData = $userData;
        $this->orderDetails = $orderDetails;
        $this->orderData = $orderData;
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function content()
    {
        return new Content(
            // view: 'view.name',
        );
    }
    public function build()
    {
        return $this->view('email.orderConfirmation')
                ->subject('Order Confirmation!')->with([
                    'userData' => $this->userData,
                    'orderDetails' => $this->orderDetails,
                    'orderData' => $this->orderData
                ]);
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments()
    {
        return [];
    }
}
