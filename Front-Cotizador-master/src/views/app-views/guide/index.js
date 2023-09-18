import Field from 'components/Shared/Field'
import Input from 'components/Shared/Input'
import React, { useState } from 'react'
import styles from './Guide.module.css'
import { PDFDownloadLink } from '@react-pdf/renderer'
import * as GuideDocument from './Guide';

const Guide = () => {
  const [quote, setQuote] = useState({
    enterprise: '',
    contect: '',
    identification: '',
    phone: '',
    address: '',
    city: '',
    boxs: 0,
    amount: 0
  });

  const setHandler = (e) => {
    setQuote((prev) => ({ ...prev, [e.target.name]: e.target.value }))
};

  return (
    <div>
      <div className={
      styles.container
    }>
        <Field label="Empresa">
          <Input name='enterprise' onChange={setHandler} />
        </Field> 
        <Field label="Contacto">
          <Input name='contact' onChange={setHandler} />
        </Field> 
        <Field label="Cedula">
          <Input name='identification' onChange={setHandler}  />
        </Field> 
        <Field label="Telefono">
          <Input name='phone' onChange={setHandler} />
        </Field> 
        <Field label="Direccion">
          <Input name='address' onChange={setHandler} />
        </Field> 
        <Field label="Ciudad">
          <Input name='city' onChange={setHandler} />
        </Field> 
        <Field label="# Cajas">
          <Input type='number' name='boxs' onChange={setHandler} />
        </Field> 
        <Field label="Cantidad por Caja">
          <Input type='number' name='amount' onChange={setHandler} />
        </Field> 
      </div>
      {/* <PDFDownloadLink
                    document={
                        <GuideDocument
                            {...quote}
                        />
                    }
                    fileName={`${quote.code}.pdf`}
                >
                    {({ loading }) =>
                        loading ? <div style={{
                            width: 150,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>Cargando...</div> : <button className={styles.btn}>Generar Guia</button>
                    }
                </PDFDownloadLink> */}
    
    </div>
  )
}

export default Guide