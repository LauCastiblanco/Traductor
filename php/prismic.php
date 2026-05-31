<?php
header('Content-Type: application/json; charset=utf-8');

$PRISMIC_API = 'https://traductor-cultural.prismic.io/api/v2';

$defaultContent = array(
    'title' => 'Traductor Cultural Inteligente',
    'subtitle' => 'Traduce textos manteniendo el contexto cultural, significado y naturalidad del idioma original.',
    'hero_title' => '¿Listo para Traducir?',
    'hero_subtitle' => 'Comienza ahora con nuestro traductor cultural inteligente',
    'cta_text' => 'Ir al Traductor Cultural →',
    'footer_text' => 'Proyecto académico para la materia Programación Web II'
);

try {
    $url = $PRISMIC_API . '/documents/search?q=[[at(document.type,"landing")]]';
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 200) {
        $data = json_decode($response, true);
        
        if (isset($data['results']) && count($data['results']) > 0) {
            $doc = $data['results'][0]['data'];
            
            $content = array(
                'title' => !empty($doc['title'][0]['text']) ? $doc['title'][0]['text'] : $defaultContent['title'],
                'subtitle' => !empty($doc['subtitle'][0]['text']) ? $doc['subtitle'][0]['text'] : $defaultContent['subtitle'],
                'hero_title' => !empty($doc['hero_title'][0]['text']) ? $doc['hero_title'][0]['text'] : $defaultContent['hero_title'],
                'hero_subtitle' => !empty($doc['hero_subtitle'][0]['text']) ? $doc['hero_subtitle'][0]['text'] : $defaultContent['hero_subtitle'],
                'cta_text' => !empty($doc['cta_text'][0]['text']) ? $doc['cta_text'][0]['text'] : $defaultContent['cta_text'],
                'footer_text' => !empty($doc['footer_text'][0]['text']) ? $doc['footer_text'][0]['text'] : $defaultContent['footer_text']
            );
            
            echo json_encode(array('success' => true, 'source' => 'prismic', 'content' => $content));
            exit;
        }
    }
    
    echo json_encode(array('success' => true, 'source' => 'default', 'content' => $defaultContent));
    
} catch (Exception $e) {
    echo json_encode(array('success' => true, 'source' => 'default', 'content' => $defaultContent));
}
?>
