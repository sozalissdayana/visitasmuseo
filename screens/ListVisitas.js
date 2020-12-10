import React,{useEffect,useState}from 'react'
import {View, Text,ScrollView,StyleSheet, Button} from 'react-native'
import firebase from '../database/firebase'
import {ListItem, Avatar} from 'react-native-elements'

const ListVisitas = (props) => {

    const [visitas, setVisitas] = useState([])

    useEffect(()=>{
        firebase.db.collection('visitas').onSnapshot(querySnapshot =>{
            
            const visitas=[];

        
            querySnapshot.docs.forEach(doc =>{
                const {nombre,apellido,fecha,hora}=doc.data()
                visitas.push({
                    id:doc.id,
                    nombre,
                    apellido,
                    fecha,
                    hora
                })
            });
            setVisitas(visitas)

        });

    },[]);

    return (
        <View style={styles.container}>
           <ScrollView>
               <Button title="Nueva Visita"
               onPress={()=>props.navigation.navigate("Reservas de Visitas al Museo")}
               color="#4682b4"
               />

              {
                visitas.map(visita =>{
                       
                return(
                <ListItem  key={visita.id} 
                onPress={()=>{props.navigation.navigate('Detalle de Visitas al Museo',
                {visitaId: visita.id})
                 }}
                >
                <ListItem.Chevron/>

                <Avatar rounded source={{ uri:'https://assets.stickpng.com/images/585e4beacb11b227491c3399.png'}}/>

                <ListItem.Content style={styles.listas}>
                <ListItem.Title>{visita.nombre} {visita.apellido}</ListItem.Title>
                <ListItem.Subtitle>{visita.fecha}</ListItem.Subtitle>
                </ListItem.Content>

                </ListItem>
                        
                       )
                   })
              }
           </ScrollView>
           </View>


       
    )
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        padding:45,
        backgroundColor:'#d3d3d3'
        
    },

    listas:{
        flex:2,
        padding:5,
        alignItems:"flex-start"
        

    }
    


})

export default ListVisitas
