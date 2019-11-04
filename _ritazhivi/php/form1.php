<?php 
$form_data=json_decode($_POST["formData"], true);

function sendEmail($form_data){
    
    
		if($form_data){
            $contacts=$form_data["contacts"];
            $coffee=$form_data["coffeeitems"];
            $specials=$form_data["specialitems"];
            //var_dump($contacts);
			$to = 'evgenyzhukovets@gmail.com'; 
	        $mail_subject = 'Заказ кофе';
	        $mail_message = '
	                <html>
	                    <head>
	                        <title>'.$mail_subject.'</title>
	                    </head>
	                    <body>
                            <h2>Контакты заказчика</h2>
	                        <p>Имя: '.$contacts["name"].'</p>
	                        <p>Телефон: '.$contacts["phone"].'</p>   
	                        <p>E-mail: '.$contacts["email"].'</p>    
	                        <p>Адрес: '.$contacts["address"].'</p>
                            <h2>Информация о заказе</h2>
                            <table>
                            <tr><th>Наименование кофе</th><th>Тип</th><th>Размер упаковки</th><th>Количество</th><th>Цена за пакет</th><th>Общая стоимость</th></tr>'; 
                         
            
            
            
            foreach ($coffee as $item){
                $mail_message.='<tr>'.
                    '<td>'.$item["coffeeName"].'</td>'.
                    '<td>'.$item["coffeeType"].'</td>'.
                    '<td>'.$item["coffeeSize"].' г.</td>'.
                    '<td>'.$item["coffeeCount"].'</td>'.
                    '<td>'.$item["coffeePrice"].'</td>'.
                    '<td>'.$item["coffeeTotalPrice"].' руб.</td>';
                $mail_message.='</tr>';
            }
            $mail_message.='</table><h3>Дополнительно</h3><table>
                            <th>Название</th><th>Цена</th><th>Количество</th><th>Общая стоимость</th>';
            foreach ($specials as $item){
                $mail_message.='<tr>'.
                    '<td>'.$item["specialName"].'</td>'.
                    '<td>'.$item["specialPrice"].' руб.</td>'.
                    '<td>'.$item["specialCount"].'</td>'.
                    '<td>'.$item["specialTotalPrice"].' руб.</td></tr>';
            }
            $mail_message.='</table>';
            $mail_message.='<h3>Всего</h3>
                            <p>Общий вес заказанного кофе: '.$form_data["totalWeight"].' г.</p>
	                        <p>Общая сумма заказа: '.$form_data["totalPrice"].' руб.</p>'.
                            '<p>Общая сумма заказа: '.$form_data["totalPriceWithSale"].' руб.</p>';
                            
	        $mail_message.='</body></html>';
            
	        $headers  = "Content-type: text/html; charset=utf-8 \r\n"; 
	        //echo $mail_message;

			if(mail($to, $mail_subject, $mail_message, $headers)){
				echo('Данные отправлены');
			}
			else {
				echo "Ошибка при отправке E-mail";
			}
		}
		else{
			echo "OCHEN PLOHO";
		}
	}

	

	sendEmail($form_data);

?>