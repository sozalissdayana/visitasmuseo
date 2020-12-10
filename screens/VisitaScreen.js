import React,{useState}from 'react'
import {View,Button,TextInput,ScrollView,StyleSheet,Text} from 'react-native'
import firebase from '../database/firebase'

const VisitaScreen = (props) => {

    const [state, setState]= useState({
        nombre:"",
        apellido:"",
        fecha:"",
        hora:"",
    });

    const handleChangeText=(nombre,value)=>{
        setState({...state,[nombre]: value})
    };

    const saveNewVisita = async() =>{
        if (state.nombre === ''){
            alert('rellene los campos')
        }else{
            try{
            await firebase.db.collection('visitas').add({
                nombre:state.nombre,
                apellido:state.apellido,
                fecha:state.fecha,
                hora:state.hora,
            });
            props.navigation.navigate('Lista de Visitas');
        }catch (err){
            console.log(err);
        }
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View> 
                <Text style={styles.texto}>Nombres</Text>
                <TextInput style={styles.inputGroup}
                onChangeText={(value)=> handleChangeText("nombre",value)}/>
            </View>

            <View> 
                <Text style={styles.texto}>Apellidos</Text>
                <TextInput style={styles.inputGroup}
                 onChangeText={(value)=> handleChangeText("apellido",value)}/>
            </View>

            <View>
                <Text style={styles.texto}>Fecha</Text>
                <TextInput style={styles.inputGroup}
                 onChangeText={(value)=> handleChangeText("fecha",value)}/>
            </View>

            <View>
                <Text style={styles.texto}>Hora</Text>
                <TextInput style={styles.inputGroup}
                 onChangeText={(value)=> handleChangeText("hora",value)}/>
            </View>

            <View style={styles.boton}>
                <Button  style={styles.boton} title="ENVIAR SOLICITUD" 
                onPress={() => saveNewVisita()}
                color="#4682b4"
                />
            </View>
        </ScrollView>
    
    )
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        padding:35,
        backgroundColor:'#d3d3d3'

        
    },
    inputGroup:{
        flex: 1,
        borderWidth: 1,
        borderColor: '#777',
        padding: 6,
        marginLeft:0,
        marginRight:0,
        margin:10
        
        
    },

    texto:{
        
        marginLeft: 10,
        marginRight:10,
        padding:2,
        fontSize:15

    }

   
})
export default VisitaScreen
