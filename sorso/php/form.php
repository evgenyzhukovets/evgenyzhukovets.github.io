<?php 

    $to = 'anastasia.sorso@gmail.com, m.rusakov@irm.by'; 
    $subject = 'Письмо с sorso.by';
    $from="admin@sorso.by";
    
    if(!empty($_POST["adminEmail"])){
        $to=$_POST["adminEmail"];
    }
    if(!empty($_POST["formTitle"])){
        $subject=$_POST["formTitle"];
    }

    if(!empty($_POST["name"])&&!empty($_POST["phone"])){

        
        
        if (empty($_POST["name"] )){ $name = ''; }else{ $name = 'Имя: '.$_POST["name"]; }
        if (empty($_POST["phone"] )){ $phone = ''; }else{ $phone = 'Телефон: '.$_POST["phone"]; }

        if (empty($_POST["email"] )){ $email = ''; }else{ $email = 'E-mail: '.$_POST["email"]; }
        if (empty($_POST["date"] )){ $date = ''; }else{ $date = 'Дата: '.$_POST["date"]; }
        if (empty($_POST["comment"] )){ $comment = ''; }else{ $comment = 'Сообщение: '.$_POST["comment"]; }


        $mailheaders = "Content-Type: text/html; charset=utf-8\r\n";
        $mailheaders .="Content-Transfer-Encoding: base64\r\n";
         
        $message = "
        <h2>$subject</h2>
        <p>$name</p>
        <p>$phone</p>

        <p>$email</p>
        <p>$date</p>
        <p>$comment</p>
        ";
        $message .= "\r\n";   
                   
            $message.='</body></html>';    
            
            $message .= "\r\n";
            
            $message = chunk_split(base64_encode($message));


            if(mail($to, $subject, $message, $mailheaders)){
                echo('Данные отправлены');
            }
            else {
                echo "Ошибка при отправке E-mail";
            }
        }
        else{
            echo "Не заполнены поля формы";
        }
?>
