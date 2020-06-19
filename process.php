<?php
//SharpPoint Code

$baseURL = "https://app-3QNACE8C9E.marketingautomation.services/webforms/receivePostback/MzawMDEzMDExBgA/";
$endPoint = "3436d9b7-9ad8-4ba7-b141-f9a5cb174638";

        // Prepare parameters 
	$params = "";
	if (!empty($_POST['firstname'])) {
		$params = $params . "firstname=" . urlencode($_POST['firstname']) . "&";
	}
	if (!empty($_POST['lastname'])) {
		$params = $params . "lastname=" . urlencode($_POST['lastname']) . "&";
	}
	if (!empty($_POST['email'])) {
		$params = $params . "email=" . urlencode($_POST['email']) . "&";
	}
	if (!empty($_POST['phone'])) {
		$params = $params . "phone=" . urlencode($_POST['phone']) . "&";
	}
	/* if (!empty($_POST['message'])) {
		$params = $params . "Message=" . urlencode($_POST['message']);
	} */
	if (!empty($_POST['message'])) {
		$params = $params . "message=" . urlencode($_POST['message']) . "&";
	}

	if (isset($_COOKIE['__ss_tk'])) {
		$trackingid__sb = $_COOKIE['__ss_tk'];
		$params = $params . "trackingid__sb=" . urlencode($trackingid__sb);
	}

        // Prepare URL
	$ssRequest = $baseURL . $endPoint . "/jsonp/?" . $params;
    //echo json_encode($ssRequest);

        // Send request
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $ssRequest); 
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$result = curl_exec($ch);
    echo json_encode($result);
	curl_close($ch);

?>