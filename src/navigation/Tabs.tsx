import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Animated,
} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Svg, { Path } from 'react-native-svg';
import HomeStack from './HomeStack';
import Shop from '../screens/Shop/Shop';
import SettingPage from '../screens/Setting/SettingPage';

type RootTabParamList = {
  Market: undefined;
  Home: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const [layoutWidth, setLayoutWidth] = useState(0);

  const tabWidth =
    layoutWidth === 0 ? 0 : layoutWidth / state.routes.length;

  const curveWidth = 60;
  const curveDepth = 45;
  const tabBarHeight = 100;

  const animatedValue = useRef(new Animated.Value(0)).current;
  const [centerX, setCenterX] = useState(0);

  // ✅ حدد مكان النوتش أول ما العرض يتحسب
  useEffect(() => {
    if (tabWidth === 0) return;

    animatedValue.setValue(state.index * tabWidth);
    setCenterX(state.index * tabWidth + tabWidth / 2);
  }, [tabWidth]);

  // ✅ تحريك النوتش عند تغيير التاب
  useEffect(() => {
    if (tabWidth === 0) return;

    Animated.spring(animatedValue, {
      toValue: state.index * tabWidth,
      useNativeDriver: false,
      bounciness: 8,
    }).start();
  }, [state.index, tabWidth]);

  // ✅ متابعة الحركة
  useEffect(() => {
    const id = animatedValue.addListener(({ value }) => {
      setCenterX(value + tabWidth / 2);
    });

    return () => {
      animatedValue.removeListener(id);
    };
  }, [tabWidth]);

  const d = `
    M 0 20
    C 0 15, 5 0, 20 0
    H ${centerX - curveWidth}
    C ${centerX - curveWidth / 2.5} 0,
      ${centerX - curveWidth / 1.5} ${curveDepth},
      ${centerX} ${curveDepth}
    C ${centerX + curveWidth / 2} ${curveDepth},
      ${centerX + curveWidth / 2.5} 0,
      ${centerX + curveWidth} 0
    H ${layoutWidth - 20}
    C ${layoutWidth - 5} 0, ${layoutWidth} 15, ${layoutWidth} 20
    V ${tabBarHeight}
    H 0
    Z
  `;

  return (
    <View
      style={styles.wrapper}
      onLayout={(e) => setLayoutWidth(e.nativeEvent.layout.width)}
    >
      {layoutWidth > 0 && (
        <>
          <Svg width={layoutWidth} height={tabBarHeight}>
            <Path d={d} fill="#7B2FF7" />
          </Svg>

          <View style={styles.tabsContainer}>
            {state.routes.map((route, index) => {
              const isFocused = state.index === index;

              const onPress = () => {
                navigation.navigate(route.name as any);
              };

              const iconColor = isFocused
                ? '#fff'
                : 'rgba(255,255,255,0.6)';

              return (
                <TouchableOpacity
                  key={route.key}
                  onPress={onPress}
                  style={styles.tabItem}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.iconWrapper,
                      isFocused && styles.activeIcon,
                    ]}
                  >
                    {index === 0 && (
                      <SimpleLineIcons
                        name="handbag"
                        size={24}
                        color={iconColor}
                      />
                    )}

                    {index === 1 && (
                      <AntDesign
                        name="home"
                        size={26}
                        color={iconColor}
                      />
                    )}

                    {index === 2 && (
                      <AntDesign
                        name="setting"
                        size={24}
                        color={iconColor}
                      />
                    )}
                  </View>

                  {!isFocused && (
                    <Text style={styles.label}>
                      {route.name}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}
    </View>
  );
}

export default function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"   // ✅ الهوم يبدأ مفتوح
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Market" component={Shop} />
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Settings" component={SettingPage} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 100,
  },
  tabsContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    height: 100,
    width: '100%',
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#7B2FF7',
    borderWidth: 5,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: -25 }],
    elevation: 6,
    marginBottom: 40,
  },
  label: {
    fontSize: 11,
    marginTop: 4,
    color: 'rgba(255,255,255,0.6)',
  },
});
