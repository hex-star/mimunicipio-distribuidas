/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {
    View, Text, Image, TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import style from '../../customProperties/Styles';
import MiVecindario from '../../components/MiVecindario';
import listarRubros from '../../controllers/reclamos';

function PaginaProducto(props) {
    const { navigation, route } = props; // props.navigation
    const { params } = route;
 
    const {
        horarios, titulo, descripcion, imagenesPublicacions,rubro,telefono,sitio
    } = params.publicacion;
    const _renderItem = ({ item, index }) => {
        return (
            <Image
                style={{ height: 115, width: 115, marginVertical: 10 }}
                source={{ uri: item.url }}
                key={index}
            />
        );
    };
    // llama a los datos del perfil
    // const [horarios, setHorarios] = useState('-Lunes: 9:00 - 19:00 hs' + '\n' + '-Martes: 9:00 - 19:00 hs ' + '\n' + '-Miercoles: Cerrado' + '\n' + '-Jueves: 9:00 - 22:00hs' + '\n' + '-Sábado: Cerrado' + '\n' + '-Domingo: Cerrado');
    return (
        <>
            <ScrollView>
                <MiVecindario noPerfil />
                <View style={style.paginaProductoContainer}>
                    <Text style={{ fontWeight: 'bold', fontSize: 35, color: '#000f' }}>{titulo}</Text>
                    <Text style={{fontSize: 20, color: '#000f' }}>{rubro ? rubro : 'Comercio' }</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <View style={{flexDirection:'column'}}>
                        <Carousel
                            data={imagenesPublicacions}
                            layout={'default'}
                            renderItem={_renderItem}
                            itemWidth={120}
                            sliderWidth={400}
                        />
                        </View>
                    </View>
                 
                    <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20 }}>Horarios</Text>
                    <View style={{ alignItems: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 18 }}>- Lunes </Text>
                            <Text style={{ fontSize: 18, color: '#000' }}>
                                {
                                    horarios.split(',')[0] === '' && horarios.split(',')[1] === ''
                            && (
                                <Text style={{ fontSize: 18, color: '#000' }}>
                                    Cerrado
                                </Text>
                            )

                                }
                                {
                                    horarios.split(',')[0] !== '' && horarios.split(',')[1] !== ''
                            && (
                                <Text style={{ fontSize: 18, color: '#000' }}>
                                    {horarios.split(',')[0]}
                                    {' '}
                                    -
                                    {' '}
                                    {horarios.split(',')[1]}
                                    {' '}
                                    hs
                                </Text>
                            )
                                }
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 18 }}>- Martes </Text>
                            <Text style={{ fontSize: 18, color: '#000' }}>
                                {
                                    horarios.split(',')[2] === '' && horarios.split(',')[3] === ''
                            && (
                                <Text style={{ color: '#000' }}>
                                    Cerrado
                                </Text>
                            )

                                }
                                {
                                    horarios.split(',')[2] !== '' && horarios.split(',')[3] !== ''
                            && (
                                <Text style={{ color: '#000' }}>
                                    {horarios.split(',')[2]}
                                    {' '}
                                    -
                                    {' '}
                                    {horarios.split(',')[3]}
                                    {' '}
                                    hs
                                </Text>
                            )
                                }
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 18 }}>- Miercoles </Text>
                            <Text style={{ fontSize: 18, color: '#000' }}>
                                {
                                    horarios.split(',')[4] === '' && horarios.split(',')[5] === ''
                            && (
                                <Text style={{ fontSize: 18, color: '#000' }}>
                                    Cerrado
                                </Text>
                            )

                                }
                                {
                                    horarios.split(',')[4] !== '' && horarios.split(',')[5] !== ''
                            && (
                                <Text style={{ fontSize: 18, color: '#000' }}>
                                    {horarios.split(',')[4]}
                                    {' '}
                                    -
                                    {' '}
                                    {horarios.split(',')[5]}
                                    {' '}
                                    hs
                                </Text>
                            )
                                }
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 18 }}>- Jueves </Text>
                            <Text style={{ fontSize: 18, color: '#000' }}>
                                {
                                    horarios.split(',')[6] === '' && horarios.split(',')[7] === ''
                            && (
                                <Text style={{ fontSize: 18, color: '#000' }}>
                                    Cerrado
                                </Text>
                            )

                                }
                                {
                                    horarios.split(',')[6] !== '' && horarios.split(',')[7] !== ''
                            && (
                                <Text style={{ fontSize: 18, color: '#000' }}>
                                    {horarios.split(',')[6]}
                                    {' '}
                                    -
                                    {' '}
                                    {horarios.split(',')[7]}
                                    {' '}
                                    hs
                                </Text>
                            )
                                }
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 18 }}>- Viernes </Text>
                            <Text style={{ fontSize: 18, color: '#000' }}>
                                {
                                    horarios.split(',')[8] === '' && horarios.split(',')[9] === ''
                            && (
                                <Text style={{ fontSize: 18, color: '#000' }}>
                                    Cerrado
                                </Text>
                            )

                                }
                                {
                                    horarios.split(',')[8] !== '' && horarios.split(',')[9] !== ''
                            && (
                                <Text style={{ fontSize: 18, color: '#000' }}>
                                    {horarios.split(',')[8]}
                                    {' '}
                                    -
                                    {' '}
                                    {horarios.split(',')[9]}
                                    {' '}
                                    hs
                                </Text>
                            )
                                }
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 18 }}>- Sabado </Text>
                            <Text style={{ fontSize: 18, color: '#000' }}>
                                {
                                    horarios.split(',')[10] === '' && horarios.split(',')[11] === ''
                            && (
                                <Text style={{ fontSize: 18, color: '#000' }}>
                                    Cerrado
                                </Text>
                            )

                                }
                                {
                                    horarios.split(',')[10] !== '' && horarios.split(',')[11] !== ''
                            && (
                                <Text style={{ fontSize: 18, color: '#000' }}>
                                    {horarios.split(',')[10]}
                                    {' '}
                                    -
                                    {' '}
                                    {horarios.split(',')[11]}
                                    {' '}
                                    hs
                                </Text>
                            )
                                }
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 18 }}>- Domingo </Text>
                            {
                                horarios.split(',')[12] === '' && horarios.split(',')[13] === ''
                            && (
                                <Text style={{ fontSize: 18, color: '#000' }}>
                                    Cerrado
                                </Text>
                            )

                            }
                            {
                                horarios.split(',')[12] !== '' && horarios.split(',')[13] !== ''
                            && (
                                <Text style={{ fontSize: 18, color: '#000' }}>
                                    {horarios.split(',')[12]}
                                    {' '}
                                    -
                                    {' '}
                                    {horarios.split(',')[13]}
                                    {' '}
                                    hs
                                </Text>
                            )
                            }

                        </View>
                    </View>
                    <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20 }}>Direccion</Text>
                    <Text style={{fontSize:18}}> {sitio.calle} {sitio.numero}</Text>
                    <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20,marginTop:10 }}>Telefono</Text>
                    <Text style={{fontSize:18}}>{telefono}</Text>
                    <Text style={{ fontSize: 22, marginTop: 16, textAlign:'center' }}>{descripcion}</Text>
                    <View style={style.carteleraItemContainer}>

                        <TouchableOpacity onPress={() => navigation.navigate('CambiarContraseña')} />
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

export default (PaginaProducto);
