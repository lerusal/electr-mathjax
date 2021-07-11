function initCommands()
{
    $("#clearTextId").on("click", 
     () => {
         let res = window.mf.messageBox("Do you really want to clear all text?");
         if (res) {
          res.then (
            (result) => {
              if (result === 0) {
                window.mf.setDataTA('');
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

    $("#openFileId").on("click",
    () => 
       {
         window.mf.openFile();
       }
    );

    $("#saveFileId").on("click",
    () =>
       {
         window.mf.saveFile();
       }
    );

    $("#saveFileAsId").on("click",
    () => 
       {
         window.mf.saveFileAs();
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
