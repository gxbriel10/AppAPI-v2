window.onload = function(){
  const cadastrar = document.querySelector("#cadastrar");
  const nome = document.querySelector("#nome");
  const curso = document.querySelector("#curso");
  const buscar = document.querySelector("#buscar");
  const id = document.querySelector("#id");
  const alterar = document.querySelector("#alterar");
  const deletar = document.querySelector("#deletar");

  function Erro(buttonIndex){
    if(buttonIndex==2){
      navigator.app.exitApp();
    }else{
      return false;
    }
  }
  
 function Messagem(message){
   navigator.notification.confirm(
     message,
      Erro,
      "Ops!!!",
      ['OK','SAIR']);
 }

  function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.NONE] = 1;

    if(states[networkState] == 1){
       return false;
    }else{
      return true;
    }
}

  cadastrar.addEventListener("click", function(){
    if(checkConnection()){
    let formdata = new FormData();
    formdata.append('nome', `${nome.value}`);
    formdata.append('curso', `${curso.value}`);

    fetch("https://www.jussimarleal.com.br/exemplo_api/pessoa",
    {
     body: formdata,
     method: "post",
     mode:'cors',
     cache:'default' 
    }).then(()=>{
      
alert("O Registro foi efetuado com Sucesso");
      LimparCampos();
    }

    );
    }else{
      Messagem("Sem conexão com a Internet, tente Cadastrar novamente mais tarde!!!");
    }
  });

  buscar.addEventListener("click", function(){
    if(checkConnection()){
    fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${id.value }`, {
    method: "get",
     mode:'cors',
     cache:'default' 
     
  }).then(response=>{
    response.json().then(data => {
      nome.value = data['nome'];
      curso.value = data['curso'];
      
      })
    })
    }else{
    Messagem("Sem conexão com a Internet, tente Buscar novamente mais tarde!!!");
    }
  });

  qrcode.addEventListener("click", function(){
    if(checkConnection()){
           cordova.plugins.barcodeScanner.scan(
      function (result) {
    fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${result.text }`, {
    method: "get",
     mode:'cors',
     cache:'default' 
  }).then(response=>{
    response.json().then(data => {
      nome.value = data['nome'];
      curso.value = data['curso'];
            
      },
      function (error) {
          alert("fALHA AO SCANEAR: " + error);
      },
      {
          preferFrontCamera : false,
          showFlipCameraButton : true, 
          showTorchButton : true, 
          torchOn: true, 
          saveHistory: true,
          prompt : "Coloque a Camera no Código para Scanear", 
          resultDisplayDuration: 500, 
          formats : "QR_CODE,PDF_417,CODE_39",
          orientation : "landscape", 
          disableAnimations : true, 
          disableSuccessBeep: false 
      }
   );
      })
    })
    }else{
      Messagem("Sem conexão com a Internet, tente Scanear novamente mais tarde!!!");
    }


});

  alterar.addEventListener("click", function(){
    if(checkConnection()){
  fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${id.value }`, {
    method: "put",
    mode:'cors',
    cache:'default', 
    headers:{
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      'nome' : `${nome.value}`,
      'curso' : `${curso.value}`,
    })
  }).then(()=>{
    alert("O Registro foi Alterado com Sucesso!!!")
    LimparCampos();
  });
    }else{
      Messagem("Sem conexão com a Internet, tente Alterar novamente mais tarde!!!");
    }
});

deletar.addEventListener("click", function(){
  if(checkConnection()){
fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${id.value }`, {
    method: "delete",
     mode:'cors',
     cache:'default' 
  }).then(()=> {
    alert("O Registro foi Deletado Com Sucesso!!!")
    LimparCampos();
    });
  }else{
    Messagem("Sem conexão com a Internet, tente Deletar novamente mais tarde!!!");
  }
});

  function LimparCampos(){
    nome.value = "";
    curso.value = "";
}

limpar.addEventListener("click", function(){
  if(checkConnection()){
  id.value = "";
  LimparCampos();
  }else{
    Messagem("Sem conexão com a Internet, tente Limpar novamente mais tarde!!!");
  }
})

/*if(checkConnection()){
  alert('Tem Internet')
}else{
  alert('Sem Internet');
}*/

  }
  