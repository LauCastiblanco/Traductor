<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['text']) || !isset($input['source']) || !isset($input['target'])) {
        throw new Exception('Parámetros inválidos');
    }

    $text = $input['text'];
    $source = $input['source'];
    $target = $input['target'];

    // Llamar a LibreTranslate API
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => 'https://api.libretranslate.de/translate',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode([
            'q' => $text,
            'source' => $source,
            'target' => $target
        ]),
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => false
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($curlError) {
        throw new Exception("cURL error: $curlError");
    }

    if ($httpCode !== 200) {
        throw new Exception("API error: HTTP $httpCode");
    }

    $data = json_decode($response, true);

    if (!isset($data['translatedText'])) {
        throw new Exception('Invalid API response');
    }

    echo json_encode([
        'success' => true,
        'translatedText' => $data['translatedText']
    ]);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
