<?php 

    $to = 'evgenyzhukovets@gmail.com'; 
    $subject = 'Новое пожелание для Риты Каребо';
    $from="admin@ritazhivi.com";
    
    if(!empty($_POST["adminEmail"])){
        $to=$_POST["adminEmail"];
    }


    if(!empty($_POST["name"])){
 
        if (empty($_POST["name"] )){ $name = ''; }else{ $name = 'Имя: '.$_POST["name"]; }
        if (empty($_POST["phone"] )){ $phone = ''; }else{ $phone = 'Телефон: '.$_POST["phone"]; }

        if (empty($_POST["email"] )){ $email = ''; }else{ $email = 'E-mail: '.$_POST["email"]; }
        if (empty($_POST["comment"] )){ $comment = ''; }else{ $comment = 'Сообщение: '.$_POST["comment"]; }


        $mailheaders = "Content-Type: text/html; charset=utf-8\r\n";
        $mailheaders .="Content-Transfer-Encoding: base64\r\n";
         
        $message = "
        <h2>Новое пожелание для Риты Каребо</h2>
        <p>$name</p>
        <p>$phone</p>
        <p>$email</p>
        <p>$comment</p>
        ";
        $message .= "\r\n";   
                   
	        $message.='</body></html>';    
            
            $message .= "\r\n";
            //echo $message;
            $message = chunk_split(base64_encode($message));


			if(mail($to, $subject, $message, $mailheaders)){
				echo('Спасибо за ваше сообщение. После проверки модераторами оно повявится на нашем сайте');
			}
			else {
				echo "Ошибка при отправке E-mail";
			}
		}
		else{
			//echo "Не заполнены поля формы";
		}
?>
