import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Componente principal que representa la pantalla del perfil de usuario
export default function HomeScreen({ navigation }) {
    // Estado para almacenar la información del perfil del usuario
    const [profile, setProfile] = useState({
        nombre: '',
        apellido: '',
        comidaFavorita: ''
    });

    // Estado para gestionar la carga de datos
    const [isLoading, setIsLoading] = useState(false);

    // Estado para gestionar errores de validación
    const [errors, setErrors] = useState({});

    // Efecto para cargar el perfil del usuario al montar el componente
    useEffect(() => {
        loadProfile();
    }, []);

    // Función para cargar la información del perfil desde Firestore
    const loadProfile = async () => {
        setIsLoading(true);
        try {
            // Referencia al documento del usuario en Firestore
            const docRef = doc(db, 'usuarios', auth.currentUser.uid);
            const docSnap = await getDoc(docRef);

            // Si el documento existe, actualiza el estado del perfil
            if (docSnap.exists()) {
                setProfile(docSnap.data());
            }
        } catch (error) {
            console.error('Error al cargar perfil:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Función para validar los campos del formulario
    const validateForm = () => {
        let errors = {};

        if (!profile.nombre) errors.nombre = 'El Nombre es requerido';

        if (!profile.apellido) errors.apellido = 'El Apellido es requerido';

        if (!profile.comidaFavorita) errors.comidaFavorita = 'La Comida Favorita es requerida';

        return errors;
    };

    // Función para actualizar el perfil del usuario en Firestore
    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            const validateErrors = validateForm();

            setErrors(validateErrors);
            if (Object.keys(validateErrors).length > 0) {
                return; // Si hay errores, detiene la actualización
            }

            // Actualiza el documento del usuario en Firestore
            await setDoc(doc(db, 'usuarios', auth.currentUser.uid), profile);
            alert('Perfil actualizado exitosamente');
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            alert('Error al actualizar perfil');
        } finally {
            setIsLoading(false);
        }
    };

    // Función para cerrar sesión del usuario
    const SignOut = async () => {
        try {
            await signOut(auth);
            navigation.replace('Login'); // Redirige a la pantalla de inicio de sesión
        } catch (error) {
            alert('Error al cerrar sesión: ', error.message);
        }
    };

    // Función para mostrar una alerta de confirmación antes de cerrar sesión
    const handleSignOut = async () => {
        Alert.alert(
            'Confirmar cierre de sesión',
            '¿Estás seguro de que deseas cerrar sesión?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Cerrar sesión', onPress: SignOut, style: 'destructive' }
            ]
        );
    };

    // Renderizado de la interfaz de usuario
    return (
        <View style={styles.container}>
            <Text h4 style={styles.title}>Mi Perfil</Text>
            <Input
                placeholder="Nombre"
                value={profile.nombre}
                onChangeText={(text) => setProfile({ ...profile, nombre: text })}
                inputContainerStyle={styles.inputContainer}
                errorMessage={errors.nombre} // Muestra mensaje de error si existe
            />
            <Input
                placeholder="Apellido"
                value={profile.apellido}
                onChangeText={(text) => setProfile({ ...profile, apellido: text })}
                inputContainerStyle={styles.inputContainer}
                errorMessage={errors.apellido} // Muestra mensaje de error si existe
            />
            <Input
                placeholder="Comida Favorita"
                value={profile.comidaFavorita}
                onChangeText={(text) => setProfile({ ...profile, comidaFavorita: text })}
                inputContainerStyle={styles.inputContainer}
                errorMessage={errors.comidaFavorita} // Muestra mensaje de error si existe
            />
            {isLoading ? (
                // Muestra un botón de carga mientras se procesa una acción
                <Button
                    buttonStyle={styles.button}
                    loading
                />
            ) : (
                <Button
                    title="Actualizar Perfil"
                    onPress={handleUpdate}
                    buttonStyle={styles.button}
                />
            )}
            <Button
                title="Cerrar Sesión"
                type="outline"
                onPress={handleSignOut}
                titleStyle={{ color: '#FF190C' }}
                buttonStyle={styles.buttonOutline}
                containerStyle={styles.button}
            />
        </View>
    );
}

// Estilos personalizados de HomeScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        marginVertical: 10,
    },
    buttonOutline: {
        borderWidth: 1,
        borderColor: '#FF190C',
    },
    inputContainer: {
        borderBottomWidth: 1,
        borderColor: '#2089DC',
    },
});