import React, {useEffect,useState} from 'react'
import {View,Text,StyleSheet,TextInput,ScrollView,Button,ActivityIndicator,Alert} from 'react-native'
import firebase from '../database/firebase'

const DetalleVisitaScreen = (props) =>{

    const initalState = {
        id:'',
        nombre:'',
        apellido:'',
        fecha:'',
        hora:''
    }

    const [visita, setVisita ] = useState()

    const [loading, setloading] = useState(true)

    const getVisitaId = async (id) =>{
       const dbRef= firebase.db.collection('visitas').doc(id)
       const doc= await dbRef.get();
       const visita= doc.data();
       setVisita({
           ...visita,
           id: doc.id,
       })

       setloading(false)
     

    }

    useEffect(()=>{
        getVisitaId(props.route.params.visitaId);

    },[]);

    const handleChangeText=(nombre,value)=>{
        console.log(visita)
        setVisita({...visita,[nombre]: value})
    };
    const eliminarvisita =async () =>{
       const dbRef= firebase.db.collection('visitas').doc(props.route.params.visitaId);
       await dbRef.delete();
       props.navigation.navigate('Lista de Visitas')
    }

    const actualizarVisita = async () =>{
        const dbRef = firebase.db.collection('visitas').doc(props.route.params.visitaId);
        await dbRef.set({
            nombre:visita.nombre,
            apellido:visita.apellido,
            fecha:visita.fecha,
            hora:visita.hora
        })
        setVisita(initalState)
        props.navigation.navigate('Lista de Visitas')
    }

    const openConfirmationAlert = () => {
        Alert.alert('eliminar visita','estas seguro',[
            {text: 'si', onPress: () => eliminarvisita()},
            {text: 'no', onPress: ()=>console.log(false)}
        ])
    }

    if (loading){
        return(
            <View>
                <ActivityIndicator size="large" color="#9e9e9e"/>
            </View>
        )
    }
    return (

        <ScrollView style={styles.container}>
            <View> 
                <Text style={styles.texto}>Nombres</Text>
                <TextInput style={styles.inputGroup}
                placeholder="nombre" 
                value={visita.nombre}
                onChangeText={(value)=> handleChangeText("nombre",value)}/>
            </View>

            <View> 
                <Text style={styles.texto}>Apellidos</Text>
                <TextInput style={styles.inputGroup}
                 placeholder="apellido"
                 value={visita.apellido}
                 onChangeText={(value)=> handleChangeText("apellido",value)}/>
            </View>

            <View>
                <Text style={styles.texto}>Fecha</Text>
                <TextInput style={styles.inputGroup}
                 placeholder="fecha"
                 value={visita.fecha}
                 onChangeText={(value)=> handleChangeText("fecha",value)}/>
            </View>

            <View>
                <Text style={styles.texto}>Hora</Text>
                <TextInput style={styles.inputGroup}
                 placeholder="hora"
                 value={visita.hora}
                 onChangeText={(value)=> handleChangeText("hora",value)}/>
            </View>

            <View>
                <Button style={styles.boton}
                title="ACTUALIZAR VISITA" 
                onPress={() => actualizarVisita ()}
                color="#4682b4"
               />
                
            </View>
            <Button title="ELIMINAR VISITA"
             onPress={() => openConfirmationAlert()}
             color="#E37399"
             />
             
            <View>

            </View>
        </ScrollView>
    
    )

    
}
const styles= StyleSheet.create({
    container:{
        flex:1,
        padding:45,
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



    });

export default DetalleVisitaScreen

