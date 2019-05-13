class StoryMarkUp{
    typeEffect(paragraphElement = null, speed = 0, insertText = ""){
        var text = "";
        paragraphElement.innerText = "";
        if(insertText.length > 0){
            text = insertText;
        }else{
            text = "Text is not found";
        }
        console.log(text);
        var i = 0;
        var timer = setInterval(function(){
            if(i < text.length){
                paragraphElement.innerHTML += text.charAt(i);
                i++;
            }else{
                clearInterval(timer);
            }
        }, speed);
    }


    setSimulationViewVisible(sceneType){
        var sceneSections = document.querySelectorAll("#simulation section");
        for(var i = 0; i < sceneSections.length; i++){
            console.log(sceneSections[i]);
            if(sceneSections[i].id.toLowerCase() === sceneType.toLowerCase()){
                //Set visible
                sceneSections[i].style.display = "block";
                
            }else{
                //Set invisable
                sceneSections[i].style.display = "none";
                
            }
        }
    }

    // makeUnvisible(q){
    //     var d = document.querySelectorAll("#simulation section");
    //     for(var i = 0; i < d.length; i++){
    //         if(d[i].id === q){
    //             //Set visible
    //         }
    //     }
    // }
}
export default StoryMarkUp