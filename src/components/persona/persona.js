import React, { useState, useEffect } from 'react';
import { getApi, putApi, deleteApi, postApi, uploadFileApi } from '../../service/api';
import { Link, useNavigate   } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Papa from 'papaparse';


const Persona = () => {
    const [error, setError] = useState(null);
    const [personas , setPersonas] = useState([]);
    const [personasCarga , setPersonasCarga] = useState([]);
    const [csvFile, setCsvFile] = useState(null);
    const [idPersona, setIdPersona] = useState(0);
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correoElectronico, setCorreoElectronico] = useState('');

    

    const getPersonas = async () => {
        let obj = {
            'IdPersona': idPersona,
            'NroDocumento': 0,
            'Nombre': nombres,
            'Apellido': apellidos,
            'CorreoElectronico': correoElectronico
        };

        try {
          const response = await postApi('Persona/getPersonas', obj);
          setPersonas(response.result);
        } catch (error) {
          // Manejo de errores
        }
      };


    useEffect(() => {   
        
        //Default loads        
        getPersonas();  
        console.log(personas)        
    }, []); 

    //Toma el archivo que se carga y lo setea
    const handleCsvUpload = (event) => {
        setCsvFile(event.target.files[0]);
    };


    const handleCsvSubmit = async () => {
        if (!csvFile) {
            setError("Por favor, seleccione un archivo CSV.");
            return;
        }

        const formData = new FormData();
        formData.append('file', csvFile);

        try {
            const response = await uploadFileApi('ReadCsv/upload', formData);
            console.log(response);
            if (response.isSuccess) {
                setPersonasCarga(response.result);
                setError(null);
                getPersonas(); 
            } else {
                debugger;
                setError("Error al cargar el archivo CSV");
            }
        } catch (error) {
            setError("Error al enviar los datos del archivo CSV a la API");
        }
    };




    // Formato de fecha
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const columns = [
        { dataField: 'idPersona', text: 'Id', sort: true },
        { dataField: 'nombre', text: 'Nombres', sort: true },
        { dataField: 'apellido', text: 'Apellidos', sort: true },
        { dataField: 'correoElectronico', text: 'Correo Electrónico', sort: true },
        { dataField: 'tipoDocumento', text: 'Tipo Documento', sort: true },
        { dataField: 'nroDocumento', text: 'Nro Documento', sort: true },
        { dataField: 'fechaRegistro', text: 'Fecha de Registro', formatter: (cell) => formatDate(cell) }
    ];

    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 10,
        showTotal: true,
        alwaysShowAllBtns: true,
        hideSizePerPage: true
    });

    //View 
    return (
        <div className='container'>
            <h2 style={{ marginTop: "20px" }}>Clientes</h2>

            <hr></hr>

            <div className='container' style={{ marginTop: "30px" }}>
                <input type='file' accept='.csv' onChange={handleCsvUpload} />
                <button type='button' className='btn btn-info float-right' onClick={handleCsvSubmit}>
                    Cargar Documento CSV
                </button>
            </div>

            <hr></hr>

            {error && <div className="alert alert-danger" role="alert">{error}</div>}

            {personasCarga.length > 0  && 
                <div className="alert alert-info" role="alert">
                  <ul>
                    {personasCarga.map((persona) => (
                        <li>{persona}</li>
                    )) }
                  </ul>      

                </div>
            }

            <hr></hr>

            <div className='container' style={{ marginTop: "30px" }}>
            <div className='row'>
                <div className='col'>
                    <label htmlFor="inputId" className="form-label">Id</label>
                    <div className="form-outline">
                        <input type="text" id="inputId" className="form-control"    
                               onChange={(e) => setIdPersona(e.target.value)}  
                               style={{border: "1px solid gray"}}/>
                    </div>
                </div>
                <div className='col'>
                    <label htmlFor="inputNombres" className="form-label">Nombres</label>
                    <div className="form-outline">
                        <input type="text" id="inputNombres" className="form-control"
                                onChange={(e) => setNombres(e.target.value)}                                 
                                style={{border: "1px solid gray"}}/>
                    </div>
                </div>
                <div className='col'>
                    <label htmlFor="inputApellidos" className="form-label">Apellidos</label>
                    <div className="form-outline">
                        <input type="text" id="inputApellidos" className="form-control"
                               onChange={(e) => setApellidos(e.target.value)}                                                           
                               style={{border: "1px solid gray"}}/>
                    </div>
                </div>

                <div className='col'>
                    <label htmlFor="inputCorreo" className="form-label">Correo Electrónico</label>
                    <div className="form-outline">
                        <input type="text" id="inputCorreo" className="form-control"
                               onChange={(e) => setCorreoElectronico(e.target.value)}                                                           
                               style={{border: "1px solid gray"}}/>
                    </div>
                </div>

                <div className='col'>
                    <hr></hr>
                    <button type='button' className='btn btn-info float-right' onClick={getPersonas}>
                        Buscar
                    </button>
                </div>
            </div>
            </div>

            <hr></hr>

            <BootstrapTable
                keyField='idPersona'
                data={personas}
                columns={columns}
                pagination={pagination}
                bootstrap4
                striped
                hover
                condensed
            />
        </div> 
    );
}

export default Persona;