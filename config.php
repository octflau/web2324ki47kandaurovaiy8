<?php
require_once 'vendor/autoload.php';

$google_client = new Google_Client();

$google_client->setClientId('863533518196-v7ieuvkb05srb5k3rafirq5hufu87udn.apps.googleusercontent.com');
$google_client->setClientSecret('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');

$google_client->setRedirectUri('http://localhost:8080/');
$google_client->addScope('email');
$google_client->addScope('profile');

session_start();
?>
