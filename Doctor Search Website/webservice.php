<?php
// database details
$servername = "localhost";
$username = "id20902573_shailja13uyu";
$password = "Shailja@1301";
$database = "id20902573_doctor_search";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $database);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// post request data
$doctor_category=$_POST["search"];
$doctor_area=$_POST["area"];

// SQL Query to get doctors data
$sql="SELECT ID,DoctorName,DoctorInformation,DoctorImage from doctors where DoctorArea like '%".$doctor_area."%' and DoctorCategory like '%".$doctor_category."%'";

$result=$conn->query($sql);

// Checking if any data present or not
if($result->num_rows>0){
    while($row=$result->fetch_assoc()){
        $doctor_id=$row["ID"];
        $doctor_data["Doctorname"]=$row["DoctorName"];
        $doctor_data["DoctorInfo"]=$row["DoctorInformation"];
        $doctor_data["Doctorimage"]=$row["DoctorImage"];
        $data[$doctor_id]=$doctor_data;
        $data["Result"]="True";
        $data["Message"]="Doctors fetched successfully.";
    }
}
else{
    $data["Result"]="False";
    $data["Message"]="No Doctors Found";
}

// sending response in JSON format.
echo json_encode($data,JSON_UNESCAPED_SLASHES);
?>