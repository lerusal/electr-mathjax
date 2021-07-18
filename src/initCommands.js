function initCommands()
{
    $("#clearTextId").on("click", 
     () => {
         let res = window.mf.messageBox("Do you really want to clear all text?");
         if (res) {
          res.then (
            (result) => {
              if (result === 0) {
                setDataTextArea('');
                $('#fileNameId').html(""); 
              }
            }
          )  
         }
     }
    );

    $("#aboutId").on("click", 
     () => {
        window.mf.about(MathJax.version);
     }
    )

    // For unknown to me reason 
    // it is not possible to reload data 
    // in textarea. That's why we need first to
    // delete element from DOM, append it to DOM again and then load data
    function setDataTextArea(data) 
    {
      $("#input" ).remove(); 
      $('#inputAreaId').append('<textarea id="input"></textarea>')
      $('#input').val(data); 
    }

    $("#openFileId").on("click",
    () => 
       {
        window.mf.openFile().then
        (
          (fData) => 
          {
            if(fData) 
            {
              setDataTextArea(fData.fileData); 
              $('#fileNameId').html(fData.fileName); 
            }
          } 
        )
       }
    );

    $("#saveFileId").on("click",
    () =>
       {
        let fileName = $('#fileNameId').text();
        let fileData = $('#input').val();     
         window.mf.saveFile(fileName, fileData);
       }
    );

    $("#saveFileAsId").on("click",
    () => 
       {
        let fileData = $('#input').val();     
         window.mf.saveFileAs(fileData).then(
           (fileName) => {
            $('#fileNameId').html(fileName); 
           }
         );
       }
    );

    $("#renderTexId").on("click",
    () => 
       {
        convert();
       }
    );

    $("#pritConvTextId").on('click', () =>
      {
     //    window.print();
         window.mf.toPdf();
      }
    );

    $("#helpId").on('click', () =>
      {
     //    window.print();
         window.mf.openHelp();
      }
    );
}
