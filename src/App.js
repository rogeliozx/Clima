import React, { useState,useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Error from "./components/Error";
import Clima from "./components/Clima";
function App() {
  //state principal
  const [ciudad, guardarCiudad] = useState("");
  const [pais, guardarPais] = useState("");
  const [error, guardarError] = useState(false);
  const [resultado,guardarResultado]=useState({})

useEffect(()=>{
  if (ciudad==='') return;
  const consultarAPI= async ()=>{
    const appID='13127cc5072d0d1739461dd3574189d2';
   
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&APPID=${appID}`;
     //consultar la url
     const respuesta=await fetch(url);
     
     const resultado= await respuesta.json();
    guardarResultado(resultado);
 }
consultarAPI();
},[ciudad,pais])

  const datosConsulta = datos => {
    //validar que amgos esten
    let ciudad = Validacion(datos.ciudad);
    let pais = Validacion(datos.pais);
    if (!(pais && ciudad)) {
      guardarError(true);
      return;
    }
    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
    guardarError(false);
  }
  const Validacion = dato => {

    if (dato === "" || undefined || null) {
      //error
      return false;
    }
    return true;
  }

 

  let componente;

  if (error) {
    componente = <Error mensaje="Ambos campos son obligatorios" />;
  }else if(resultado.cod==='404'){
    componente = <Error mensaje="La ciudad no existe en el registro" />;
  } 
  
  else {
    componente = <Clima
      resultado={resultado}
    />;
  }

  return (
    <div className="App">
      <Header titulo="Climar React App" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario datosConsulta={datosConsulta} />
            </div>
            <div className="col s12 m6">{componente}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
