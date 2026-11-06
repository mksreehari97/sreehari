<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // 1. Set your receiving email address
    $to_email = "sreehari@smk.com"; 
    $subject = "New Project Enquiry from SMK Studio";

    // 2. Sanitize and collect form data
    $full_name = htmlspecialchars(trim($_POST["full_name"]));
    $business_name = htmlspecialchars(trim($_POST["business_name"]));
    $website = htmlspecialchars(trim($_POST["website"]));
    $project_description = htmlspecialchars(trim($_POST["project_description"]));
    $client_email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(trim($_POST["phone"]));
    $source = htmlspecialchars(trim($_POST["source"]));

    // 3. Construct the email body
    $email_body = "You have received a new enquiry from your portfolio.\n\n";
    $email_body .= "=== CLIENT DETAILS ===\n";
    $email_body .= "Name: $full_name\n";
    $email_body .= "Email: $client_email\n";
    $email_body .= "Phone: $phone\n\n";
    
    $email_body .= "=== BUSINESS INFO ===\n";
    $email_body .= "Business Name: $business_name\n";
    $email_body .= "Current Website: $website\n";
    $email_body .= "Found SMK via: $source\n\n";
    
    $email_body .= "=== PROJECT DESCRIPTION ===\n";
    $email_body .= "$project_description\n";

    // 4. Set headers
    $headers = "From: noreply@smk.com\r\n";
    $headers .= "Reply-To: $client_email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // 5. Send the email and return a response to the frontend JS
    if (mail($to_email, $subject, $email_body, $headers)) {
        http_response_code(200);
        echo "Success";
    } else {
        http_response_code(500);
        echo "Error";
    }
} else {
    // Prevent direct access to the PHP file
    http_response_code(403);
    echo "Forbidden";
}
?>