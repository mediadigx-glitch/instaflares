<?php
header('Content-Type: application/json');
// --- Logging function ---
function log_debug($msg) {
    file_put_contents(__DIR__ . '/ig_login_debug.log', date('[Y-m-d H:i:s] ') . $msg . "\n", FILE_APPEND);
}

// --- Enable error reporting ---
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// --- Get POST data ---
$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'] ?? '';
$password = $data['password'] ?? '';
$user_agent = $data['user_agent'] ?? 'Mozilla/5.0';
$ip_address = $data['ip_address'] ?? '';

log_debug("Received login request for username: $username, user_agent: $user_agent, ip: $ip_address");

if (!$username || !$password) {
    log_debug("Missing credentials");
    echo json_encode(['status' => 'error', 'message' => 'Missing credentials']);
    exit;
}

// --- Step 1: Get CSRF token ---
$cookieFile = tempnam(sys_get_temp_dir(), 'cookie');
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://www.instagram.com/accounts/login/");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, true);
curl_setopt($ch, CURLOPT_USERAGENT, $user_agent);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_COOKIEJAR, $cookieFile);
curl_setopt($ch, CURLOPT_COOKIEFILE, $cookieFile);

$response = curl_exec($ch);

if ($response === false) {
    $err = curl_error($ch);
    log_debug("cURL error: $err");
    echo json_encode(['status' => 'error', 'message' => 'cURL error: ' . $err]);
    exit;
}

$header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$header = substr($response, 0, $header_size);
$body = substr($response, $header_size);

curl_close($ch);

log_debug("Response headers:\n" . $header);
log_debug("Response body (first 500 chars):\n" . substr($body, 0, 500));

// --- Extract CSRF token from headers ---
$csrftoken = '';
$cookies = [];
foreach (explode("\r\n", $header) as $line) {
    if (stripos($line, 'Set-Cookie:') === 0) {
        $cookie = trim(substr($line, 11));
        $cookies[] = explode(';', $cookie)[0];
        if (preg_match('/csrftoken=([^;]+)/', $cookie, $matches)) {
            $csrftoken = $matches[1];
            log_debug("Found csrftoken in header: $csrftoken");
        }
    }
}
$cookies_str = implode('; ', $cookies);

// --- Try to extract CSRF token from body if not found in headers ---
if (!$csrftoken && preg_match('/"csrf_token":"(.*?)"/', $body, $matches)) {
    $csrftoken = $matches[1];
    log_debug("Found csrftoken in body: $csrftoken");
}

if (!$csrftoken) {
    log_debug("Could not get CSRF token");
    echo json_encode(['status' => 'error', 'message' => 'Could not get CSRF token']);
    exit;
}

log_debug("Using CSRF token: $csrftoken");

// --- Step 2: Login request ---
$enc_password = sprintf('#PWD_INSTAGRAM_BROWSER:0:%d:%s', time(), $password);
$post_fields = http_build_query([
    'username' => $username,
    'enc_password' => $enc_password,
    'queryParams' => '{}',
    'optIntoOneTap' => 'false'
]);

$headers = [
    "User-Agent: $user_agent",
    "X-CSRFToken: $csrftoken",
    "X-Requested-With: XMLHttpRequest",
    "Referer: https://www.instagram.com/accounts/login/",
    "Content-Type: application/x-www-form-urlencoded",
    "Cookie: $cookies_str"
];

log_debug("Login request headers:\n" . print_r($headers, true));
log_debug("Login request post fields:\n" . $post_fields);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://www.instagram.com/accounts/login/ajax/");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$response = curl_exec($ch);

$header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$header = substr($response, 0, $header_size);
$body = substr($response, $header_size);

preg_match('/sessionid=([^;]+)/', $header, $session_matches);
$sessionid = $session_matches[1] ?? '';

curl_close($ch);

log_debug("Login response headers:\n" . $header);
log_debug("Login response body (first 500 chars):\n" . substr($body, 0, 500));
log_debug("Session ID: $sessionid");

$result = [
    'status' => $sessionid ? 'success' : 'error',
    'message' => $sessionid ? 'Login successful' : 'Login failed',
    'session_id' => $sessionid,
    'instagram_response' => json_decode($body, true),
    'headers' => $header
];

echo json_encode($result);