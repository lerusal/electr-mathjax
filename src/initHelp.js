//$(document).ready(
function reportWindowSize() 
{
        // $("#splitter").height(window.innerHeight);
        $("#first").height(window.innerHeight);
        $("#separator").height(window.innerHeight);
        $("#second").height(window.innerHeight);
}

function initContent() 
{
   let id = 0; 
   let helpText = [];
   $('#helpText h2').each
   (
       (inx, el) => {
           $(el).attr('id', `help-${id}`)
           helpText.push({id: id, html:$(el).html()})
           id += 1;
       }
   )

   $('<ul id="helpContainer"></ul>').appendTo('#first');
   for(el of helpText) 
   {
       $(`<li><a href="#help-${el.id}">${el.html}</a></li>`).appendTo('#helpContainer');
   }
}

$( function()  // this is a new version of $(document).ready
  {
    let sepEl = document.getElementById("separator");  
    dragElement( sepEl, "H" );
    window.addEventListener('resize', reportWindowSize);
    reportWindowSize(); 
    initContent();
  }
);
