<?php
// Réception du formulaire de devis — hébergement LWS (PHP + mail()).
// Destinataire à confirmer pour les demandes commerciales (brief, section 9).

declare(strict_types=1);

const RECIPIENT = 'team@mankancommunication.com';
const SENDER = 'site@mankancommunication.com';
const BACK = '/contact/';

function back(string $status): void
{
    header('Location: ' . BACK . '?' . $status . '=1#formulaire', true, 303);
    exit;
}

function field(string $name, int $max): string
{
    $value = trim((string) ($_POST[$name] ?? ''));
    // Retire les caractères de contrôle (sauf retours à la ligne pour la description).
    $value = preg_replace('/[^\P{C}\n]/u', '', $value) ?? '';
    return mb_substr($value, 0, $max);
}

function one_line(string $value): string
{
    return trim(preg_replace('/[\r\n]+/', ' ', $value) ?? '');
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Location: ' . BACK, true, 303);
    exit;
}

// Robot : le champ caché a été rempli → on fait comme si tout allait bien.
if (!empty($_POST['site_web'])) {
    back('envoye');
}

$nom = one_line(field('nom', 120));
$organisation = one_line(field('organisation', 160));
$email = one_line(field('email', 160));
$telephone = one_line(field('telephone', 40));
$type = one_line(field('type', 80));
$description = field('description', 5000);
$budget = one_line(field('budget', 80));
$echeance = one_line(field('echeance', 80));

if ($nom === '' || $type === '' || $description === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    back('erreur');
}

$lines = [
    'Nouvelle demande de devis depuis mankancommunication.com',
    '',
    'Nom : ' . $nom,
    'Organisation : ' . ($organisation ?: '—'),
    'Email : ' . $email,
    'Téléphone : ' . ($telephone ?: '—'),
    'Type de projet : ' . $type,
    'Budget indicatif : ' . ($budget ?: '—'),
    'Échéance : ' . ($echeance ?: '—'),
    '',
    'Projet :',
    $description,
];

$subject = '=?UTF-8?B?' . base64_encode('Demande de devis — ' . $nom) . '?=';
$headers = [
    'From: Site Mankan <' . SENDER . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];

$sent = mail(RECIPIENT, $subject, implode("\n", $lines), implode("\r\n", $headers), '-f' . SENDER);

back($sent ? 'envoye' : 'erreur');
