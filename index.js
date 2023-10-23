let variable;

document.onselectionchange = function() {
    variable = document.getSelection().toString();
  };

document.addEventListener('keydown', (event) => {
    if(event.key == 'q'){
        console.log()
    
        try{
        if(variable.length > 0){
            console.log('Вы скопировали', variable);
            fetch('http://localhost:3000/progress', {
                method: "post",
                body: variable + '\n'
            })
        }
        }catch{ 
            console.log('Очищенно!')
        }
    }
})
