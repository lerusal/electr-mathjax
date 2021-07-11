var tagsToReplace = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
};

function replaceTag(tag) {
  return tagsToReplace[tag] || tag;
}

function safe_tags_replace(str) {
  return str.replace(/[&<>]/g, replaceTag);
}

function convert() 
{
    //
    //  Get the TeX input
    //
    //var input = document.getElementById("input").value.trim();

    let input = $("#input").val().trim();

    if (input) 
    {
      let isEnableHtmlTags = $("#enableHtmlTagsId").prop('checked');
      if (isEnableHtmlTags === false) 
      {
        input = safe_tags_replace(input);
      }
      input = bbc2Html(input);
      input = input.replace(/(\r\n|\n\r|\r|\n)/g, '<br>');
    } 

    //
    //  Clear the old output
    //
    output = document.getElementById('output');
    $("#input").prop( "disabled", false );
    output.innerHTML = input;
    //
    //  Reset the tex labels (and automatic equation numbers, though there aren't any here).
    //  Get the conversion options (metrics and display settings)
    //  Convert the input to SVG output and use a promise to wait for it to be ready
    //    (in case an extension needs to be loaded dynamically).
    //
    // MathJax.texReset();
    let options = MathJax.getMetricsFor(output);
        MathJax.texReset(options);
        MathJax.typeset();

        $("#input").prop( "disabled", false );
  }
