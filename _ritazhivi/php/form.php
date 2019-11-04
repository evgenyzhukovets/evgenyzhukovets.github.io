<?php 

    $to = 'evgenyzhukovets@gmail.com'; 
    $subject = 'Новый заказ';
    $from="coffeefactory@gmail.com";
    
    $form_data=json_decode($_POST["formData"], true);


    if($form_data){
        $contacts=$form_data["contacts"];
        $coffee=$form_data["coffeeitems"];
        $specials=$form_data["specialitems"];
        
        if (empty( $contacts["name"] )){ $name = ''; }else{ $name = 'Имя: '.$contacts["name"]; }
        if (empty( $contacts["email"])){ $email = ''; }else{ $email = 'E-mail: '.$contacts["email"]; }  
        if (empty( $contacts["phone"])){ $phone = ''; }else{ $phone = 'Телефон: '.$contacts["phone"]; } 
        if (empty( $contacts["address"])){ $address = ''; }else{ $address = 'Адрес: '.$contacts["address"]; } 

        $mailheaders = "Content-Type: text/html; charset=utf-8\r\n";
        $mailheaders .="Content-Transfer-Encoding: base64\r\n";
         
        $message = "
        <h2>Новый заказ на Coffee Factory</h2>
        <h3>Данные заказчика</h3>
        <p>$name</p>
        <p>$email</p>
        <p>$phone</p>
        <p>$address</p>
        <h3>Информация о заказе</h3>
        ";
        $message .= "\r\n";   
        

            if(!empty ($coffee)){
                $message .= '<table><tr><th>Наименование кофе</th><th>Тип</th><th>Размер упаковки</th><th>Количество</th><th>Цена за пакет</th><th>Общая стоимость</th></tr>'; 
                foreach ($coffee as $item){
                    $message.='<tr>'.
                        '<td>'.$item["coffeeName"].'</td>'.
                        '<td>'.$item["coffeeType"].'</td>'.
                        '<td>'.$item["coffeeSize"].' г.</td>'.
                        '<td>'.$item["coffeeCount"].'</td>'.
                        '<td>'.$item["coffeePrice"].'</td>'.
                        '<td>'.$item["coffeeTotalPrice"].' руб.</td>';
                    $message.='</tr>';
                }
                $message.="</table>";
            }

            
        
            if(!empty($specials)){
                $message.='<h4>Дополнительно</h4>
                            <table><th>Название</th><th>Цена</th><th>Количество</th><th>Общая стоимость</th>';
                foreach ($specials as $item){
                    $message.='<tr>'.
                        '<td>'.$item["specialName"].'</td>'.
                        '<td>'.$item["specialPrice"].' руб.</td>'.
                        '<td>'.$item["specialCount"].'</td>'.
                        '<td>'.$item["specialTotalPrice"].' руб.</td></tr>';
                }
                $message.='</table>';
            }
            
            $message.='<h3>Всего</h3>
                            <p>Общий вес заказанного кофе: '.$form_data["totalWeight"].' г.</p>
	                        <p>Общая сумма заказа: '.$form_data["totalPrice"].' руб.</p>'.
                            '<p>Общая сумма заказа: '.$form_data["totalPriceWithSale"].' руб.</p>';
                            
	        $message.='</body></html>';    
            
            $message .= "\r\n";
            $message = chunk_split(base64_encode(iconv("utf8", "windows-1251", $message)));

        
        

	        
            
	        //$headers  = "Content-type: text/html; charset=utf-8 \r\n"; 
	        //echo $mail_message;

			if(mail($to, $subject, $message, $mailheaders)){
				echo('Данные отправлены');
			}
			else {
				echo "Ошибка при отправке E-mail";
			}
		}
		else{
			echo "OCHEN PLOHO";
		}
?>