class StoryMarkUp{
    typeEffect(paragraphElement = null, speed = 0, insertText = ""){
        var text = "";
        paragraphElement.innerText = "";
        if(insertText.length > 0){
            //text = paragraphElement.text;
            text = insertText;
            //text = "Hallo wereld"
            //paragraphElement.text = "";
        }else{
            text = "Text is not found";
        }
        console.log(text);
        var i = 0;
        var timer = setInterval(function(){
            if(i < text.length){
                paragraphElement.innerHTML += text.charAt(i);
                console.log(text.charAt(i));
                //Apppend to paragraph
                i++;
            }else{
                clearInterval(timer);
            }
        }, speed);
    }
}
export default StoryMarkUp