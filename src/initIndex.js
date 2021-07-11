function reportWindowSize() 
{
  let heightNavBar = $("#navBarId").height();
  let editorHeight = window.innerHeight - heightNavBar;
      $("#editorRowId").height(editorHeight);
}

//$(document).ready(
$( function()  // this is a new version of $(document).ready
  {
    dragElement( document.getElementById("separator"), "H" );
    window.addEventListener('resize', reportWindowSize);
    initCommands();
    reportWindowSize();
  }
);
