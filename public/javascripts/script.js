
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#post-img')
                .attr('src', e.target.result);
            $('#img')
                .attr('value', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}


// $(function(){
//     $('#update').on('click',function(e){

//     })
// })