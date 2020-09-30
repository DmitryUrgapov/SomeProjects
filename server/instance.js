/* Здесь что-то наподобие:

Данные для передачи на сервер. К примеру, id и количество items.
let itemId = 20023;
let itemQuality = 2;
 
Создаём объект класса XMLHttpRequest
const request = new XMLHttpRequest();

// ajax_request.php - нужный файл на сервере
 
const url = "ajax_request.php?item_id=" + itemId + "&item_quality=" + itemQuality;

request.open('GET', url);

Указываем заголовки для сервера, говорим что тип данных, - контент который мы хотим получить должен быть не закодирован. 
request.setRequestHeader('Content-Type', 'application/x-www-form-url');
 
Здесь мы получаем ответ от сервера на запрос, лучше сказать ждем ответ от сервера 
request.addEventListener("readystatechange", () => {

	if (request.readyState === 4 && request.status === 200) {
	
    выводим в консоль то что ответил сервер
	  console.log( request.responseText );
    }
});
 
Выполняем запрос 
request.send();

*/
