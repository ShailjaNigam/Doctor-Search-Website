$('.subhead').hide();
$('.loading').hide();
function handleSubmit(){
    let doctor_type=$('#doctor-type').val();
    let doctor_location=$('#location').val();
    $('.loading').show();
    $('.doctors').empty();
    $('.subhead').hide();
    const body = {
        search: doctor_type,
        area: doctor_location
      };
      $.ajax({
        url: "https://doctorsearch13.000webhostapp.com/webservice.php",
        type: "POST",
        data: body,
        dataType: "json",
        success: function(data) {
          $('.subhead').show();
          $('.doctors').show();
          $('.loading').hide();
          $('.subhead').text('Doctors Found In Your Area')
          Object.keys(data).map((datakey)=>{
            if(datakey=='Result'){
              if(data['Result']=='False'){
                $('.doctors').hide();
                $('.subhead').text('No Doctor found.')
              }
            }
            else if(datakey=='Message'){
              console.log('Message');
            } 
            else{
              $('.doctors').append(`<div class="doctorbox">
              <div class="leftside">
                  <img
                      class="smiling-doctor-with-strethosco-icon"
                      alt="image"
                      src="${data[datakey].Doctorimage}"
                  />
              </div>
              <div class="rightside">
                  <p class="drname">${data[datakey].Doctorname}</p>
                  <p>${data[datakey].DoctorInfo}</p>
              </div>
          </div>`)
          }
          })
          console.log(data);
        },
        error: function(xhr, status, error) {
          console.log("Error:", error);
        }
      });
      
}