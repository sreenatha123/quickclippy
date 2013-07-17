document.addEventListener('DOMContentLoaded', function () {

var tags = [
      "hw",
      "omg",
    ];
var tag_texts = [
      "hw:Hello World",
      "omg:Oh My God",
    ];
var tagOptions = [
      "Copy: hw:Hello World",
      "Delete: hw:Hello World",
      "Copy: omg:Oh My God",
      "Delete: omg:Oh My God"
    ];
  
  //TODO : "Copy" and "Delete" strings should be ignored by autocomplete

document.getElementById("input").addEventListener("keypress", 
  function (e)
  {
	 if (e.keyCode == 13)
	 {
		var input = document.getElementById("input");
		var found = $.inArray(input.value, tagOptions);
		var tag_found = $.inArray(input.value, tag_texts);
		if(found >=0)
		{
			var copyIndex = input.value.indexOf("Copy:");
			var deleteIndex = input.value.indexOf("Delete:");
			if (copyIndex == 0)
			{
				var tag_text = input.value.substr(copyIndex+6,input.value.length);
				var tag_index = tagOptions.indexOf(input.value)/2;
				var text = tag_text.substr(tags[tag_index].length+1, tag_text.length);
				input.value = text;
				//TODO: Copy text to clipboard
			}
			if (deleteIndex == 0)
			{
				tagOptionsIndex = tagOptions.indexOf(input.value);
				tagIndex = tagOptionsIndex / 2;
				//TODO: Find an efficient(memory, speed) delete method
			 	//Delete entry from tags
				tags[tagIndex] = "";
			 	//Delete entry's options from tagOptions
				tagOptions[tagOptionsIndex - 1] = ""; // Copy: option
				tagOptions[tagOptionsIndex] = ""; // Delete: option
				input.value = "";
			}
		}
		else if (tag_found < 0)
	 	{
			//TODO: Add a settings option for users to set their own delimiters
			delimIndex = input.value.indexOf(":");
			if(delimIndex == -1)
			{
				// Incorrect assignment syntax
				// Do nothing
			}
			else
			{
				//Add everything before delimiter to tags array
				tags[tags.length] = input.value.substr(0, delimIndex);
				tag_texts[tag_texts.length] = input.value;
				tagOptions[tagOptions.length] = "Copy: " + input.value;
				tagOptions[tagOptions.length] = "Delete: " + input.value;
				input.value = "";
			}
		}
		return false;
	 }
	 else
	 {
		 return true;
	 }
  }
);


  $(function() {
    $( "#input" ).autocomplete({
      autoFocus: true,
      source: tagOptions
     // source: function(req, responseFn){
        //req.term; 
      	// search req.term in tag_texts and if found display corresponding tagOptions
        //responseFn();
     // }
    });
  });

});
