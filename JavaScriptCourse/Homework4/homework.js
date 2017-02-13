var table="<table border='7' align='center' cellpadding='34' bordercolor='#0000ff'>\
	<tr bgcolor='#ACA' bordercolor='#ACA'>\
		<td align='center'><i><b>Поле</b></i></td>\
		<td align='center'><i><b>Значение</b></i></td>\
	</tr>\
	<tr>\
		<td align='center'><i><b>Ширина области просмотра</b></i></td>\
		<td align='center'>"+window.innerWidth+"</td>\
	</tr>\
	<tr bgcolor='#ACA' bordercolor='#ACA'>\
		<td align='center'><i><b>Высота области просмотра</b></i></td>\
		<td align='center'>"+window.innerHeight+"</td>\
	</tr>\
	<tr>\
		<td align='center'><i><b>Адрес страницы</b></i></td>\
		<td align='center'>"+location.href+"</td>\
	</tr>\
	<tr bgcolor='#ACA' bordercolor='#ACA'>\
		<td align='center'><i><b>Порт</b></i></td>\
		<td align='center'>"+location.port+"</td>\
	</tr>\
	<tr>\
		<td align='center'><i><b>Протокол</b></i></td>\
		<td align='center'>"+location.protocol+"</td>\
	</tr>\
	<tr bgcolor='#ACA' bordercolor='#ACA'>\
		<td align='center'><i><b>Строка поиска</b></i></td>\
		<td align='center'>"+location.search+"</td>\
	</tr>\
	<tr>\
		<td align='center'><i><b>Хеш</b></i></td>\
		<td align='center'>"+location.hash+"</td>\
	</tr>\
	<tr bgcolor='#ACA' bordercolor='#ACA'>\
		<td align='center'><i><b>Адрес хоста</b></i></td>\
		<td align='center'>"+location.host+"</td>\
	</tr>\
	<tr>\
		<td align='center'><i><b>Кодовое название браузера</b></i></td>\
		<td align='center'>"+navigator.appCodeName+"</td>\
	</tr>\
	<tr bgcolor='#ACA' bordercolor='#ACA'>\
		<td align='center'><i><b>Включены ли cookie</b></i></td>\
		<td align='center'>"+navigator.cookieEnabled+"</td>\
	</tr>\
	<tr>\
		<td align='center'><i><b>Онлайн?</b></i></td>\
		<td align='center'>"+navigator.onLine+"</td>\
	</tr>\
	<tr bgcolor='#ACA' bordercolor='#ACA'>\
		<td align='center'><i><b>Глубина цветопередачи</b></i></td>\
		<td align='center'>"+screen.colorDepth+"</td>\
	</tr>\
	<tr>\
		<td align='center'><i><b>Ширина экрана</b></i></td>\
		<td align='center'>"+screen.width+"</td>\
	</tr>\
	<tr bgcolor='#ACA' bordercolor='#ACA'>\
		<td align='center'><i><b>Высота экрана</b></i></td>\
		<td align='center'>"+screen.height+"</td>\
	</tr>\
	<tr>\
		<td align='center'><i><b>Длина истории вкладки</b></i></td>\
		<td align='center'>"+history.length+"</td>\
	</tr>\
</table>";
document.write(table);