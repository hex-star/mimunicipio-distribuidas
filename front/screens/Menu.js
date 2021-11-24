import React from 'react';
import {
    Text, View, TouchableOpacity, Image,
} from 'react-native';
import MiVecindario from '../components/MiVecindario';
import style from '../customProperties/Styles';
import cartelera from '../assets/cartelera.png';
import reclamo from '../assets/reclamo.png';
import denuncia from '../assets/denuncia.png';
import historial from '../assets/historial.png';

function Menu(props) {
    const { navigation } = props;
    return (
        <>
            <MiVecindario navigation={navigation} />
            <View style={{ flexDirection: 'column', height: '90%', justifyContent: 'center' }}>
                <View style={style.menuContainer}>
                    <View style={style.menuItem}>
                        <TouchableOpacity style={style.menuButton} onPress={() => navigation.navigate('Cartelera')}>
                            <Image style={style.menuImage} source={cartelera} />

                        </TouchableOpacity>
                        <Text style={style.menuText}>Cartelera</Text>
                    </View>
                    <View style={style.menuItem}>
                        <TouchableOpacity
                            style={style.menuButton}
                            onPress={() => navigation.navigate('Reclamo')}
                        >
                            <Image style={style.menuImage} source={reclamo} />

                        </TouchableOpacity>
                        <Text style={style.menuText}>Nuevo reclamo</Text>
                    </View>
                </View>
                <View style={style.menuContainer}>
                    <View style={style.menuItem}>
                        <TouchableOpacity style={style.menuButton} onPress={() => navigation.navigate('Denuncia')}>
                            <Image style={style.menuImage} source={denuncia} />

                        </TouchableOpacity>
                        <Text style={style.menuText}>Nueva Denuncia</Text>
                    </View>
                    <View style={style.menuItem}>
                        <TouchableOpacity style={style.menuButton} onPress={() => navigation.navigate('Historial')}>
                            <Image style={style.menuImage} source={historial} />
                        </TouchableOpacity>
                        <Text style={style.menuText}>Historial</Text>
                    </View>
                    {/* <View style={style.menuItem}>
                        <TouchableOpacity style={style.menuButton}>
                            <Image style={style.menuImage} source={historial} />
                        </TouchableOpacity>
                        <Text style={style.menuText}>Historial</Text>
                    </View> */ }
                </View>

            </View>

        </>
    );
}

export default Menu;
