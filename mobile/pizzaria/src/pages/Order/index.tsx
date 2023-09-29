import React, { useEffect, useState } from "react";
import { FlatList, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons"
import { api } from "../../services/api";
import ModalPicker from "../../components/ModalPicker";
import ListItem from "../../components/ListItem";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

type RouteDetailParams = {
    Order: {
        number: string | number;
        order_id: string;
    }
}

export type CategoryProps = {
    id: string;
    name: string
}

type ProductProps = {
    id: string;
    name: string;
}

type ItemsProps = {
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;


export default function Order() {
    const route = useRoute<OrderRouteProps>()
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    const [category, setCategory] = useState<CategoryProps[] | []>([]);
    const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>();
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

    const [products, setProducts] = useState<ProductProps[] | []>([]);
    const [productSelected, setProductSelected] = useState<ProductProps | undefined>();
    const [modalProductVisible, setModalProductVisible] = useState(false);

    const [amount, setAmount] = useState('1')
    const [items, setItems] = useState<ItemsProps[]>([])


    //Buscar as categorias
    useEffect(() => {
        async function loadInfo() {
            const response = await api.get('/category')
            setCategory(response.data)
            setCategorySelected(response.data[0])
        }
        loadInfo();

    }, [])


    //Buscar os produtos (toda vez que a categoria mudar)
    useEffect(() => {
        async function loadProducts() {
            const response = await api.get('/category/product', {
                params: {
                    category_id: categorySelected?.id
                }
            })
            setProducts(response.data)
            setProductSelected(response.data[0])
        }
        loadProducts();

    }, [categorySelected])



    //Excluir pedido
    async function handleCloseOrder() {
        try {
            //Deleta os items de uma ordem
            if (items.length > 0) {
                await api.delete('/order/remove/items', {
                    params: {
                        order_id: route.params?.order_id
                    }
                })
            }

            //Deleta a ordem
            await api.delete('/order', {
                params: {
                    order_id: route.params?.order_id
                }
            })
            navigation.goBack();
        } catch (error) {
            console.log(error)
        }
    }

    //
    function handleChangeCategory(item: CategoryProps) {
        setCategorySelected(item)
    }


    //Handle product
    function handleChangeProduct(item: ProductProps) {
        setProductSelected(item)
    }

    //Adicionar um produto a mesa
    async function handleAdd() {
        try {
            const response = await api.post('/order/add', {
                order_id: route.params?.order_id,
                product_id: productSelected?.id,
                amount: Number(amount)
            })

            let data = {
                id: response.data.id,
                product_id: productSelected?.id as string,
                name: productSelected?.name as string,
                amount: amount
            }
            //Pega o que já tem e adiciona o novo
            setItems(oldArray => [...oldArray, data])

        } catch (error) {
            console.log(error)
        }
    }

    //Deleta item de uma order
    async function handleDeleteItem(item_id: string) {
        try {
            await api.delete('/order/remove', {
                params: {
                    item_id: item_id
                }
            })        
            
            //após remover da api, removemos esse item da nossa lista de item
            let removeItem = items.filter( item => {
                return (item.id !== item_id)
            })
            setItems(removeItem)


        } catch (error) {
            console.log(error)
        }
    }

    function handleFinishOrder() {
        navigation.navigate("FinishOrder",{
            number: route.params?.number,
            order_id: route.params?.order_id,
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mesa {route.params.number}</Text>
                <TouchableOpacity onPress={handleCloseOrder}>
                    <Feather name="trash-2" size={28} color="#ff3f4b" />
                </TouchableOpacity>
            </View>


            {category.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)} >
                    <Text style={{ color: '#FFF' }}>
                        {categorySelected?.name}
                    </Text>
                </TouchableOpacity>
            )}


            {products.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalProductVisible(true)} >
                    <Text style={{ color: '#FFF' }}>
                        {productSelected?.name}
                    </Text>
                </TouchableOpacity>
            )}

            <View style={styles.qtdContainer}>
                <Text style={styles.qtdText}>Quantidade</Text>
                <TextInput
                    style={[styles.input, { width: '60%', textAlign: 'center' }]}
                    placeholder=""
                    value={amount}
                    onChangeText={setAmount}
                    placeholderTextColor="#F0f0f0"
                    keyboardType="numeric" />
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleFinishOrder}
                    disabled={items.length === 0}
                    style={[styles.button, { opacity: items.length === 0 ? 0.3 : 1 }]}
                >
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>

            </View>



            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, marginTop: 24 }}
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ListItem data={item} deleteItem={handleDeleteItem} />}
            />




            {/* Modal de categorias */}
            <Modal
                transparent={true}
                visible={modalCategoryVisible}
                animationType="fade"
            >
                <ModalPicker
                    handleCloseModal={() => setModalCategoryVisible(false)}
                    options={category}
                    selectedItem={handleChangeCategory}
                />
            </Modal>


            {/* Modal de produtos */}
            <Modal
                transparent={true}
                visible={modalProductVisible}
                animationType="fade"
            >
                <ModalPicker
                    handleCloseModal={() => setModalProductVisible(false)}
                    options={products}
                    selectedItem={handleChangeProduct}
                />
            </Modal>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: '5%',
        paddingHorizontal: '4%',
        backgroundColor: '#1d1d2e'
    },
    header: {
        flexDirection: "row",
        marginBottom: 12,
        alignItems: "center",
        marginTop: 24

    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: '#FFF',
        marginRight: 14
    },

    input: {
        width: '100%',
        height: 40,
        backgroundColor: '#101026',
        borderRadius: 4,
        marginBottom: 12,
        paddingHorizontal: 8,
        justifyContent: "center",
        color: '#FFF',
        fontSize: 20
    },
    qtdContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between"
    },

    qtdText: {
        fontSize: 20,
        fontWeight: "bold",
        color: '#FFF',
    },

    actions: {
        flexDirection: "row",
        width: '100%',
        justifyContent: "space-between"
    },

    buttonAdd: {
        width: '20%',
        height: 40,
        backgroundColor: '#3fd1ff',
        borderRadius: 4,
        marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },

    button: {
        width: '75%',
        height: 40,
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: '#101026'
    }
})