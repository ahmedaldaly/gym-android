import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Shop from "../screens/Shop/Shop";
import ProductDetailsScreen from "../screens/Shop/ProductDetails/ProductDetailsScreen";
import MyCardScreen from "../screens/Shop/MyCard/MyCardScreen";
import { ShopStackParamList } from "../screens/Shop/Shop.type";

const stack = createNativeStackNavigator<ShopStackParamList>();

export default function ShopStack(){
    return(
        <stack.Navigator 
         screenOptions={
             {
                headerShown:false
             }
             
         }
        >
            <stack.Screen name="shop" component={Shop} />
            <stack.Screen name="productDetails" component={ProductDetailsScreen} />
            <stack.Screen name="myCard" component={MyCardScreen} />
        </stack.Navigator>
    )
}