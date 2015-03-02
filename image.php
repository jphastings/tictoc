<?php
$img = imagecreate(22,21);

$bg = imagecolorallocate($img,39,40,34);
$on = imagecolorallocate($img,166,226,46);
$off = imagecolorallocate($img,249,38,114);

$bits = array(
42 => array(0,0),
41 => array(1,0),
40 => array(2,0),
39 => array(3,0),
38 => array(4,0),
37 => array(5,0),
36 => array(6,0),
21 => array(0,1),
20 => array(1,1),
19 => array(2,1),
18 => array(3,1),
17 => array(4,1),
16 => array(5,1),
35 => array(6,1),
22 => array(0,2),
7 => array(1,2),
6 => array(2,2),
5 => array(3,2),
4 => array(4,2),
15 => array(5,2),
34 => array(6,2),
23 => array(0,3),
8 => array(1,3),
1 => array(2,3),
2 => array(3,3),
3 => array(4,3),
14 => array(5,3),
33 => array(6,3),
24 => array(0,4),
9 => array(1,4),
10 => array(2,4),
11 => array(3,4),
12 => array(4,4),
13 => array(5,4),
32 => array(6,4),
25 => array(0,5),
26 => array(1,5),
27 => array(2,5),
28 => array(3,5),
29 => array(4,5),
30 => array(5,5),
31 => array(6,5)

);

$num = $_GET['timestamp'] - 4876965e5;

if ($num >= 0 && $num <= 4885743011103) {
	for($i=1;$i<=42;$i++) {
		$pos = $bits[$i];
		if (($num & 1) == 1)
			imagefilledrectangle($img,$pos[0]*3 + 1,$pos[1]*3 + 2,$pos[0]*3 + 2,$pos[1]*3 + 3,$on);
		$num = floor($num / 2);
	}
}

header('Content-Type: image/png');

imagepng($img);
imagedestroy($img);