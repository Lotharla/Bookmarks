<?php
	$error = 0;
	$allowedExts = array("html", "htm");
	$temp = explode(".", $_FILES["file"]["name"]);
	$extension = end($temp);
	if ((($_FILES["file"]["type"] == "text/html"))
		&& ($_FILES["file"]["size"] < 20000000)
		&& in_array($extension, $allowedExts)) {
		if ($_FILES["file"]["error"] > 0) {
			echo "Return Code: " . $_FILES["file"]["error"] . "<br>";
			$error = 1;
		} else {
			echo "Upload: " . $_FILES["file"]["name"] . "<br>";
			echo "Type: " . $_FILES["file"]["type"] . "<br>";
			echo "Size: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
			$temp = $_FILES["file"]["tmp_name"];
			echo "Temp file: " . $temp . "<br>";
			$file = "";
			if(isset($_POST['dir']) && strlen($_POST['dir']) > 0)
				$file = $_POST['dir'] . "/";
			$file .= $_FILES["file"]["name"];
			if (file_exists($file)) {
				unlink($file);
			}
			$msg = "stored in: " . $file . "<br>";
			if (move_uploaded_file($temp, $file)) {
				echo $msg;
			} else {
				echo "NOT " . $msg;
				$error = 1;
			}
		}
	} else {
		echo "Invalid file";
		$error = 1;
	}
?>
<script>
	var func = window.top.window.finishUpload;
	if (typeof(func) === "function")
		func(<?php echo $error; ?>);
</script>
