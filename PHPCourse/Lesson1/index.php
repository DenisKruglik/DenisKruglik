<?php header("Content-Type: text/html; charset=UTF-8");?>
<?php
	$name="Денис";
	$a=<<<EOD
	Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit natus magnam minus eaque aliquid recusandae commodi totam, nobis quidem ea inventore delectus error nostrum reiciendis at minima provident, mollitia exercitationem?
EOD
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
	<div>Меня зовут <?=$name ?></div>
	<?php echo $a;
	?>
</body>
</html>