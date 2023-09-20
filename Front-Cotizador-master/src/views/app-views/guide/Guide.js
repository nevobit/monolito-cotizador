import React from 'react';
import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import { styles } from './Guide.module';
import { DivisaFormater } from 'utils/divisa-formater';

const Guide = ({ enterprise, contact }) => {

    return (
            
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Image src={{uri: 'https://i.ibb.co/MCtMbHp/xplogo.png', method: 'GET', headers: {}, body: '' }} style={styles.logo} />
                    <View>
                        <Text>Cra 37</Text>
                        <Text>Cra 37</Text>
                        <Text>Cra 37</Text>
                        <Text>ventas@xppublicitrios.com</Text>
                        <Text>Medellin - Colombia</Text>
                    </View>
                </View> 
                <View>
                    <Text>Empres: </Text>
                    <Text style={{
                        borderWidth: 1,
                        borderColor: 'blue'
                    }}>{enterprise}</Text>
                </View>
            </Page>
        </Document>
        
        
    );
};

export default Guide;