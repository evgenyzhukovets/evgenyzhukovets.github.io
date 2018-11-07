<?php 

	$email=sanitizeString($_POST["email"]);
 	$adminEmail=sanitizeString($_POST["adminEmail"]);

	//echo $email;
    //echo $adminEmail;

 	sendEmail($email,$adminEmail);
	function sendEmail($email,$adminEmail){

        
		if($email!="" && $adminEmail!=""){
			$to = $adminEmail; 
	        $subject = 'Adsnearme newsletter';
	        $mail_message = '
	                <html>
	                    <head>
	                        <title>'.$subject.'</title>
	                    </head>
	                    <body>
	                        <p>Email: '.$email.'</p>                 
	                    </body>
	                </html>'; 
	        $headers  = "Content-type: text/html; charset=utf-8 \r\n"; 
	        
			if(mail($to, $subject, $mail_message, $headers)){
				echo 'Success';
			}
			else {
				echo "Email sending error";
			}
		} else{
            echo "Email not set";
        }
        
	}
    

	function sanitizeString($var)
	{
		$var = stripslashes($var);
		$var = htmlentities($var);
		$var = strip_tags($var);
		return $var;
	}
 ?>
