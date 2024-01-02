import { useState, useEffect } from "react";
import React from "react";
import Error from "./error";

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");
  
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");



  useEffect(() => {
    if (Object.keys(paciente).length > 0){
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas);
    }
  }, [paciente])


  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36)

    return random + fecha;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validacion del Formulario

    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      setErrorMsg("Todos los campos son obligatorios!");
      setError(true);
      return;
    }
    setError(false);
    
    // Objeto de Paciente
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
    }

    if (paciente.id) {
      objetoPaciente.id = paciente.id;

      const pacientesActualizados = pacientes.map((pacienteState) => 
        pacienteState.id === paciente.id ? objetoPaciente : pacienteState
      );

      setPacientes(pacientesActualizados);
      setPaciente({})
    } else {
      //Nuevo registo
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }


    // Reiniciar form
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');

  };

  return (
    <div className="md:w-1/2 mb-10 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold">Adminístralos</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5"
      >
        {error && <Error>{ errorMsg }</Error>}
        <div>
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="mascota"
          >
            Nombre Mascota
          </label>
          <input
            className="border-2 w-full p-2 mt-2 mb-5 placeholder-gray-400 rounded-md"
            type="text"
            id="mascota"
            placeholder="Nombre de la Mascota"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
            }}
          />
        </div>
        <div>
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="propietario"
          >
            Nombre Propietario
          </label>
          <input
            className="border-2 w-full p-2 mt-2 mb-5 placeholder-gray-400 rounded-md"
            type="text"
            id="propietario"
            placeholder="Nombre del Propietario"
            value={propietario}
            onChange={(e) => {
              setPropietario(e.target.value);
            }}
          />
        </div>
        <div>
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="border-2 w-full p-2 mt-2 mb-5 placeholder-gray-400 rounded-md"
            type="email"
            id="email"
            placeholder="Email Contacto Propietario"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="alta"
          >
            Alta
          </label>
          <input
            className="border-2 w-full p-2 mt-2 mb-5 placeholder-gray-400 rounded-md"
            type="date"
            id="alta"
            value={fecha}
            onChange={(e) => {
              setFecha(e.target.value);
            }}
          />
        </div>
        <div>
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="sintomas"
          >
            Síntomas
          </label>
          <textarea
            className="border-2 w-full p-2 mt-2 mb-5 placeholder-gray-400 rounded-md"
            id="sintomas"
            placeholder="Describe los Síntomas"
            value={sintomas}
            onChange={(e) => {
              setSintomas(e.target.value);
            }}
          ></textarea>
        </div>
        <input
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold rounded-md hover:bg-indigo-800 hover:cursor-pointer transition-colors"
          type="submit"
          value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente' }
        />
      </form>
    </div>
  );
};

export default Formulario;
