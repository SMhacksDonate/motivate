<?php
require_once('vendor/autoload.php');

$stripe = array(
  "secret_key"      => "sk_test_5S2AffOt8Gcz1EhmKZEroqDC",
  "publishable_key" => "pk_test_tweCk7wsgWmhPQl30DGMfpro"
);

\Stripe\Stripe::setApiKey($stripe['secret_key']);
?>
