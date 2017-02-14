<?php header("Content-Type: text/html; charset=UTF-8");?>
<?php
	$num=10;
	$row="<td> </td>";
	for ($i=1; $i <= $num; $i++) { 
		$row.="<td>$i</td>";
	}
	$thead="<tr>$row</tr>";
	for ($i=1; $i <= $num; $i++) {
		$row="<td>$i</td>";
		for ($j=1; $j <= $num; $j++) { 
			$row.="<td>".($i*$j)."</td>";
		}
		$tbody.="<tr>$row</tr>";
	}
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
	<table>
		<thead><?=$thead ?></thead>
		<tbody><?=$tbody ?></tbody>
	</table>
</body>
</html>